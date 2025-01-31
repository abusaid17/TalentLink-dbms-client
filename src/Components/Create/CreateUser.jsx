import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const CreateUser = () => {

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
        })
        .catch(err => {
            console.log(err);
        })
        form.reset();
    }

    return (
        <div className="flex mx-auto mt-8 text-center justify-center items-center">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleCreateUser} className="fieldset">
                        <div className="card bg-base-300 text-3xl font-bold text-orange-600 rounded-box grid h-16 place-items-center mb-2">Create User Info</div>
                        <div>
                        <label className="fieldset-label">ID </label>
                        <input name="id"  type="number" className="input" placeholder="Id" />
                        </div>
                        <div>
                        <label className="fieldset-label">Name</label>
                        <input  name="name" type="text" className="input" placeholder="Name"/>
                        </div>
                        <div>
                        <label className="fieldset-label">Email</label>
                        <input  name="email" type="email" className="input" placeholder="Email"/>
                        </div>
                        <div>
                        <label className="fieldset-label">Age</label>
                        <input  name="age" type="number" className="input" placeholder="Age"/>
                        </div>
                       <div>
                       <label className="fieldset-label">Gender</label>
                       <input  name="gender" type="text" className="input" placeholder="male/female"/>
                       </div>
                        <button className="btn btn-neutral mt-4">CreateUser Info</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;