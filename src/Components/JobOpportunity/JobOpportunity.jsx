import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import JobShow from "./JobShow";

const JobOpportunity = () => {
    const { user } = useContext(AuthContext);
    const [JobOpportunity, setJobOpportunity] = useState([]);
    const navigate = useNavigate();  // Initialize useNavigate
    const [setUserData] = useState([]);
    const [adminCheck, setadminCheck] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:5001/jobopportunities")
            .then(res => {
                setJobOpportunity(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5001/get_user/${user?.email}`)
            .then((res) => {
                setUserData(res.data)
                if (res.data?.role === "Admin") {
                    setadminCheck(true)
                } else {
                    setadminCheck(false)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [user])
    const handleViewDetails = (jobId) => {
        navigate(`/viewdetails/${jobId}`);  // Navigate to the ViewDetails page with the jobId
    };
    const handleDelete = (JobID) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You want to Delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5001/delete_job/${JobID}`)
                    .then(res => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        location.reload();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        });
    }

    return (
        <div className="py-6 bg-gray-300">
            <div className="card bg-base-300 text-3xl font-bold rounded-box grid h-16 place-items-center mb-2 w-[30%] mx-auto">All Listed Job</div>
            <p className="text-center py-4">Find the right job for your skills. Choose from the jobs listed below and apply to unlock new opportunities! 🚀</p>
            <div className="mx-auto flex pt-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-4 ">
                    {JobOpportunity.map((job) =>
                        <JobShow
                            key={job.id}
                            job={job}
                            email={user?.email}
                            Admin={adminCheck}
                            handleDelete={handleDelete}
                            handleViewDetails={handleViewDetails}
                        ></JobShow>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobOpportunity;