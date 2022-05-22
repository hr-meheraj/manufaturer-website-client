import React from 'react'
import { Link , NavLink} from 'react-router-dom'
function DashboardDrawer({children}) {
    return (
        <div class="drawer drawer-mobile">
        <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            {children}
          <label for="dashboard-drawer" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        
        </div> 
        <div class="drawer-side">
          <label for="dashboard-drawer" class="drawer-overlay"></label> 
          <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          
            <li><NavLink to='orders'>My Orders</NavLink></li>
            <li><NavLink to='review'>Add a review</NavLink></li>
            <li><NavLink to='profile'>My Profile</NavLink> </li>
          </ul>
        
        </div>
      </div>
    )
}

export default DashboardDrawer
