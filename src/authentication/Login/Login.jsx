import React, { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuthState, useSignInWithGoogle, useSignInWithEmailAndPassword  } from 'react-firebase-hooks/auth'
import auth from '../../firebase/firebase.config';
import Loading from '../../components/Shared/Loading/Loading';
import { FcGoogle } from 'react-icons/fc'
import {toast } from 'react-toastify'
import { useForm } from "react-hook-form";
import useToken from '../../hooks/useToken';

function Login() {
    const [signInWithGoogle, gUser, gLoading , gError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const [prevUser, prevUserLoading, prevError] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    const [token] = useToken(gUser || prevUser || user);

     if (token) {
            navigate(from, { replace: true });
     }

    useEffect(() => {
        const occureErr = error || gError || prevError;
        if(occureErr){
            switch(occureErr?.code){
                case "auth/user-not-found" : 
                    toast.error("User is not Found, Please create new account");
                    break;
                case "auth/wrong-password":
                    toast.error("Password is not Match");
                    break;
                case "auth/invalid-password" :
                    toast.error("Password is not valid");
                    break;
                case "auth/invalid-email" : 
                    toast.error("Email is not valid");
                    break;
                default : 
                    toast.error("Something went wrong", occureErr?.code);
            }
        }
    },[error, gError, prevError])

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => { 
       await signInWithEmailAndPassword(data.email, data.password);
       if(user?.uid){
         toast.success("Successfully Logged User");
       }
    }
    // if (loading || prevUserLoading || gLoading) {
    //     return <Loading />
    // }
    // if(err || error){
    //     return <h2 className='text-center  text-2xl text-red-800 mt-[40px] '>{err?.message || error?.message} </h2>
    // }

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
    }

    return (
        <div className='max-w-[740px] w-full mx-auto mt-[40px] '>
            {
                (loading || prevUserLoading || gLoading) && <Loading/> 
            }
            <div className="card max-w-[600px] w-[95%]  md:p-[20px] p-[5%] shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="card-title">Login</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" {...register("email", {
                            required: true, pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Your email is not valid'
                            }
                        })} placeholder="email" className="input input-bordered" />
                        {errors?.email && <span className='text-red-700 my-[5px]'>{errors?.email?.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: 'Password is Required', minLength: {
                                value: 6,
                                message: "Min length is 6"
                            }
                        })} placeholder="password" className="input input-bordered" />
                        <span className='text-red-700 my-[5px]'>{errors?.password?.message}</span>
                        <label className="label">
                            <Link to='/reset-password' className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>
                    </div>
                    <p className='font-semibold text-[17px]'> Doesn't have any Account? <Link className='text-blue-700 cursor-pointer hover:text-blue-900 transition-all' to='/register'> Create New</Link> </p>
                    <div className="form-control mt-6">
                        <button type='submit' className="btn btn-primary">Login</button>
                    </div>
                </form>
                <div className="divider my-[20px]">OR</div>
                <button className='btn gap-4' onClick={handleSignInWithGoogle}>Continue with Google <span className='text-xl'><FcGoogle /></span></button>
            </div>
        </div>
    );
}

export default Login
