import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation, Navigate } from 'react-router-dom'
import Loading from '../../components/Shared/Loading/Loading';
import auth from '../../firebase/firebase.config';
function RequireAuth({children}) {
    const [ user, loading] = useAuthState(auth)
    const location = useLocation();
    if(loading){
        return <Loading/>
    }
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
}

export default RequireAuth
