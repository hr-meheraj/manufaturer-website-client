import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import auth from '../../../firebase/firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth'
import useAdmin from '../../../hooks/useAdmin';
import Loading from '../../Shared/Loading/Loading';
function DashboardDrawer({ children }) {
    const [user, userLoading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);
    return (
        <div className="drawer drawer-mobile">
            {
                (adminLoading || userLoading) && <Loading />
            }
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {children}

            </div>
            <div className="drawer-side">
                <label for="dashboard-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-[250px] bg-[#f4f6f9]  mt-[2px] text-base-content">

                   {
                       !admin && (
                           <>
                            <li><NavLink to='orders'>My Orders</NavLink></li>
                             <li><NavLink to='review'>Add a review</NavLink></li>
                           </>
                       )
                   }
                    <li><NavLink to='profile'>My Profile</NavLink> </li>
                    {
                        admin && (
                            <>

                                <li><NavLink to='manage-users'>Manage Users</NavLink> </li>
                                <li><NavLink to='add-product'>Add Product</NavLink> </li>
                                <li><NavLink to='manage-products'>Manage Product</NavLink> </li>
                            </>
                        )
                    }
                </ul>

            </div>
        </div>
    )
}

export default DashboardDrawer
