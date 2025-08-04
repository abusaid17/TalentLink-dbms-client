import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { TbCoinTakaFilled } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { MdAutoDelete } from "react-icons/md";

const ShowSearchData = ({ email, Admin, handleDelete, handleViewDetails }) => {
    const { jobName } = useParams();
    const [job, setJob] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!jobName) return;

        axios.get(`http://localhost:5001/get_job_by_name/${jobName}`)
            .then(res => {
                setJob(res.data[0]);
                console.log(res.data[0])
            })
            .catch(err => {
                if (err.response?.status === 404) {
                    alert("Job not found.");
                } else {
                    alert("Something went wrong.");
                }
            });
    }, [jobName]);


    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!job) return <p className="text-center">Loading job details...</p>;
    const isButtonDisabled = !(Admin || email === job?.userMail);

    return (


        <div>
            <div key={job.id} className="card bg-base-200 w-full">
                <div className="card-body">
                    <p className="font-bold">Company : {job.Company_Name}</p>
                    <p className="flex gap-2 items-center"><FaLocationDot /> {job.Location}</p>
                    <p><span className='font-semibold'>👤 Post : </span> {job.Joining_Post}</p>
                    <p className='text-lg font-semibold'>💼 Job Role : {job.JobName}</p>
                    <p><span className="font-bold">About Job :</span> {job.AboutJob}</p>
                    <p className="flex gap-2 items-center"><TbCoinTakaFilled className="text-2xl" /> {job.Salary} BDT</p>
                </div>
                <Link className="text-right mr-4 mb-3" to={`/update_job/${job.JobID}`}>
                    <button disabled={isButtonDisabled} className="btn btn-accent text-2xl"><FiEdit />
                    </button></Link>
                <div className="text-end mr-4 mb-2">
                    <button disabled={isButtonDisabled} onClick={() => handleDelete(job.JobID)} className="btn btn-error text-2xl"><MdAutoDelete /></button>
                </div>
                {email && <button
                    onClick={() => handleViewDetails(job.JobID)}
                    className="btn btn-end btn-accent text-black text-lg font-bold">
                    View Details
                </button>}
            </div>
        </div>

        // <div className="p-4 max-w-3xl mx-auto bg-white shadow rounded">
        //     <h1 className="text-2xl font-bold mb-2">{job.JobName}</h1>
        //     <p><strong>Company:</strong> {job.Company_Name}</p>
        //     <p><strong>Type:</strong> {job.JobType}</p>
        //     <p><strong>Location:</strong> {job.Location}</p>
        //     <p><strong>Joining Post:</strong> {job.Joining_Post}</p>
        //     <p><strong>Salary:</strong> {job.Salary}</p>
        //     <p><strong>Apply Before:</strong> {job.Apply_Last_Date}</p>
        //     <p><strong>Join Date:</strong> {job.JoinDate}</p>
        //     <p><strong>Duration:</strong> {job.TimeDuration}</p>
        //     <p><strong>Skills:</strong> {job.RequiredSkills}</p>
        //     <p><strong>About Job:</strong> {job.AboutJob}</p>
        //     <p><strong>Company Info:</strong> {job.AboutCompany}</p>
        // </div>
    );
};

export default ShowSearchData;
