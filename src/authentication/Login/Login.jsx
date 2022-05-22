import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = true;
  
    let from = location.state?.from?.pathname || "/";
    if(user){
        navigate(from, { replace: true });
    }
  
    return (
      <div>
          login form
      </div>
    );
}

export default Login
