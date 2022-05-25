import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.config'
import Loading from '../../Shared/Loading/Loading';
import { MdSpaceDashboard } from 'react-icons/md'
import { Link } from 'react-router-dom'
function IndexDashboard() {
    const [user, loading] = useAuthState(auth);
    return (
        <div className='max-w-[720px] w-[95%] mx-auto mt-[20px] shadow-sm rounded-md'>
         <div className='flex justify-around items-center py-2 shadow-xl rounded-full'>
                <h2 className='text-xl font-semibold text-primary'> Hi , { user?.displayName} </h2>
                <label for="" className='text-2xl'> <MdSpaceDashboard/> </label>
            </div>
            <div className='h-[300px] shadow-md w-[95%] mx-auto w-full flex justify-center items-center mt-[40px] mb-[40px]'> 
                <div className='text-center'>
                    <h2 className='py-2 text-2xl font-bold text-primary'> Welcome to Dashboard! </h2> 
                    <p className='font-semibold text-gray-600'>Explore All of the Features and Give a Review. </p>
                    <Link to='profile' className='mt-[15px] btn '>My Profile  </Link>
                </div>
            </div>
        </div>
    )
}

export default IndexDashboard
