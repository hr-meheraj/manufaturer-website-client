import React, {useState} from 'react'
import { useQuery } from 'react-query'
import privateAxios from '../../../api/privateAxios.js'
import Loading from '../../Shared/Loading/Loading.jsx';
import { toast } from 'react-toastify'
import axios from 'axios'

const  ManageUsers = () =>  {

    const [adminInfo, setAdminInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        const { data } = await privateAxios(`https://manufacturer-server.hrmeheraj.repl.co/users`);
        return data;
    }
    const { data: users, isLoading, refetch } = useQuery("all-users", () => getData());
    if(isLoading){
        return <Loading/> 
    }
    const handleAdmin = async (email) => {
        setLoading(true);
        await privateAxios.put(`https://manufacturer-server.hrmeheraj.repl.co/users/admin/${email}`)
        setLoading(false);
        toast.success("Success to Create an Admin");
        setAdminInfo(null);
        refetch();
    }
    const handleDelete = async ( email) => {
        setLoading(true);
        await privateAxios.delete(`https://manufacturer-server.hrmeheraj.repl.co/users/${email}`);
        setLoading(false);
        toast.success("Successfully Deleted");
        setAdminInfo(null);
        refetch();
    }
    return (
        <div className='mx-auto max-w-[840px] w-[95%] shadow-sm rounded-md p-4 mt-[20px]'>
            {
                loading && <Loading/>
            }
            <h2 className='text-2xl font-semibold text-primary'>WELCOME TO DASHBOARD! </h2>
            <p className='text-xl font-semibold my-4'>Manage Users </p>
            <div>
                <div class="overflow-x-auto w-full">
                    <table class="table w-full">

                        <thead>
                            <tr>
                                <th>
                                    <label>

                                    </label>
                                </th>
                                <th>Name</th>
                                <th>Info</th>
                                <th>Role</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                users?.map((user, index) => {
                                    return (
                                        <tr>
                                            <th>
                                                <label>
                                                    {index + 1}
                                                </label>
                                            </th>
                                            <td>
                                                <div class="flex items-center space-x-3">
                                                    <div class="avatar">
                                                        <div class="mask mask-squircle w-12 h-12">
                                                            <img src={user?.imgURL || 'https://www.svgrepo.com/show/5125/avatar.svg'} alt={user?.name} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="font-bold">{user?.name}</div>
                                                        <div class="text-sm opacity-50">{user?.country || 'Not updated'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {user?.email}
                                                <br />
                                                <span class="badge badge-ghost badge-sm">{user?.city || 'Not Updated'}</span>
                                            </td>
                                            <td>{user?.role ? <button class="btn btn-sm btn-disabled" tabindex="-1" role="button" aria-disabled="true"> Admin</button> : <label for="admin-modal" onClick={() => setAdminInfo(user)} class="btn btn-sm modal-button">Make as Admin</label>}</td>
                                            <th>
                                                <label for='delete-user' onClick={() => setAdminInfo(user)} class="btn modal-button btn-error btn-sm">Delete</label>
                                            </th>
                                        </tr>
                                    )
                                })
                            }



                        </tbody>

                    </table>
                </div>
            </div>
            {
                adminInfo && (
                    <> 
                    <input type="checkbox" id="admin-modal" class="modal-toggle" />
                    <div class="modal">
                        <div class="modal-box">
                            <h3 class="font-bold text-lg">Do you want to  the user Admin?</h3>
                            <p class="py-4">{adminInfo?.email} will be admin! if you click Yes</p>
                            <div class="modal-action">
                            <button className='btn btn-primary' onClick={() => handleAdmin(adminInfo?.email)}>YES </button>
                                <label for="admin-modal" class="btn">Cancel</label>
                            </div>
                        </div>
                    </div>
                    </>
                )
            }

            {
                adminInfo && (
                    <> 
                    <input type="checkbox" id="delete-user" class="modal-toggle" />
                    <div class="modal">
                        <div class="modal-box">
                            <h3 class="font-bold text-lg">Do you want Delete the user?</h3>
                            <p class="py-4">{adminInfo?.email} will be Delete from Database! if you click Yes</p>
                            <div class="modal-action">
                            <button className='btn btn-primary' onClick={() => handleDelete(adminInfo?.email)}>YES </button>
                             <label for="delete-user" class="btn">Cancel</label>
                            </div>
                        </div>
                    </div>
                    </>
                )
            }
        </div>
    )
};

export default ManageUsers









