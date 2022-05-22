import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.config'
import Loading from '../../Shared/Loading/Loading';

function IndexDashboard() {
    const [user, loading] = useAuthState(auth);
    if(user){
        console.log(user);
    }
    return (
        <div>
            {
                loading && <Loading/>
            }
            <h2 className='text-5xl mb-5 text-primary text-center mt-[20px]'> WELCOME TO DASHBOARD!</h2>
            {
                user && <h3> Hi, {user?.displayName}</h3>
            }
        </div>
    )
}

export default IndexDashboard
