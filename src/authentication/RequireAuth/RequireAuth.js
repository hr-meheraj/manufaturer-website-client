import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
function RequireAuth({children}) {
    let auth = true;
    let location = useLocation();
  
    if (!auth) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
}

export default RequireAuth
