import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { TbCoinTakaFilled } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const ViewDetails = () => {
    const { jobId } = useParams();
    const [jobDetails, setJobDetails] = useState({});
    const { user } = useContext(AuthContext);
    const [applied, setApplied] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5001/jobopportunities/${jobId}`)
            .then(res => {
                const data = res.data;
                data.Apply_Last_Date = new Date(data.Apply_Last_Date).toLocaleDateString('en-GB').replace(/\//g, '-');
                data.JoinDate = new Date(data.JoinDate).toLocaleDateString('en-GB').replace(/\//g, '-');
                setJobDetails(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [jobId]);

    const handleFileChange = (e) => {
        setResumeFile(e.target.files[0]);
    };

    const handleApplyNow = () => {
        if (!resumeFile) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please attach your resume or CV before applying!',
            });
            return;
        }

        const subject = `Application for ${jobDetails.JobName}`;
        const body = `Dear ${jobDetails.Company_Name},\n\nI am writing to apply for the ${jobDetails.JobName} position.\n\nMy email is: ${user.email}\n\nI am writing to express my interest in the Front-End Developer position at Islami Bank. With a strong foundation in modern web technologies including HTML, CSS, JavaScript, React.js, and responsive design principles, I am confident in my ability to contribute to your team and enhance the user experience of your digital platforms.\n\nIn my recent role, I have developed and optimized user-facing features, collaborated closely with UI/UX teams, and ensured cross-browser compatibility and performance optimization. I am particularly drawn to Islami Bank’s commitment to innovation and digital transformation, and I am excited about the opportunity to be part of that mission.\n\nPlease find my resume attached for your review. I would welcome the opportunity to further discuss how my background, skills, and enthusiasm align with the goals of your development team.\n\nThank you for considering my application. I look forward to the possibility of contributing to Islami Bank’s ongoing success.\n\nSincerely,\n${user.displayName || user.email}\n\n--- Please remember to attach your resume before sending ---`;
        const mailtoLink = `mailto:${jobDetails.userMail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
        setApplied(true);
        Swal.fire({
            icon: 'success',
            title: 'Email Client Opened',
            text: 'Your email client has been opened to send the application. Please attach your resume.',
        });
    };

    return (
        <div className="py-4 min-h-screen">
            <div className="text-center py-8 bg-green-400 mb-2 rounded-lg px-0 w-[96%] mx-auto">
                <h1 className="text-4xl font-bold text-center pb-2">Job Details</h1>
                <p className="px-4">Explore full information about this opportunity, including job description, requirements, salary, location, <br /> and how to apply. Make sure your profile matches before applying to increase your chances of selection.</p>
            </div>
            <div className="card bg-cyan-800 w-[96%] mx-auto text-white py-12 px-10">
                <div className="card-body">
                    <div className="flex justify-content-between gap-2">
                        <p className="font-bold">Company : {jobDetails.Company_Name}</p>
                        <p className="flex gap-2 items-center"><FaLocationDot /> {jobDetails.Location}</p>
                        <p>Time Duration : {jobDetails.TimeDuration}</p>
                        <p>Job Type : {jobDetails.JobType}</p>
                    </div>
                    <p><span className='font-semibold'>👤 Role : </span> {jobDetails.Joining_Post}</p>
                    <p className='text-lg font-semibold'>💼 Position Title : {jobDetails.JobName}</p>
                    <p><span className="font-bold">About Job :</span> {jobDetails.AboutJob}</p>
                    <p><span className="font-bold">Required Skills :</span> {jobDetails.RequiredSkills}</p>
                    <p><span className="font-bold">About Company :</span> {jobDetails.AboutCompany}</p>
                    <div className="flex py-3">
                        <p className="flex gap-2 items-center"><TbCoinTakaFilled className="text-2xl"></TbCoinTakaFilled> {jobDetails.Salary} BDT</p>
                        <p>Apply Last Date : {jobDetails.Apply_Last_Date}</p>
                        <p>Joing Date : {jobDetails.JoinDate}</p>
                    </div>
                    <p>Number Of Opening : {jobDetails.NumberOfOpenings}</p>
                    <p className="flex text-center items-center gap-2"><MdEmail className="text-2xl"></MdEmail>{jobDetails?.userMail}</p>
                </div>

                <div className="flex flex-col pb-8 mx-8 pt-2">
                    {user && (
                        <div className="mb-4 w-72">
                            <label className="text-white text-sm font-bold mb-3" htmlFor="resume">
                                Attach Resume :
                            </label>
                            <input
                                type="file"
                                id="resume"
                                onChange={handleFileChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    )}
                    <div className="flex">
                        <button onClick={() => navigate(-1)} className="btn btn-secondary mx-4">Go Back</button>
                        {user && <button onClick={handleApplyNow} className="btn btn-success text-black" disabled={applied}>
                            {applied ? "Applied" : "Apply Now"}
                        </button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;