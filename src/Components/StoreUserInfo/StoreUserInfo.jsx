import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ShowUser from '../ShowUser/ShowUser';

const StoreUserInfo = () => {
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
    console.log(user);

    return (
        <div className="card bg-base-100 image-full w-96 shadow-sm">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                
                   

                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default StoreUserInfo;