import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img from "../../assets/image/bg.jpg"
import Swal from 'sweetalert2';
import { MdAutoDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';

const ShowUser = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5001/get_users")
            .then(res => {
                setUser(res.data);
                // console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleDelete = (id) => {



        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5001/delete_user/${id}`)
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
        <div className='flex mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mx-auto mt-8 items-center justify-center'>
                {user.map((usr) =>
                    <div>
                        <div className="card bg-base-100 image-full w-96 shadow-sm">
                            {/* <figure>
                                <img
                                    src={img} />
                            </figure> */}
                            <div key={usr.id} className="card-body">
                                {/* <p>User Id : {usr.id}</p> */}
                                <h2 className="card-title">Name : {usr.name} </h2>
                                <p>Email : {usr.email}</p>
                                <p>Age : {usr.age}</p>
                                <p>Gender : {usr.gender}</p>
                                <div className="card-actions justify-end">
                                    {/* <Link to="/create"><button className='btn btn-secondary'>Create</button></Link> */}
                                    <Link to={`/updateuser/${usr?.id}`}><button className="btn btn-secondary"><FiEdit></FiEdit></button></Link>
                                    <button className='btn btn-info' onClick={() => handleDelete(usr.id)}><MdAutoDelete className='text-xl'></MdAutoDelete></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ShowUser;