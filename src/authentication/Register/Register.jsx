import React, { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuthState, useSignInWithGoogle, useCreateUserWithEmailAndPassword ,useUpdateProfile  } from 'react-firebase-hooks/auth'
import auth from '../../firebase/firebase.config';
import Loading from '../../components/Shared/Loading/Loading';
import { FcGoogle } from 'react-icons/fc'
import {toast } from 'react-toastify'
import { useForm } from "react-hook-form";
import useToken from '../../hooks/useToken';
function Register() {
    const [signInWithGoogle, gUser, gLoading , gError] = useSignInWithGoogle(auth);
      const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    const [token]  = useToken(gUser || user);
        if(token){
            navigate(from, { replace: true });
        }

    useEffect(() => {
        const occureErr = error || gError ;
        if(occureErr){
            switch(occureErr?.code){     
                case "auth/email-already-exists" : 
                    toast.error("Email alreay exits, please login");
                    break;
                default : 
                    toast.error(`Something went wrong ${occureErr?.code}`);
            }
        }
    },[error, gError])

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => { 
       await createUserWithEmailAndPassword(data.email, data.password);
       await updateProfile({ displayName : data.name})
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
            (loading || updating || gLoading) && <Loading/> 
        }
        <div class="card max-w-[600px] w-[95%]  md:p-[20px] p-[5%] shadow-2xl bg-base-100">
            <form class="card-body" onSubmit={handleSubmit(onSubmit)}>
                <h2 class="card-title">Register as New User : </h2>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Full Name</span>
                    </label>
                    <input type="text" {...register("name", {
                        required: "Name is required",
                        minLength : {
                            value : 6,
                            message : "Minimun length is 6"
                        },
                        maxLength : {
                            value : 19,
                            message : "Maximun Length is 19"
                        }
                    })} placeholder="email" class="input input-bordered" />
                    {errors?.name && <span className='text-red-700 my-[5px]'>{errors?.name?.message}</span>}
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input type="text" {...register("email", {
                        required: true, pattern: {
                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                            message: 'Your email is not valid'
                        }
                    })} placeholder="email" class="input input-bordered" />
                    {errors?.email && <span className='text-red-700 my-[5px]'>{errors?.email?.message}</span>}
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Password</span>
                    </label>
                    <input type="password" {...register("password", {
                        required: 'Password is Required', minLength: {
                            value: 6,
                            message: "Min length is 6"
                        }
                    })} placeholder="password" class="input input-bordered" />
                    <span className='text-red-700 my-[5px]'>{errors?.password?.message}</span>
                    <label class="label">
                        <Link to='/reset-password' class="label-text-alt link link-hover">Forgot password?</Link>
                    </label>
                </div>
                <p className='font-semibold text-[17px]'> Have any Account? <Link className='text-blue-700 cursor-pointer hover:text-blue-900 transition-all' to='/login'> Login</Link> </p>
                <div class="form-control mt-6">
                    <button type='submit' class="btn btn-primary">Create Account</button>
                </div>
            </form>
            <div class="divider my-[20px]">OR</div>
            <button className='btn gap-4' onClick={handleSignInWithGoogle}>Continue with Google <span className='text-xl'><FcGoogle /></span></button>
        </div>
    </div>
    )
}

export default Register
