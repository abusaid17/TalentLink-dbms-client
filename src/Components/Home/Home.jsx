import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jobRoles } from "../../jobRoles";
import PopularServices from "../PopularServices/PopularServices";
import axios from "axios";

const Home = () => {
    const [selectedJob, setSelectedJob] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        const cleanJobName = selectedJob.toLowerCase().replace(/\s+/g, "");
        console.log(cleanJobName)
        navigate(`/jobserach/${cleanJobName}`);

        // const [searchData, setSearchData] = useState([]);
        // console.log("show search data: ", searchData)

        // if (!selectedJob) {
        //     console.log("No job role selected.");
        // } else {
        //     console.log("Selected job role:", selectedJob);
        // }

        // axios.get(`http://localhost:5001/get_job_by_name/${jobName}`)
        //     .then(res => {
        //         console.log("Job found:", res.data);
        //         setSearchData(res.data[0])
        //     })
        //     .catch(err => {
        //         if (err.response?.status === 404) {
        //             console.log("No job found");
        //         } else {
        //             console.error("Error fetching job:", err);
        //         }
        //     });



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
                    <div className="max-w-md w-full">
                        <h1 className="mb-5 text-5xl font-bold">Welcome to TalentLink</h1>
                        <p className="mb-5">
                            A job marketplace designed for newcomers. Connect with employers, find opportunities, and kickstart your career with ease.
                        </p>
                        <form onSubmit={handleSearch} className="flex items-center w-full">
                            <select
                                className="select select-bordered w-full flex-grow text-black"
                                value={selectedJob}
                                onChange={(e) => setSelectedJob(e.target.value)}
                            >
                                <option value="">Select Job Role</option>
                                {jobRoles.map(role => (
                                    <option key={role.value} value={role.value}>{role.label}</option>
                                ))}
                            </select>
                            <button type="submit" className="btn btn-accent btn-square ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <PopularServices></PopularServices>
        </div>
    );
};

export default Home;