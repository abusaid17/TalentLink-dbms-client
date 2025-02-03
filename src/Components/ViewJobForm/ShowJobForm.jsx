import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { MdAutoDelete } from 'react-icons/md';
import { RiMoneyPoundBoxFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const ShowJobForm = () => {

    const [jobs, setJobs] = useState([]);
    console.log(jobs)
    useEffect(() => {
        axios.get("http://localhost:5001/get_jobs")
            .then(res => {
                setJobs(res.data.jobs);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);



    return (
        <div>
            <h1>show job</h1>

            <div>
                {
                    jobs.map((job, idx) =>
                        // <h1 >hihii 23 </h1>
                        <div key={idx} className="card bg-cyan-800 w-[80%] mx-auto text-white">
                            <div className="card-body">
                                <div className="flex ">
                                    <p className="font-bold">Company : {job.Company_Name}</p>
                                    <p className="flex gap-2 items-center"><FaLocationDot /> {job.Location}</p>
                                    <p>Duration : {job.TimeDuration} </p>
                                </div>
                                <p>Join as a : {job.Joining_Post}</p>
                                <p>Name of job : {job.JobName}</p>
                                <p><span className="font-bold">About Job :</span> {job.AboutJob}</p>
                                <p><span className="font-bold">Required Skills :</span> {job.RequiredSkills}</p>
                                <p><span className="font-bold">About Company :</span> {job.AboutCompany}</p>
                                <div className="flex">
                                    <p className="flex gap-2 items-center"><RiMoneyPoundBoxFill /> {job.Salary}</p>
                                    <p>Apply By {job.Apply_Last_Date}</p>
                                </div>
                                <p>Number Of Opening : {job.NumberOfOpenings}</p>
                            </div>
                            
                            <div className="text-end pb-8 mx-8">
                                <Link to="/jobopportunity"><button className="btn btn-secondary mx-7">Back All Jobs</button></Link>
                                <button className="btn btn-success text-black">Apply Now</button>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default ShowJobForm;