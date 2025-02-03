import axios from "axios";
import { useEffect, useState } from "react";
import { FaBangladeshiTakaSign, FaLocationDot } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { MdAutoDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { TbCoinTakaFilled } from "react-icons/tb";




const JobOpportunity = () => {

    const [JobOpportunity, setJobOpportunity] = useState([]);
    const navigate = useNavigate();  // Initialize useNavigate


    useEffect(() => {
        axios.get("http://localhost:5001/jobopportunities")
            .then(res => {
                setJobOpportunity(res.data);
                // console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleViewDetails = (jobId) => {
        navigate(`/viewdetails/${jobId}`);  // Navigate to the ViewDetails page with the jobId
    };

    const handleDelete = (JobID) => {

        axios.delete(`http://localhost:5001/delete_job/${JobID}`)
            .then(res => {
                location.reload();
                console.log('inside delete func ', res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }




    return (
        <div className="py-6 bg-gray-300">
            <div className="card bg-base-300 text-3xl font-bold rounded-box grid h-16 place-items-center mb-2 w-[30%] mx-auto">All Listed Job</div>
            <p className="text-center py-4">Find the right job for your skills. Choose from the jobs listed below and apply to unlock new opportunities! 🚀</p>
            <div className="mx-auto flex pt-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-4 ">
                    {JobOpportunity.map((job) =>
                        <div key={job.id} className="card bg-base-200 w-full">
                            <div className="card-body">
                                <p className="font-bold">Company : {job.Company_Name}</p>
                                <p className="flex gap-2 items-center"><FaLocationDot /> {job.Location}</p>
                                <p>Join as a : {job.Joining_Post}</p>
                                <p>Name of job : {job.JobName}</p>
                                <p><span className="font-bold">Abou Job :</span> {job.AboutJob}</p>
                                <p className="flex gap-2 items-center"><TbCoinTakaFilled className="text-2xl"/> {job.Salary} BDT</p>
                            </div>
                            <p className="text-end mb-3 mr-4"><Link to={`/update_job/${job.JobID}`}><button className="btn btn-secondary text-2xl"><FiEdit />
                            </button></Link></p>
                            <div className="text-end mr-4 mb-2">
                                <button onClick={() => handleDelete(job.JobID)} className="btn text-orange-500 text-2xl"><MdAutoDelete /></button>
                            </div>
                            <button
                                onClick={() => handleViewDetails(job.JobID)}
                                className="btn btn-end btn-accent text-black text-lg font-bold">
                                View Details
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobOpportunity;