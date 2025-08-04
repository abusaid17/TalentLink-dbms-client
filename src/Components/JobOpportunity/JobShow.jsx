import React, { useEffect, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import { MdAutoDelete } from 'react-icons/md';
import { TbCoinTakaFilled } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { jobRoles } from "../../jobRoles";


const JobShow = ({ job, email, Admin, handleDelete, handleViewDetails }) => {

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
    );
};

export default JobShow;