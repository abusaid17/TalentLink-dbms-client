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

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 mx-auto mt-8  '>
            {user.map((usr) => 
                <div className="">
                <div className="card bg-base-100 image-full w-96 shadow-sm ">
                    <figure>
                        <img
                            src={"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                            alt="Shoes" />
                    </figure>
                    <div key={usr.id} className="card-body">
                        <h2 className="card-title">{usr.name} </h2>
                        <p>{usr.email}</p>
                        <p>{usr.age}</p>
                        <p>{usr.gender}</p>
                        <div className="card-actions justify-end">
                            <Link to="/updateuser"><button className="btn btn-primary">Update</button></Link>
                            <Link to="/deleteuser"><button className="btn btn-secondary">Delete</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            )}

        </div>
    );
};

export default ShowUser;