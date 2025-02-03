import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { RiMoneyPoundBoxFill } from "react-icons/ri";
import { MdAutoDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

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



    // if (!jobDetails) return <div>Loading...</div>;

    return (
        <div className="py-8 bg-amber-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center my-10">Job Details</h1>
            <div className="card bg-cyan-800 w-[80%] mx-auto text-white">
                <div className="card-body">
                    <div className="flex justify-between">
                        <p className="font-bold">Company : {jobDetails.Company_Name}</p>
                        <p className="flex gap-2 items-center"><FaLocationDot /> {jobDetails.Location}</p>
                        <p>Duration : {jobDetails.TimeDuration} </p>
                    </div>
                    <p>Join as a : {jobDetails.Joining_Post}</p>
                    <p>Name of job : {jobDetails.JobName}</p>
                    <p><span className="font-bold">About Job :</span> {jobDetails.AboutJob}</p>
                    <p><span className="font-bold">Required Skills :</span> {jobDetails.RequiredSkills}</p>
                    <p><span className="font-bold">About Company :</span> {jobDetails.AboutCompany}</p>
                    <div className="flex">
                        <p className="flex gap-2 items-center"><RiMoneyPoundBoxFill /> {jobDetails.Salary}</p>
                        <p>Apply By {jobDetails.Apply_Last_Date}</p>
                    </div>
                    <p>Number Of Opening : {jobDetails.NumberOfOpenings}</p>
                </div>
              
                <div className="text-end pb-8 mx-8">
                    <Link to="/jobopportunity"><button className="btn btn-secondary mx-7">Back All Jobs</button></Link>
                    <button className="btn btn-success text-black">Apply Now</button>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;
