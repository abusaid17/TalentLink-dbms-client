import { Link } from "react-router-dom";
import PopularServices from "../PopularServices/PopularServices";


const Home = () => {
    return (
        <div>
            <div
                class="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://i.ibb.co.com/604CpJyb/banner.jpg)",
                }}>
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">We are Hairing</h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <div className="text-black pb-3">
                            <label className="input bg-blue-300">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                                <input type="search" required placeholder="Search any service" />
                            </label>
                        </div>
                        <Link to="/register"><button className="btn btn-info">Sign Up</button></Link>
                    </div>
                </div>
            </div>
            <PopularServices></PopularServices>
        </div>
    );
};

export default Home;