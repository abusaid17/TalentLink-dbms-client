import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const CreateUser = () => {
    const navigate = useNavigate()
    const handleCreateUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const id = form.id.value;
        const name = form.name.value;
        const email = form.email.value;
        const age = form.age.value;
        const gender = form.gender.value;
        const userInfo = { id, name, email, age, gender };
        console.log(userInfo);

        axios.post("http://localhost:5001/add_user", userInfo)
            .then(res => {
                console.log(res);
                navigate('/showuser');
            })
            .catch(error => {
                console.log("get err ",error);
                // Check if it's an email duplication error
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message, { position: "top-right" });
            } else {
                toast.error("Something went wrong. Please try again.", { position: "top-right" });
            }
            })
        form.reset();
    }

    return (
        <div className="flex mx-auto mt-8 text-center justify-center items-center">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleCreateUser} className="fieldset">
                        <div className="card bg-base-300 text-3xl font-bold text-orange-600 rounded-box grid h-16 place-items-center mb-2">ADD User</div>
                        {/* <div>
                            <label className="fieldset-label">ID </label>
                            <input name="id" type="number" className="input" placeholder="Id" />
                        </div> */}
                        <div>
                            <label className="fieldset-label">Name</label>
                            <input name="name" type="text" className="input" placeholder="Name" required />
                        </div>
                        <div>
                            <label className="fieldset-label">Email</label>
                            <input name="email" type="email" className="input" placeholder="Email" required />
                        </div>
                        <div>
                            <label className="fieldset-label">Age</label>
                            <input name="age" type="number" className="input" placeholder="Age" required />
                        </div>
                        <div>
                            <label className="fieldset-label">Gender</label>
                            <input name="gender" type="text" className="input" placeholder="male/female" required />
                        </div>
                        <button className="btn btn-neutral mt-4">CreateUser Info</button>
                    </form>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default CreateUser;