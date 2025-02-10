import { useContext, useEffect, useState } from 'react';
import image from '../../assets/image/signup.png'
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import axios from 'axios';
const Register = () => {
    const { logOut, createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    // const {registerUser, setRegisterUser} = useState([]);
    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(name, email, password);
        if (password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Weak Password",
                text: "Password must be at least 6 characters long!",
            });
            return; // Stop execution if password is too short
        }
        const registerData = {
            username: name,
            email,
            password,
            role: "user"
        }

        ///
        axios.post("http://localhost:5001/register", registerData)
            .then(res => {
                // const data = await response.json();
                if (res) {
                    createUser(email, password)
                        .then(() => {
                            Swal.fire({
                                title: "User SignUp Successful",
                                icon: "success",
                                draggable: true
                            });
                            logOut()

                            navigate('/login')

                            form.reset(); // Clear form fields after success
                        })

                }
            })

            .catch((err) => {
                console.error("Error registering user:", err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Server Error. Try again later!",
                });
            })

    }

    return (
        <div style={
            {
                backgroundImage: "url(https://i.ibb.co.com/VYvd0GYr/3525926.jpg)",
            }
        } className='bg-bage-100'>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse gap-x-24">
                    <div className="text-center lg:text-left">
                        <img className='w-[500px] h-[500px]' src={image} />
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSignUp} className="card-body">
                            <div className="flex w-full flex-col">
                                <div className="card bg-base-300 text-3xl font-bold text-orange-600 rounded-box grid h-16 place-items-center">Sign Up</div>
                                <div className="divider"></div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input type="text" name='name' placeholder="Username" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">University </span>
                                </label>
                                <input type="text"  placeholder="Enter Your University" className="input input-bordered"  />
                            </div> */}
                            <button className="btn btn-primary">Sign Up</button>
                            <div className='text-center '>
                                <p>Have an Account? <Link to="/login"><span className='text-lg font-bold text-orange-500'>Sign In</span></Link> </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;