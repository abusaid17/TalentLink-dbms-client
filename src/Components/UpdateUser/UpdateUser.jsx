import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [valus, setValues] = useState([])

    console.log("params id : ", id)
    useEffect(() => {
        axios.get(`http://localhost:5001/get_user/${id}`)
            .then(res => {
                console.log(res);
                // setValues({...valus, id: res.data[0].id, name:res.data[0].name,email:res.data[0].email, age:res.data[0].age, gender:res.data[0].gender });  
                setValues(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [id])
    console.log("user value array:  ", valus)

    const handleUpdateUser = (event) => {
        event.preventDefault();

        const form = event.target;
        const id = form.id.value;
        const name = form.name.value;
        const email = form.email.value;
        const age = form.age.value;
        const gender = form.gender.value;
        const userInfo = { id, name, email, age, gender };
        console.log(userInfo);
        axios.put(`http://localhost:5001/update/${id}`, userInfo)
            .then(res => {
                console.log(res);
                navigate('/showuser');
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className="flex mx-auto mt-8 text-center justify-center items-center">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleUpdateUser} className="fieldset">
                        <div className="card bg-base-300 text-3xl font-bold text-orange-600 rounded-box grid h-16 place-items-center mb-2">Update User Info</div>
                        <div>
                            <label className="fieldset-label">ID </label>
                            <input type="number" name="id" className="input" placeholder="Id" value={valus.id}
                                onChange={e => setValues({ ...valus, id: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="fieldset-label">Name</label>
                            <input type="text" name="name" className="input" placeholder="Name" value={valus.name}
                                onChange={e => setValues({ ...valus, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="fieldset-label">Email</label>
                            <input type="email" name="email" className="input" placeholder="Email" value={valus.email}
                                onChange={e => setValues({ ...valus, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="fieldset-label">Age</label>
                            <input type="number" name="age" className="input" placeholder="Age" value={valus.age}
                                onChange={e => setValues({ ...valus, age: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="fieldset-label">Gender</label>
                            <input type="text" name="gender" className="input" placeholder="male/female" defaultValue={valus.gender}

                            />
                        </div>
                        <button className="btn btn-neutral mt-4">Update Info</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;