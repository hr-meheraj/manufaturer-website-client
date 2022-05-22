import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardDrawer from './DashboardDrawer'

function Dashboard() {
    return (
      <DashboardDrawer>
          <Outlet/>
      </DashboardDrawer>
    )
}

export default Dashboard
