import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import { jobRoles } from "../../jobRoles";

const CreateUser = () => {
    const { user } = useContext(AuthContext);

    const navigate = useNavigate()
    const handleCreateJob = (e) => {
        e.preventDefault();
        const form = e.target;
        const companyName = form.Company_Name.value;
        const jobType = form.Job_Type.value;
        const jobName = form.Job_Name.value;
        const location = form.Location.value;
        const Joining_Post = form.Joining_Post.value;
        const salary = form.Salary.value;
        const applyLastDate = new Date(form.Apply_Last_Date.value).toLocaleDateString('en-GB').replace(/\//g, '-');
        const joinDate = new Date(form.Join_Date.value).toLocaleDateString('en-GB').replace(/\//g, '-');
        const timeDuration = form.TimeDuration.value;
        const numberOfOpenings = form.NumberOfOpenings.value;
        const aboutJob = form.AboutJob.value;
        const requiredSkills = form.RequiredSkills.value;
        const aboutCompany = form.AboutCompany.value;
        const userMail = user?.email
        const jobData = { companyName, jobType, jobName, location, Joining_Post, salary, applyLastDate, joinDate, timeDuration, numberOfOpenings, aboutJob, requiredSkills, aboutCompany, userMail }

        axios.post("http://localhost:5001/add_job", jobData)
            .then(res => {
                console.log(res);
                toast.success("Jobs Offer Created Successfully");
                // navigate('/showjob');  // Redirecting after submission
            })
            .catch(err => {
                console.log(err);
            });

        form.reset();
    };

    return (
        <div style={{ backgroundImage: "url(https://i.ibb.co.com/hFsh3vXM/post.jpg)" }} className="flex mx-auto text-center justify-center items-center">
            <div className="bg-base-100 w-full max-w-4xl shadow-2xl p-6 my-6 rounded-2xl">
                <div className="bg-base-300 text-3xl font-bold text-orange-600 rounded-box grid h-16 place-items-center mb-2">
                    Post Your Job Info
                </div>
                <form onSubmit={handleCreateJob} className="space-y-4">
                    {/* First Row */}
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="fieldset-label">Company Name</label>
                            <input name="Company_Name" type="text" className="input w-full" placeholder="Company Name" required />
                        </div>
                        <div className="w-1/2">
                            <label className="fieldset-label">Job Type</label>
                            <select name="Job_Type" className="input w-full" required>
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
                            <select name="Job_Name" className="input w-full" required>
                                <option value="">Select Job Name</option>
                                {jobRoles.map(role => (
                                    <option key={role.value} value={role.value}>{role.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="fieldset-label">Location</label>
                            <input name="Location" type="text" className="input w-full" placeholder="Location" required />
                        </div>
                    </div>
                    {/* Third Row */}
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="fieldset-label">Position</label>
                            <input name="Joining_Post" type="text" className="input w-full" placeholder="Position" required />
                        </div>
                        <div className="w-1/2">
                            <label className="fieldset-label">Salary</label>
                            <input name="Salary" type="text" className="input w-full" placeholder="Salary" required />
                        </div>
                    </div>
                    {/* Fourth Row */}
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="fieldset-label">Apply Last Date</label>
                            <input name="Apply_Last_Date" type="date" className="input w-full" required />
                        </div>
                        <div className="w-1/2">
                            <label className="fieldset-label">Join Date</label>
                            <input name="Join_Date" type="date" className="input w-full" required />
                        </div>
                    </div>
                    {/* Fifth Row */}
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="fieldset-label">Time Duration (months)</label>
                            <input name="TimeDuration" type="number" className="input w-full" placeholder="Time Duration" required />
                        </div>
                        <div className="w-1/2">
                            <label className="fieldset-label">Number of Openings</label>
                            <input name="NumberOfOpenings" type="number" className="input w-full" placeholder="Number of Openings" required />
                        </div>
                    </div>
                    {/* Larger Text Areas for About Job & Required Skills */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="fieldset-label">About Job</label>
                            <textarea name="AboutJob" className="textarea w-full h-12" placeholder="Describe the job in detail..." required></textarea>
                        </div>
                        <div>
                            <label className="fieldset-label">Required Skills</label>
                            <textarea name="RequiredSkills" className="textarea w-full h-12" placeholder="List the required skills..." required></textarea>
                        </div>
                        <div>
                            <label className="fieldset-label">About Company</label>
                            <textarea name="AboutCompany" className="textarea w-full h-12" placeholder="Describe the company..." required></textarea>
                        </div>
                    </div>
                    <button className="btn btn-success mt-4 w-full text-lg">Offer New Job</button>
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </div>



    );
};

export default CreateUser;
