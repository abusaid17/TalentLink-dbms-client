import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PopularServices from "../PopularServices/PopularServices";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/jobopportunity/${searchQuery.trim()}`);
        }
    };

    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://i.ibb.co.com/604CpJyb/banner.jpg)",
                }}>
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Welcome to TalentLink</h1>
                        <p className="mb-5">
                            A job marketplace designed for newcomers. Connect with employers, find opportunities, and kickstart your career with ease.
                        </p>
                        <form onSubmit={handleSearch} className="text-black pb-3">
                            <label className="input bg-success flex items-center">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                                <input
                                    type="search"
                                    required
                                    placeholder="Search Job Type"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="btn btn-accent border-none ">Search</button>
                            </label>
                        </form>
                        {/* <Link to="/register"><button className="btn btn-info">Sign Up</button></Link> */}
                    </div>
                </div>
            </div>
            <PopularServices></PopularServices>
        </div>
    );
};

export default Home;