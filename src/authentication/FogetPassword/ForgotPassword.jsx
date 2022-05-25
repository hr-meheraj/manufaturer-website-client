import React from 'react'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import auth from '../../firebase/firebase.config';
import Loading from '../../components/Shared/Loading/Loading';
import {toast} from 'react-toastify'

function ForgotPassword() {
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
        auth
      );

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        await sendPasswordResetEmail(data.email);
        toast(`Reset Link has to to ${data.email}, please check it - now before it expired`)
    }
    
    return (
        <div className='max-w-[740px] w-full mx-auto mt-[40px] '>
            {
                sending && <Loading/>
            }
         <div className="card max-w-[600px] w-[95%]  md:p-[20px] p-[5%] shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="card-title">Reset You password : </h2>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" {...register("email", {
                        required: "Email is required to Reset Password",
                    })} placeholder="email" className="input input-bordered" />
                    {errors?.email && <span className='text-red-700 my-[5px]'>{errors?.email}</span> }
                      <div className="form-control mt-6">
                      <button type='submit' className="btn btn-primary">Send Reset Link</button>
                  </div>
                </div>
           </form>
          </div>
        </div>
    )
}

export default ForgotPassword
