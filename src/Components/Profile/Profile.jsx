import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FcRating } from 'react-icons/fc';

const Profile = () => {
    // const [user, setUser] = useState(null);
    const { user } = useContext(AuthContext)
    // console.log(user)

    const [userdata, setUserData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5001/get_user/${user?.email}`)
            .then((res) => {
                setUserData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [user])

    return (
        <div className='my-2 py-8 min-h-screen max-w-[90%] mx-auto rounded-2xl'>
            <h1 className='mx-auto text-center text-4xl font-bold my-4'> Profile </h1>
            <div className="profile-container flex justify-center">
                {user ? (
                    <div className="card shadow-2xl w-96 bg-gradient-to-r from-pink-500 to-green-400">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title"><span className='text-red-700'>{user?.displayName ? user?.displayName : userdata?.Username}</span>'s Profile</h2>
                            <p>User Email : {user?.email}</p>
                            <p>User Role : <span className='text-lg font-bold text-red-700'> {userdata.role}</span></p>
                            <p className='flex gap-2'>Rating : <span className='text-xl'><FcRating /></span>
                            </p>
                        </div>
                        <img src={user?.photoURL} alt='This User Not Have an Image' className='h-64 w-64 mx-auto pb-4 rounded-xl' />
                    </div>
                ) : (
                    <>
                        <div className='text-center'>
                            <p className='text-lg font-bold text-orange-700'>Don't Have Sign In User</p>
                            <Link to='/login'><button className='btn btn-secondary mt-8'>Go Sign In</button></Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
