import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    // console.log(user);




    // const deleteUser = async (userId) => {
    //     console.log("Deleting user with id:", userId);
    //     try {
    //         const response = await axios.delete(`http://localhost:5000/delete_user/${userId}`, {
    //             headers: {
                    
    //                 "Content-Type": "Access-Control-Allow-Origin",
    //             },
    //         });
    //         console.log(response.data);
    //         alert("User deleted successfully!");
    //     } catch (error) {
    //         console.error("Error deleting user:", error.response?.data?.message || error.message);
    //         alert("Error deleting user: " + (error.response?.data?.message || error.message));
    //     }
    // };
    const handleDelete = (id) => {

        axios.delete(`http://localhost:5001/delete_user/${id}`)
            .then(res => {
                location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

    

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 mx-auto mt-8'>
            {user.map((usr) =>
                <div className="">
                    <div className="card bg-base-100 image-full w-96 shadow-sm">
                        <figure>
                            <img
                                src={"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                                alt="Shoes" />
                        </figure>
                        <div key={usr.id} className="card-body">
                            <p>{usr.id}</p>
                            <h2 className="card-title">{usr.name} </h2>
                            <p>{usr.email}</p>
                            <p>{usr.age}</p>
                            <p>{usr.gender}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/updateuser/${usr?.id}`}><button className="btn btn-primary">Update</button></Link>
                                <button className='btn btn-info' onClick={() => handleDelete(usr.id)}>Delete</button>;
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ShowUser;