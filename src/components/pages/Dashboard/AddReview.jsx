import React,{useState} from 'react'
import { MdReviews } from 'react-icons/md'
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai'
import { useQuery} from 'react-query'
import auth from '../../../firebase/firebase.config.js'
import Loading from '../../Shared/Loading/Loading'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'


function AddReview() {
    const [user , authLoading] = useAuthState(auth);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const getReview = async () => {
        const { data } = await axios.get(`https://manufacturer-server.hrmeheraj.repl.co/reviews/${user?.email}`);
        return data;
    }
    const { data : review, refetch, isLoading } = useQuery(['review', user], () => getReview() ); 


    const onSubmit = async ( data) => {
        setLoading(true);
        const reviewInfo = {
            email : data.email,
            name : data.name,
            ratings : data.ratings,
            review : data.review
        };
        if(review){
            console.log("reviewInfo",reviewInfo);
            await axios.put(`https://manufacturer-server.hrmeheraj.repl.co/reviews/${data.email}`, reviewInfo);
            toast.success("Review Updated");
            refetch();
            reset();
            setLoading(false);
        }else{

            console.log("reviewInfo",reviewInfo);
            const response = await axios.post(`https://manufacturer-server.hrmeheraj.repl.co/reviews/`, reviewInfo);
            console.log(response);
            if(response){
                toast.success("Review Added");
                refetch();
                setLoading(false);
                reset();
            }

        }
    }
    return (
        <div className='mt-[20px] max-w-[720px] mx-auto w-[95%] rounded-md shadow-md pb-[50px]'>
            {
                (isLoading || authLoading) && <Loading/>
            }
            <div className='flex justify-between items-center mb-[40px] py-2 px-4 shadow-md'>
                <div className='text-xl'>
                    Review
                </div>
                <div className='text-xl '>
                    <MdReviews/>
                 </div>
             </div>
             <div className=' w-full flex justify-center items-center '>
               <label className='btn btn-primary' onClick={() => setIsOpen(!isOpen)}> {isOpen ? "Hide Form" : "Show Form"} </label>
                 
             </div>
             <div className=' w-full flex justify-center items-center '>
                {review && (
                    <div className='p-4 rounded-md shadow-md mt-[20px]'>
                        <div className='my-[10px] flex justify-center items-center'>
                            <img src={review.imgURL || 'https://cdn.lorem.space/images/face/.cache/500x0/stefan-stefancik-QXevDflbl8A-unsplash.jpg'} className='w-[140px] h-[140px] avatar rounded-full' alt={review.name} />
                         </div>
                         <div className=''>
                            <h2 className='text-2xl mb-4 text-center'> {review.name}</h2> 
                            <p className='px-3'>{review.review} </p>
                            <div className='my-4 text-xl flex gap-[8px] text-yellow-800 justify-center'>
                                { 
                                [...Array(parseInt(review?.ratings)).keys()].map( (rating, index) => {
                                    return <span key={index}> <AiFillStar/></span> 
                                })
                                }
                             </div>
                        </div>
                    </div>
                )}
               
             </div>
              {
                    (isOpen) && (
                        <form className='mt-[15px] p-[20px]' onSubmit={handleSubmit(onSubmit)}>
                         <div class="form-control">
                            <label class="label">
                                <span class="label-text"> Name</span>
                            </label>
                            <input defaultValue={user?.displayName} type="text" {...register("name", {
                                required: {
                                    value : true,
                                    message : ' name is Required'
                                }
                            })} placeholder="Enter Name" class="input input-bordered" />
                            <label className="label">
                                {errors?.name && <span className="label-text-alt text-red-500">{errors.name?.message}</span>}
                            </label>

                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text"> Email</span>
                            </label>
                            <input defaultValue={user?.email} type="text" {...register("email", {
                                required: {
                                    value : true,
                                    message : 'Email name is Required'
                                }
                            })}  class="input input-bordered" />
                            <label className="label">
                                {errors?.email && <span className="label-text-alt text-red-500">{errors.email?.message}</span>}
                            </label>
                        </div>
                            <div class="form-control">
                            <label class="label">
                                <span class="label-text">Ratings</span>
                            </label>
                            <input type="number" {...register("ratings",{
                                required: {
                                    value : true,
                                    message : 'Ratings is Required'
                                },
                                min : {
                                    value : 1,
                                    message : 'Minium 1 '
                                },
                                max : {
                                    value : 5,
                                    message : 'Maximum 5'
                                }
                            })} placeholder="Minimun order Quantity" class="input input-bordered" />
                            <label className="label">
                                {errors?.minQuantity && <span className="label-text-alt text-red-500">{errors.minQuantity?.message}</span>}
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Short Description</span>
                            </label>
                            <textarea {...register("review", {
                                required: {
                                    value : true,
                                    message : 'Description is Required'
                                },
                                minLength : {
                                    value : 20,
                                    message : 'Minimun length 20 Character'
                                },
                                maxLength : {
                                    value : 150,
                                    message : 'Maximun Length is 150 Character'
                                }
                            })} placeholder="short Review..." class="input input-bordered" />
                            <label className="label">
                                {errors?.review && <span className="label-text-alt text-red-500">{errors.review?.message}</span>}
                            </label>
                        </div>
                        <div class="form-control mt-6">
                             <button class={`btn btn-primary`} type="submit">{review?.ratings ? "Update" : "Add Review"}</button> 
                        </div>
                        </form>
                    )
                }
        </div>
    )
}

export default AddReview
