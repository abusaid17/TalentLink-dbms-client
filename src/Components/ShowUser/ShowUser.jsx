import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { MdDelete } from 'react-icons/md';

const ShowUser = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5001/get_users")
            .then(res => {
                setUser(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleDelete = (Regi_ID) => {

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
                axios.delete(`http://localhost:5001/delete_user/${Regi_ID}`)
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
        <div className='m-6 bg-gradient-to-r from-pink-500 to-sky-500 min-h-screen max-w-[94%] mx-auto rounded-2xl '>
            <h1 className='text-center text-4xl font-bold pt-4'>Registered User</h1>
            <div className='flex mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mx-auto mt-8 items-center justify-center'>
                    {user.map((usr) =>
                        <div>
                            <div className="bg-sky-200  w-[400px] shadow-lg p-4 rounded-xl">
                                {/* <figure>
                                <img
                                    src={img} />
                            </figure> */}
                                <div key={usr.id} className="">
                                    {/* <p>User Id : {usr.id}</p> */}
                                    <h2 className="">User name : {usr.Username} </h2>
                                    <p>Email : {usr.Email}</p>
                                    <p>User Role : <span className='text-lg font-bold text-orange-600'> {usr.role}</span> </p>
                                    {/* <p>Age : {usr.age}</p>
                                <p>Gender : {usr.gender}</p> */}
                                    <div className="card-actions justify-end">
                                        {/* <Link to="/create"><button className='btn btn-secondary'>Create</button></Link> */}
                                        {/* <Link to={`/updateuser/${usr?.id}`}><button className="btn btn-secondary"><FiEdit></FiEdit></button></Link> */}
                                        <button disabled={usr?.role == "Admin"} className='btn btn-success text-sky-800' onClick={() => handleDelete(usr.Regi_ID)}><MdDelete className='text-xl'  ></MdDelete></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowUser;