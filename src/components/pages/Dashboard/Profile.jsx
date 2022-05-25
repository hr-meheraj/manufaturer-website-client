import React,{useState, useEffect} from 'react'
import { BiEdit } from 'react-icons/bi'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../../firebase/firebase.config'
import Loading from '../../Shared/Loading/Loading'
import ProfileUpdateModal from './ProfileUpdateModal'
import axios from 'axios'
import { useQuery } from 'react-query'
function Profile() {
    const [authUser, loading] = useAuthState(auth);
    const [userInfo, setUserInfo] = useState({});
    const { status, data : user , error, refetch } =  useQuery(["user", authUser], async () => {
        const { data } = await axios.get(
         `https://manufacturer-server.hrmeheraj.repl.co/users/${authUser?.email}`
        );
        return data;
      });
      if(error){
          console.log("inside error", error);
      }
    return (
        <div className='max-w-[720px] w-[95%] mx-auto mt-[20px] shadow-sm rounded-md'>
            {
                (status === "loading" || loading) && <Loading/> 
            }
            <div className='flex justify-around items-center py-2'>
                <h2 className='text-xl font-semibold text-primary'> My Profile </h2>
                <label for="userInfoModal" onClick={() => setUserInfo(authUser)} className='btn btn-active btn-link gap-2'> Edit <BiEdit/> </label>
            </div>
            <hr />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[40px] profile'>
               <div className='flex justify-center items-center '>
                 <div className="avatar online">
                    <div className="w-[160px] rounded-full">
                        <img src="https://api.lorem.space/image/face?hash=28212" />
                    </div>
                </div>
                </div>
                <div>
                    <h4 className="font-semibold"> Full Name </h4>
                    <h2 className='text-xl mb-6'>
                        {user?.name ?  (<span>{user?.name} </span> ): (<span className='text-gray-600'> Not Set Name </span>)}
                    </h2>
                    

                    <h4 className="font-semibold"> Email Address </h4>
                    <h2 className='text-xl mb-6'>{user?.email ? <span>{user?.email} </span> : <span className='text-gray-600'> Email not Set </span>}</h2>
                </div> 
            </div>
            <div className='my-[40px]'> 
                <h2 className='text-2xl text-center  mb-6 location bg-[#e7e7e9] px-4 py-6 rounded-md'>Location </h2> 
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[20px]'> 
                    <div> 
                   <h4 className="font-semibold"> Country </h4>
                    <h2 className='text-xl mb-6'>{user?.country ? <span>{user?.country} </span> : <span className='text-gray-600'> Country not Set</span>}</h2>
                    </div>
                    <div>
                    <h4 className="font-semibold"> City </h4>
                    <h2 className='text-xl mb-6'>{user?.city ? <span>{user?.city} </span> : <span className='text-gray-600'> City Not Set  </span>}</h2>
                     </div>
                    <div>
                    <h4 className="font-semibold"> Country </h4>
                    <h2 className='text-xl mb-6'>{user?.address ? <span>{user?.address} </span> : <span className='text-gray-600'> Street Not  Set  </span>}</h2>
                     </div>
                    <div>
                    <h4 className="font-semibold"> Phone </h4>
                    <h2 className='text-xl mb-6'>{user?.phone ? <span>{user?.phone} </span> : <span className='text-gray-600'> Not set yet </span>}</h2>
                     </div>
                </div>
            </div>
            {
             userInfo && <ProfileUpdateModal setUserInfo={setUserInfo} userInfo={userInfo} refetch={refetch}/>
            }
        </div>
    )
}

export default Profile
