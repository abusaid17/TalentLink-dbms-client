import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import JobShow from "./JobShow";
import { jobRoles } from "../../jobRoles";

const JobOpportunity = () => {
    const { user } = useContext(AuthContext);
    const [jobOpportunity, setJobOpportunity] = useState([]);
    const navigate = useNavigate();
    const [adminCheck, setAdminCheck] = useState(false);
    const { jobNameQuery } = useParams();
    const [selectedJob, setSelectedJob] = useState("");
    const [selectedJobType, setSelectedJobType] = useState("");
    const [salarySort, setSalarySort] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();

        const cleanJobName = selectedJob.toLowerCase().replace(/\s+/g, "");
        console.log(cleanJobName)
        navigate(`/jobsearch/${cleanJobName}`);

    };

    useEffect(() => {
        axios.get("http://localhost:5001/jobopportunities")
            .then(res => {
                let filteredJobs = res.data;

                if (jobNameQuery) {
                    const normalizedQuery = jobNameQuery.toLowerCase().replace(/\s+/g, '');
                    filteredJobs = filteredJobs.filter(job =>
                        job.JobName && job.JobName.toLowerCase().replace(/\s+/g, '') === normalizedQuery
                    );
                }

                if (selectedJobType) {
                    filteredJobs = filteredJobs.filter(job => job.JobType === selectedJobType);
                }

                if (salarySort === "low-to-high") {
                    filteredJobs.sort((a, b) => a.Salary - b.Salary);
                } else if (salarySort === "high-to-low") {
                    filteredJobs.sort((a, b) => b.Salary - a.Salary);
                }

                setJobOpportunity(filteredJobs);

                if (filteredJobs.length === 0 && (jobNameQuery || selectedJobType)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No jobs found for the selected criteria!',
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [jobNameQuery, selectedJobType, salarySort]);

    useEffect(() => {
        if (user?.email === "mdabusaid7068@gmail.com") {
            setAdminCheck(true);
        } else {
            setAdminCheck(false);
        }
    }, [user]);

    const handleViewDetails = (jobId) => {
        navigate(`/viewdetails/${jobId}`, { state: { from: `/jobopportunity` } });
    };

    const handleDelete = (JobID) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5001/delete_job/${JobID}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The job has been deleted.",
                            icon: "success"
                        });
                        setJobOpportunity(jobOpportunity.filter(job => job.JobID !== JobID));
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        });
    };

    return (
        <div className=" bg-gray-300">
            <div className="bg-gradient-to-b bg-green-400 rounded-b-2xl">
                <h2 className="text-4xl font-bold rounded-box grid h-16 place-items-center mx-auto">All Job's Opportunity Have</h2>
                <p className="text-center py-4">Find the right job for your skills. Choose from the jobs listed below and apply to unlock new opportunities! 🚀</p>
            </div>
            <div className="flex items-center w-[96%] justify-center pl-5 my-4 gap-16">
                <div className="w-[50%]">
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
                <div className="w-[50%]">
                    <select
                        className="select select-bordered w-full flex-grow text-black"
                        value={selectedJobType}
                        onChange={(e) => setSelectedJobType(e.target.value)}
                    >
                        <option value="">Select Job Type</option>
                        <option value="On-site">On-site</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>
                <div className="w-[50%]">
                    <select
                        className="select select-bordered w-full flex-grow text-black"
                        value={salarySort}
                        onChange={(e) => setSalarySort(e.target.value)}
                    >
                        <option value="">Sort by Salary</option>
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                    </select>
                </div>
            </div>


            <div className="mx-auto pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-4 ">
                    {jobOpportunity.map((job) =>
                        <JobShow
                            key={job.id}
                            job={job}
                            email={user?.email}
                            Admin={adminCheck}
                            handleDelete={handleDelete}
                            handleViewDetails={handleViewDetails}
                        />
                    )}
                </div>

            </div>
            <div className="text-center mt-8">
                <Link to='/'><button className="btn btn-error">Back</button></Link>
            </div>
        </div>
    );
};

export default JobOpportunity;
