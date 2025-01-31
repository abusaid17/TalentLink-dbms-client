import { Link } from "react-router-dom";

const Navbar = () => {
    const navlinks =
        <>
            <Link to="/"><li><a>Home</a></li></Link>
            <Link to="/popularservices"><li><a>Popular services</a></li></Link>
            <Link to="/create"><li><a>Create</a></li></Link>
            <Link to="/updateuser"><li><a>Update</a></li></Link>
            <Link to="/deleteuser"><li><a>Delete</a></li></Link>
            <Link to="/showuser"><li><a>Show User Info</a></li></Link>
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
                <a className="btn btn-ghost text-2xl">TalentLink</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navlinks}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <Link to="/login"><button className="btn btn-secondary">Sign In</button></Link>
                <Link to="/register"><button className="btn btn-primary">Sign Up</button></Link>
            </div>
        </div>
    );
};

export default Navbar;