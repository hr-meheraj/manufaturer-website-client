import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, NavLink } from 'react-router-dom'
import auth from '../../firebase/firebase.config'
import Loading from '../Shared/Loading/Loading';
import { FaSignOutAlt } from "react-icons/fa";
import { AiOutlineDoubleLeft} from 'react-icons/ai'
import { signOut } from 'firebase/auth';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Navbar({ children }) {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <Loading />
    }
    return (
        <div class="drawer  drawer-end">
            <input id="nav-menu-drawer" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col">
                <div class="w-full navbar shadow-md">
                <label for="dashboard-drawer" class="btn drawer-button lg:hidden"><AiOutlineDoubleLeft/></label>
                    <div class="flex-1 px-2 mx-2"><Link to='/' className='text-xl font-semibold text-purple-900 cursor-pointer'>Shop Tools</Link></div>
                    <div class="flex-none hidden lg:block">
                        <ul class="menu menu-horizontal gap-[15px]">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/purchase">Purchase</NavLink></li>
                            <li><NavLink to="/blogs">Blogs</NavLink></li>
                            <li><NavLink to="/about-me">My Portfolio</NavLink></li>
                            <li><NavLink to="/reviews">Reviews</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            {
                                user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                            }
                            {
                                user ? <li><button class="btn gap-2 text-white" onClick={() => {
                                    localStorage.removeItem("accessToken");
                                    signOut(auth);
                                }}>
                                     Sign Out
                                    <FaSignOutAlt />
                                </button></li> : <li><NavLink to="/login">Login</NavLink></li>
                            }
                        </ul>
                    </div>
                    <div class="flex-none lg:hidden">
                        <label for="nav-menu-drawer" class="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                </div>
                {children}
            </div>
            <div class="drawer-side">
                <label for="nav-menu-drawer" class="drawer-overlay"></label>
                <ul class="menu p-4 gap-[15px] overflow-y-auto w-[250px] bg-[#f4f6f9]">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/purchase">Purchase</NavLink></li>
                    <li><NavLink to="/blogs">Blogs</NavLink></li>
                    <li><NavLink to="/reviews">Reviews</NavLink></li>
                    <li><NavLink to="/about-me">My Portfolio</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
    
                    {
                        user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    }
                    {
                        user ? <li><button class="btn gap-2 text-white" onClick={() =>{
                            localStorage.removeItem("accessToken");
                            signOut(auth);
                        }}>
                            Sign Out
                        <FaSignOutAlt />
                        </button></li> : <li><NavLink to="/login">Login</NavLink></li>
                    }
                </ul>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Navbar
