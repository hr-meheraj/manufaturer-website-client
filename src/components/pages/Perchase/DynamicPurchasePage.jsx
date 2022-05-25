import React,{useState} from 'react'
import { useParams,useNavigate} from 'react-router-dom'
import { useQuery } from 'react-query'
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../Shared/Loading/Loading';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import auth from '../../../firebase/firebase.config';
import { toast } from 'react-toastify'
import PurchaseCard from './PurchaseCard';
import privateAxios from '../../../api/privateAxios';
function DynamicPurchasePage() {
    const [purchasing, setPurchasing]= useState(false);
    const [ user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const { id } = useParams();
    const getProduct = async () => {
        const res = await axios.get(`https://manufacturer-server.hrmeheraj.repl.co/products/${id}`);
        return res.data;
    }
    const { data : product, isLoading, refetch} = useQuery('productDynamic', () => getProduct());
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    
    const onSubmit =async (data) => {
        setPurchasing(true);
        const postBody = {
            name : data.name,
            email : data.email,
            address : data.address,
            productName : product.name,
            perPrice : product.perPrice,
            quantity : data.quantity,
            productId : product._id,
            imgURL : product.imgURL
        };
        const resPost = await privateAxios.post(`https://manufacturer-server.hrmeheraj.repl.co/perchase`, postBody);
        setPurchasing(false);
        if(resPost.status === 200){
            toast.success("Success Purchead, Please Check you Dashboard Orders");
            navigate('/purchase');
        }
    }
    if (loading || isLoading){
        return  <Loading/>
    }  

    return (
        <div className='max-w-[920px] mx-auto w-[95%] mt-[40px] mb-[100px]'>
           
            <div className='grid grid-cols-1 md:grid-cols-2 gap-[20px] lg:gap-[40px]' >
                <PurchaseCard product={product}/>
                <form onSubmit={handleSubmit(onSubmit)} "card w-full  shadow-2xl bg-base-100">
                    <div "card-body">
                    <div "form-control">
                         <label "label">
                                <span "label-text"> Name</span>
                            </label>
                            <input defaultValue={user?.displayName} type="text" {...register("name", {
                                required: {
                                    value : true,
                                    message : ' Name is Required'
                                }
                            })} placeholder="Enter Name" "input input-bordered" />
                            <label className="label">
                                {errors?.name && <span className="label-text-alt text-red-500">{errors.name?.message}</span>}
                            </label>

                        </div>
                        <div "form-control">
                            <label "label">
                                <span "label-text"> Email</span>
                            </label>
                            <input defaultValue={user?.email} type="text" {...register("email", {
                                required: {
                                    value : true,
                                    message : ' Email is Required'
                                }
                            })} placeholder="Enter Email Address" "input input-bordered" />
                            <label className="label">
                                {errors?.email && <span className="label-text-alt text-red-500">{errors.email?.message}</span>}
                            </label>

                        </div>
                        <div "form-control w-full block mt-[5px]">
                                <label "label">
                                    <span "label-text-alt">Present Address: </span>
                                </label>
                                <textarea "textarea w-full block textarea-success" {...register("address",{
                                    required : {
                                        value : true,
                                        message : 'Address is Required to Reach out your products'
                                    }
                                })} placeholder="Present Address..."></textarea>
                                  <label className="label">
                                {errors?.address && <span className="label-text-alt text-red-500">{errors.address?.message}</span>}
                            </label>
                       </div>
                       <div "form-control">
                            <label "label">
                                <span "label-text">Quantity</span>
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
                            })} placeholder="Quantity" "input input-bordered" />
                            <label className="label">
                                {errors?.quantity && <span className="label-text-alt text-red-500">{errors.quantity?.message}</span>}
                            </label>
                        </div>
                        <div "form-control mt-6">
                        <button {`btn btn-primary ${purchasing && 'btn-disabled'}`} type='submit'>Purchase</button>
                     </div>
                 </div>
            </form>
        </div>
    </div>
    )
}

export default DynamicPurchasePage
