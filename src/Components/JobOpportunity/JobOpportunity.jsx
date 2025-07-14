import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import JobShow from "./JobShow";

const JobOpportunity = () => {
    const { user } = useContext(AuthContext);
    const [jobOpportunity, setJobOpportunity] = useState([]);
    const navigate = useNavigate();
    const [setUserData] = useState([]);
    const [adminCheck, setAdminCheck] = useState(false);
    const { searchQuery } = useParams();

    useEffect(() => {
        axios.get("http://localhost:5001/jobopportunities")
            .then(res => {
                if (searchQuery) {
                    const filteredJobs = res.data.filter(job =>
                        job.JobName.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    setJobOpportunity(filteredJobs);
                    if (filteredJobs.length === 0) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'This type of job is not found!',
                        });
                    }
                } else {
                    setJobOpportunity(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [searchQuery]);

    useEffect(() => {
        if (user?.email === "mdabusaid7068@gmail.com") {
            setAdminCheck(true);
        } else {
            setAdminCheck(false);
        }
    }, [user]);

    const handleViewDetails = (jobId) => {
        navigate(`/viewdetails/${jobId}`);
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
        <div className="py-6 bg-gray-300">
            <div className="card bg-base-300 text-3xl font-bold rounded-box grid h-16 place-items-center mb-2 w-[30%] mx-auto">All Listed Job</div>
            <p className="text-center py-4">Find the right job for your skills. Choose from the jobs listed below and apply to unlock new opportunities! 🚀</p>
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