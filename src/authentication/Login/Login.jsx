import React,{useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import auth from '../../firebase/firebase.config';
import Loading from '../../components/Shared/Loading/Loading';

function Login() {
     const [signInWithGoogle, gUser , loading, err] = useSignInWithGoogle(auth);
     const [ prevUser, prevUserLoading] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation();
    
    let from = location.state?.from?.pathname || "/";
    useEffect(() =>{
         if(gUser || prevUser){
            navigate(from, { replace: true });
         }
    }, [gUser, prevUser, navigate, from])



    if(loading || prevUserLoading){
        return <Loading/>
    }
    const handleSignInWithGoogle = () => {
        signInWithGoogle()
    }
    return (
      <div>
          <button className='btn btn-primary' onClick={handleSignInWithGoogle}>Continue with Google</button>
      </div>
    );
}

export default Login
