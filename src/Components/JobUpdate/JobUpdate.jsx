import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const JobUpdate = () => {
    const { JobID } = useParams();
    const navigate = useNavigate()
    const [valus, setValues] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5001/get_job/${JobID}`)
            .then(res => {
                const data = res.data;
                // Format dates for input[type="date"]
                data.Apply_Last_Date = new Date(data.Apply_Last_Date).toISOString().split('T')[0];
                data.JoinDate = new Date(data.JoinDate).toISOString().split('T')[0];
                setValues(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [JobID])

    const handleUpdatejobs = (event) => {
        event.preventDefault();
        const form = event.target;
        const jobData = {
            Company_Name: form.Company_Name.value,  // Ensure matches DB column
            JobType: form.JobType.value,  // Ensure matches DB column
            JobName: form.JobName.value,
            Location: form.Location.value,
            Joining_Post: form.Joining_Post.value,  // Change to match "position" in DB
            Salary: form.Salary.value,
            Apply_Last_Date: form.Apply_Last_Date.value,
            JoinDate: form.JoinDate.value,
            TimeDuration: form.TimeDuration.value,
            AboutJob: form.AboutJob.value,
            RequiredSkills: form.RequiredSkills.value,
            AboutCompany: form.AboutCompany.value,
            NumberOfOpenings: form.NumberOfOpenings.value
        };

        axios.put(`http://localhost:5001/update_job/${JobID}`, jobData)
            .then(res => {
                // console.log(res);
                console.log("Job Data Sent:", jobData);
                toast.success("Job Info Updated succesfully");
                // navigate('/showuser');
            })
            .catch(error => {
                console.error(error);
            })
        form.reset();
    }
    return (
        <div>
            <div className="flex mx-auto mt-2 text-center justify-center items-center">
                <div className="bg-base-100 w-full max-w-4xl shadow-2xl p-6">
                    <div className="bg-base-300 text-3xl font-bold text-orange-600 rounded-box grid h-16 place-items-center mb-2">
                        Update Job Info
                    </div>
                    <form onSubmit={handleUpdatejobs} className="space-y-4">
                        {/* First Row */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="fieldset-label">Company Name</label>
                                <input name="Company_Name" type="text" className="input w-full" placeholder="Company Name"
                                    defaultValue={valus.Company_Name} required />
                            </div>
                            <div className="w-1/2">
                                <label className="fieldset-label">Job Type</label>
                                <select name="JobType" className="input w-full" defaultValue={valus.JobType} required>
                                    <option value="">Select Job Type</option>
                                    <option value="On-site">On-site</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>
                        </div>
                        {/* Second Row - Added Job Name */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="fieldset-label">Job Name</label>
                                <input name="JobName" type="text" className="input w-full" placeholder="Job Name" defaultValue={valus.JobName}
                                    required />
                            </div>
                            <div className="w-1/2">
                                <label className="fieldset-label">Location</label>
                                <input name="Location" type="text" className="input w-full" placeholder="Location" defaultValue={valus.Location}
                                    required />
                            </div>
                        </div>
                        {/* Third Row */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="fieldset-label">Joining Post</label>
                                <input name="Joining_Post" type="text" className="input w-full" placeholder="Position" defaultValue={valus.Joining_Post}
                                    required />
                            </div>
                            <div className="w-1/2">
                                <label className="fieldset-label">Salary</label>
                                <input name="Salary" type="text" className="input w-full" placeholder="Salary" defaultValue={valus.Salary}
                                    required />
                            </div>
                        </div>
                        {/* Fourth Row */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="fieldset-label">Apply Last Date</label>
                                <input name="Apply_Last_Date" type="date" className="input w-full" defaultValue={valus.Apply_Last_Date}
                                    required />
                            </div>
                            <div className="w-1/2">
                                <label className="fieldset-label">Join Date</label>
                                <input name="JoinDate" type="date" className="input w-full" defaultValue={valus.JoinDate}
                                    required />
                            </div>
                        </div>
                        {/* Fifth Row */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="fieldset-label">Time Duration (months)</label>
                                <input name="TimeDuration" type="number" className="input w-full" defaultValue={valus.TimeDuration}
                                    placeholder="Time Duration" />
                            </div>
                            <div className="w-1/2">
                                <label className="fieldset-label">Number of Openings</label>
                                <input name="NumberOfOpenings" type="number" className="input w-full" placeholder="Number of Openings" defaultValue={valus.NumberOfOpenings}
                                    required />
                            </div>
                        </div>
                        {/* Larger Text Areas for About Job & Required Skills */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="fieldset-label">About Job</label>
                                <textarea name="AboutJob" className="textarea w-full h-20" placeholder="Describe the job in detail..." defaultValue={valus.AboutJob}
                                    required></textarea>
                            </div>
                            <div>
                                <label className="fieldset-label">Required Skills</label>
                                <textarea name="RequiredSkills" className="textarea w-full h-20" placeholder="List the required skills..." defaultValue={valus.RequiredSkills}
                                    required></textarea>
                            </div>
                            <div>
                                <label className="fieldset-label">About Company</label>
                                <textarea name="AboutCompany" className="textarea w-full h-20" placeholder="Describe the company..." defaultValue={valus.AboutCompany}
                                    required></textarea>
                            </div>
                        </div>
                        <button className="btn btn-neutral mt-4 w-full">Update Job Details</button>
                    </form>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default JobUpdate;
