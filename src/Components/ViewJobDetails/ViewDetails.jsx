import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { RiMoneyPoundBoxFill } from "react-icons/ri";
import { TbCoinTakaFilled } from "react-icons/tb";
import { MdEmail } from "react-icons/md";

const ViewDetails = () => {
    const { jobId } = useParams();  // Retrieve jobId from the URL
    const [jobDetails, setJobDetails] = useState([]);
    const jobIdInt = parseInt(jobId)
    // console.log("id: ",jobId)
    useEffect(() => {
        // Fetch job details using jobId from the URL
        axios.get(`http://localhost:5001/jobopportunities/${jobId}`)
            .then(res => {
                setJobDetails(res.data);
                console.log(jobDetails)
            })
            .catch(err => {
                console.log(err);
            })
    }, [jobIdInt]);

    return (
        <div className="py-4 bg-gray-200 min-h-screen">
            <h1 className="text-4xl font-bold text-center my-8">Job Details</h1>
            <div className="card bg-cyan-800 w-[80%] mx-auto text-white py-12 px-10">
                <div className="card-body">
                    <div className="flex justify-between">
                        <p className="font-bold">Company : {jobDetails.Company_Name}</p>
                        <p className="flex gap-2 items-center"><FaLocationDot /> {jobDetails.Location}</p>
                        <p>Time Duration : {jobDetails.TimeDuration}</p>
                    </div>
                    <p>Join as a : {jobDetails.Joining_Post}</p>
                    <p className="pb-2">Name of job : {jobDetails.JobName}</p>
                    <p><span className="font-bold">About Job :</span> {jobDetails.AboutJob}</p>
                    <p><span className="font-bold">Required Skills :</span> {jobDetails.RequiredSkills}</p>
                    <p><span className="font-bold">About Company :</span> {jobDetails.AboutCompany}</p>
                    <div className="flex py-3">
                        <p className="flex gap-2 items-center"><TbCoinTakaFilled className="text-2xl"></TbCoinTakaFilled> {jobDetails.Salary} BDT</p>
                        <p>Apply By {jobDetails.Apply_Last_Date}</p>
                        <p>Joing Date : {jobDetails.JoinDate}</p>
                    </div>
                    <p>Number Of Opening : {jobDetails.NumberOfOpenings}</p>
                    <p className="flex text-center items-center gap-2"><MdEmail className="text-2xl"></MdEmail>{jobDetails?.userMail}</p>
                </div>

                <div className="flex text-end pb-8 mx-8">
                    <Link to="/jobopportunity"><button className="btn btn-secondary mx-4">Back Jobs</button></Link>
                    <button className="btn btn-success text-black">Apply Now</button>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;
