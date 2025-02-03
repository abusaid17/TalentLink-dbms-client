import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';

const Profile = () => {
    // const [user, setUser] = useState(null);
    const { user } = useContext(AuthContext)
    console.log(user)



    // Empty dependency array ensures this runs only once when component mounts

    return (
        <div className='my-10 bg-base-200'>
            <h1 className='mx-auto text-center text-4xl font-bold my-4'> Profile </h1>
            <div className="profile-container flex justify-center ">
                {user ? (
                    <div className="card shadow-2xl w-96">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{user?.displayName}'s Profile</h2>
                            <p>User Email : {user?.email}</p>
                        </div>
                        <img src={user?.photoURL} className='h-64 w-64 mx-auto pb-4 rounded-xl' />
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
