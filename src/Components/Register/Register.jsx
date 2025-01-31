import { useContext } from 'react';
import image from '../../assets/image/signup.png'
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
const Register = () => {
    const { createUser } = useContext(AuthContext);
    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        createUser(email, password)
            .then(result => {
                Swal.fire({
                    title: "User Created Successful",
                    icon: "success",
                    draggable: true
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "This user already exists",
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
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Name" className="input input-bordered" />
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
                            {/* <div className="form-control mt-6"> */}
                            <button className="btn btn-primary">Sign Up</button>
                            {/* </div> */}
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