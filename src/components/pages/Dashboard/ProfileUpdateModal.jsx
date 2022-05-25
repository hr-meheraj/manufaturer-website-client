import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";
import { useUpdateProfile } from 'react-firebase-hooks/auth'
import { toast} from 'react-toastify'
import Loading from '../../Shared/Loading/Loading'
import auth from '../../../firebase/firebase.config.js'

function ProfileUpdateModal({ userInfo, setUserInfo, refetch }) {
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [countries, setCountries] = useState([]);
    const [updateProfile, authUpdating, updateError] = useUpdateProfile(auth);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        setUpdating(true);
        await updateProfile({ displayName: data.name });
        await axios.put(`https://manufacturer-server.hrmeheraj.repl.co/users/${userInfo?.email}`, data);
        refetch();
        setUpdating(false);
        toast.success("User Updated Successfully")
        setUserInfo(null);
    }
    useEffect(() => {
        (async () => {
            setLoading(true);
            const { data } = await axios.get('https://restcountries.com/v2/all?fields=name');
            setLoading(false);
            setCountries(data);
        })()
    }, [])

    return (
     <>
     {
         (loading || authUpdating) && <Loading/> 
     }
        <div>
            <input type="checkbox" id="userInfoModal" "modal-toggle" />
            <div "modal modal-bottom sm:modal-middle mx-auto">
                <div "modal-box">
                    <label for="userInfoModal" "btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div "modal-box mx-auto">
                        <h3 "font-bold text-lg">Update Profile</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className='py-2'>
                            <div "form-control w-full max-w-xs">
                                <label "label">
                                    <span "label-text-alt">Full Name : </span>
                                </label>
                                <input defaultValue={userInfo?.displayName || " "} type="text" {...register("name")} "input input-bordered w-full max-w-xs" />
                              
                            </div>
                            <div "form-control w-full max-w-xs">
                                <label "label">
                                    <span "label-text-alt">Email: </span>
                                </label>
                                <input type="email" defaultValue={userInfo?.email} {...register("email")} disabled "input input-bordered w-full max-w-xs" />
                                
                            </div>
                            <div "form-control w-full max-w-xs">
                                <label "label">
                                    <span "label-text-alt">Phone: </span>
                                </label>
                                <input type="phone" {...register("phone")} "input input-bordered w-full max-w-xs" />
                            </div>
                            <div "form-control w-full max-w-xs mb-[15px]">
                               
                            <select "select select-bordered w-full block max-w-xs" {...register("country")}>
                                <option disabled selected>Country?</option>
                                {
                                    countries?.map((country, i) => <option key={i}>{country.name}</option>)
                                }
                            </select>
                            </div>
                            <div "form-control w-full max-w-xs mb-[15px]">
                            <input type="text"  {...register("city")} placeholder='City' "input input-bordered w-full max-w-xs" />
                            </div>

                            <div "form-control w-full max-w-xs mt-[5px]">
                                <label "label">
                                    <span "label-text-alt">Present Address: </span>
                                </label>
                                <textarea "textarea " {...register("address")} placeholder="Present Address..."></textarea>
                            </div>
                            <button className={`w-full btn btn-primary mt-[15px] block`} disabled={updating}>{updating ? "Updating" : "Update"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default ProfileUpdateModal
