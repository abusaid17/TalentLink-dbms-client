import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [userdata, setUserData] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:5001/get_user/${user?.email}`)
            .then((res) => {
                setUserData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [user])

    const navlinks =
        <>
            <Link to="/"><li><a>Home</a></li></Link>
            <Link to="/jobopportunity"><li><a>Jobs</a></li></Link>
            <Link to="/addjob"><li><a>Post Job</a></li></Link>
            {
                user ?
                    <>
                        <Link to="/profile"><li><a>Profile</a></li></Link>
                        {
                            userdata?.role === "Admin" ?
                                <>
                                    <Link to="/showuser"><li><a>Users</a></li></Link>
                                </>
                                :
                                <>
                                </>
                        }

                    </>
                    :
                    <>

                    </>

            }

        </>
    return (
        <div className="navbar bg-base-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghos lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navlinks}
                    </ul>
                </div>
                <p className="text-2xl font-bold rounded-2xl"><span className="text-3xl text-orange-500">T</span>alent <span className="text-3xl text-orange-500">L</span>ink</p>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navlinks}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                {user ?
                    <Link onClick={() => logOut()} ><a className="btn btn-error text-lg">Sign Out</a></Link>
                    : <>
                        <Link to="/login"><button className="btn btn-secondary">Sign In</button></Link>
                        <Link to="/register"><button className="btn btn-primary">Sign Up</button></Link>
                    </>
                }

            </div>
        </div>
    );
};

export default Navbar;