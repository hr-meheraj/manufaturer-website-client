import React from 'react'
import { useParams} from 'react-router-dom'
import { useQuery } from 'react-query'
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../Shared/Loading/Loading';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import auth from '../../../firebase/firebase.config';
import PurchaseCard from './PurchaseCard';
function DynamicPurchasePage() {
    const [ user, loading] = useAuthState(auth);
    const { id } = useParams();
    const getProduct = async () => {
        const {data} = await axios.get(`https://manufacturer-server.hrmeheraj.repl.co/products/${id}`);
        console.log(data);
        return data;
    }
    const { data : product, isLoading, refetch} = useQuery('productDynamic', () => getProduct());
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit =async  data => {
        console.log(data);
    }
    if(product){
        console.log('inside product', product);
    }
    if (loading || isLoading){
        return  <Loading/>
    }  

    return (
        <div className='max-w-[920px] mx-auto w-[95%] mt-[40px] mb-[100px]'>
           
            <div className='grid grid-cols-1 md:grid-cols-2 gap-[20px] lg:gap-[40px]' >
                <PurchaseCard product={product}/>
                <form onSubmit={handleSubmit(onSubmit)} class="card w-full  shadow-2xl bg-base-100">
                    <div class="card-body">
                    <div class="form-control">
                         <label class="label">
                                <span class="label-text"> Name</span>
                            </label>
                            <input defaultValue={user?.displayName} type="text" {...register("name", {
                                required: {
                                    value : true,
                                    message : ' Name is Required'
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
                                    message : ' Email is Required'
                                }
                            })} placeholder="Enter Email Address" class="input input-bordered" />
                            <label className="label">
                                {errors?.email && <span className="label-text-alt text-red-500">{errors.email?.message}</span>}
                            </label>

                        </div>
                        <div class="form-control w-full block mt-[5px]">
                                <label class="label">
                                    <span class="label-text-alt">Present Address: </span>
                                </label>
                                <textarea class="textarea w-full block textarea-success" {...register("address")} placeholder="Present Address..."></textarea>
                       </div>
                       <div class="form-control">
                            <label class="label">
                                <span class="label-text">Quantity</span>
                            </label>
                            <input type="number" defaultValue={product?.minQuantity} {...register("quantity",{
                                required: {
                                    value : true,
                                    message : 'Quantity is Required'
                                },
                                min : {
                                    value : product?.minQuantity,
                                    message : `Minimun product should be ${product?.minQuantity}+}`
                                },
                                max : {
                                    value : product.quantity,
                                    message : `Maximun product quantity should be ${product?.quantity}`
                                }
                            })} placeholder="Quantity" class="input input-bordered" />
                            <label className="label">
                                {errors?.quantity && <span className="label-text-alt text-red-500">{errors.quantity?.message}</span>}
                            </label>
                        </div>
                        <div class="form-control mt-6">
                        <button class="btn btn-primary" type='submit'>Purchase</button>
                     </div>
                 </div>
            </form>
        </div>
    </div>
    )
}

export default DynamicPurchasePage
