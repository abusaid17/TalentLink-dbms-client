import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import JobShow from "./JobShow";
import { jobRoles } from "../../jobRoles";


const JobOpportunity = () => {
    const { user } = useContext(AuthContext);
    const [jobOpportunity, setJobOpportunity] = useState([]);
    const navigate = useNavigate();
    const [setUserData] = useState([]);
    const [adminCheck, setAdminCheck] = useState(false);
    const { jobNameQuery } = useParams();
    const [selectedJob, setSelectedJob] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5001/jobopportunities")
            .then(res => {
                if (jobNameQuery) {
                    const normalizedQuery = jobNameQuery.toLowerCase().replace(/\s+/g, '');
                    const filteredJobs = res.data.filter(job =>
                        job.jobName && job.jobName.toLowerCase().replace(/\s+/g, '') === normalizedQuery
                    );
                    setJobOpportunity(filteredJobs);
                    if (filteredJobs.length === 0) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No jobs found for the selected job name!',
                        });
                    }
                } else {
                    setJobOpportunity(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [jobNameQuery]);

    // Check admin or user role
    useEffect(() => {
        if (user?.email === "mdabusaid7068@gmail.com") {
            setAdminCheck(true);
        } else {
            setAdminCheck(false);
        }
    }, [user]);

    // Handle ViewDetails
    const handleViewDetails = (jobId) => {
        navigate(`/viewdetails/${jobId}`);
    };

    // Handle Delete
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

    // Search form or search functionality
    const handleSearch = (e) => {
        e.preventDefault();

        const cleanJobName = selectedJob.toLowerCase().replace(/\s+/g, "");
        console.log(cleanJobName)
        navigate(`/jobserach/${cleanJobName}`);
    };

    return (
        <div className="py-6 bg-gray-300">
            <h2 className="text-3xl font-bold rounded-box grid h-16 place-items-center mb-2 w-[30%] mx-auto">All Job Opportunity Have</h2>
            <p className="text-center py-4">Find the right job for your skills. Choose from the jobs listed below and apply to unlock new opportunities! 🚀</p>
            <div>
                {/* Search form */}
                <form onSubmit={handleSearch} className="flex items-center w-[30%] justify-content-start pl-5 my-4">
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
            <div className="mx-auto flex pt-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-4 ">
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
        </div>
    );
};

export default JobOpportunity;