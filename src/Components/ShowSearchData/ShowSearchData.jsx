import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { TbCoinTakaFilled } from "react-icons/tb";
import { IoArrowBackCircle } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdAutoDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const ShowSearchData = () => {
    const { jobName } = useParams();
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");
    const { user } = useContext(AuthContext);
    const [adminCheck, setAdminCheck] = useState(false);

    useEffect(() => {
        if (user?.email === "mdabusaid7068@gmail.com") {
            setAdminCheck(true);
        } else {
            setAdminCheck(false);
        }
    }, [user]);

    useEffect(() => {
        if (!jobName) return;

        axios.get(`http://localhost:5001/get_job_by_name/${jobName}`)
            .then(res => {
                setJobs(res.data);
            })
            .catch(err => {
                if (err.response?.status === 404) {
                    toast.error("No jobs found for this category.");
                } else {
                    alert("Something went wrong.");
                }
            });
    }, [jobName]);

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
                        setJobs(jobs.filter(job => job.JobID !== JobID));
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        });
    };

    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (jobs.length === 0) return <p className="text-center font-semibold text-secondary text-2xl py-8">Matching Job Not Found... <br /> <br />
        <Link to='/jobopportunity'><button className="btn btn-secondary">Back</button></Link>
    </p>;

    return (
        <div className="pb-8">
            <div className="bg-gradient-to-b bg-green-400 mx-4 rounded-lg">
                <h2 className="text-3xl font-bold rounded-box grid h-16 place-items-center mb-2 w-[30%] mx-auto">Your Searched Job</h2>
                <p className="text-center py-4">Find the right job for your skills. Choose from the jobs listed below and apply to unlock new opportunities! 🚀</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-4 mt-8">
                {jobs.map(job => {
                    const isAuthorized = adminCheck || user?.email === job?.userMail;
                    return (
                        <div key={job.id} className="w-full p-6 rounded-lg border-2 border-green-400 shadow-2xl bg-orange-200">
                            <div className="">
                                <p className="font-bold">Company : {job.Company_Name}</p>
                                <p className="flex gap-2 items-center"><FaLocationDot /> {job.Location}</p>
                                <p><span className='font-semibold'>👤 Post : </span> {job.Joining_Post}</p>
                                <p className='text-lg font-semibold'>💼 Job Role : {job.JobName}</p>
                                <p><span className="font-bold">About Job :</span> {job.AboutJob}</p>
                                <p className="flex gap-2 items-center"><TbCoinTakaFilled className="text-2xl" /> {job.Salary} BDT</p>
                            </div>
                            {isAuthorized && (
                                <div className="text-right mr-4 mb-3">
                                    <Link to={`/update_job/${job.JobID}`}>
                                        <button className="btn btn-accent text-2xl"><FiEdit /></button>
                                    </Link>
                                </div>
                            )}
                            {isAuthorized && (
                                <div className="text-end mr-4 mb-2">
                                    <button onClick={() => handleDelete(job.JobID)} className="btn btn-error text-2xl"><MdAutoDelete /></button>
                                </div>
                            )}
                            <div className="flex items-center gap-2 pt-6">
                                <Link to='/jobopportunity'><button className="btn btn-error">Back</button></Link>
                                {user && <Link to={`/viewdetails/${job.JobID}`} state={{ from: `/jobserach/${jobName}` }}><button
                                    className="btn btn-end btn-accent">
                                    View Details
                                </button></Link>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ShowSearchData;
