import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../components/Shared/Loading/Loading';
import useAdmin from '../../hooks/useAdmin';
import { signOut} from 'firebase/auth'
import auth from '../../firebase/firebase.config';
const RequireAdmin = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);
    const location = useLocation();

    if(loading || adminLoading){
        return <Loading></Loading>
    }else if(!user || !admin){
        localStorage.removeItem("accessToken");
        console.log("inside require admin", admin, user);
        signOut(auth);
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
    
    return children;
};

export default RequireAdmin;