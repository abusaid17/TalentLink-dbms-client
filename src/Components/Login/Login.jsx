import { useContext } from 'react';
import image from '../../assets/image/signin.png';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { GoogleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const response = await fetch("http://localhost:5001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    title: "Sign In Successful",
                    icon: "success",
                    draggable: true
                });

                // Store token in localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                navigate('/')

                form.reset(); // Clear the form after successful login
            }
            //  else {
            //     Swal.fire({
            //         icon: "error",
            //         title: "Oops...",
            //         text: data.error || "Invalid Credentials",
            //     });
            // }
        } catch (error) {
            console.error("Login error:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Server Error. Try again later!",
            });
        }
    };

    // Google login
    const handleGoogleSignIn = () => {
        GoogleLogin()
            .then(result => {
                // Swal.fire("User Logged In Successfully");
                navigate("/profile")
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    return (
        <div style={{ backgroundImage: "url(https://i.ibb.co.com/xPz8pk8/lohin.jpg)" }} className='bg-bage-100 '>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse gap-24">
                    <div className="text-center lg:text-left">
                        <div>
                            <img className='w-[525px] h-[500px]' src={image} alt="" />
                        </div>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSignIn} className="card-body">
                            <div className="flex w-full flex-col">
                                <div className="card bg-base-300 text-3xl font-bold text-orange-600 rounded-box grid h-16 place-items-center">Sign In</div>
                                <div className="divider"></div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            </div>

                            <button className="btn btn-primary">Sign In</button>
                        </form>

                        <button onClick={handleGoogleSignIn} className='btn btn-success mx-8 mb-3'><FcGoogle className='text-4xl'></FcGoogle> Google </button>

                        <div className='text-center pb-6'>
                            <p>Don't Have an Account? <Link to="/register"><span className='text-lg font-bold text-orange-500'>Sign Up</span></Link> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
