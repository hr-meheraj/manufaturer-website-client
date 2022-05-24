import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdAddCircle } from 'react-icons/io'
import { GoCloudUpload } from 'react-icons/go'
import axios from 'axios'
import Loading from '../../Shared/Loading/Loading'
import privateAxios from '../../../api/privateAxios'
import { toast } from 'react-toastify'


function AddProducts() {
    const [imgURL, setImgURL] = useState('');
    const imgbbKey = '22c7544342348e7c8326c240bc970e19';
    const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit =async  (data) => {
        setLoading(true);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const { data : imgData } = await axios.post(url, formData);
        if(imgData.success){
            const responseObject =  {
                name : data.name,
                quantity : data.quantity,
                minQuantity : data.minQuantity,
                description: data.description,
                perPrice : data.perPrice,
                imgURL :  imgData?.data?.url
            }
            const result = await privateAxios.post(`https://manufacturer-server.hrmeheraj.repl.co/products`, responseObject);
            console.log(result);
            setLoading(false);
            if(result.status === 200){
                toast.success("Success Uploaded Product");
            }
            reset();
        }
        //     console.log('Result here ',result)
        //     if(result.insertedCount){
        //         toast.success('Product has successfully Uploaded to the Database');
        //          setLoading(false);
        //         reset();
        //     }else{
        //         toast.error("Something Went wrong in Database");
               
        //         setLoading(false);
        //         reset();
        //     }
        // }else{
        //     toast.error("Something Went Wrong - Image server");
        //     console.log(imgData);
        //     setLoading(false);
        //     reset();
        // }
    }
    // if(loading){
    //     return <Loading/>
    // }
    return (
        <div className=' md:p-4 max-w-[720px] mx-auto mt-[20px]'>
            {/* {
                loading && <Loading/>
            } */}
            <div className='flex justify-between px-4  mb-[40px]  py-2 rounded-md bg-[#112233] text-[#007fff] items-center'>
                <span className='text-xl text-primary '>
                    Add Product
                 </span>
                <span className='text-[24px]'>
                    <IoMdAddCircle />
                </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="card  w-full mx-auto max-w-[550px]  shadow-2xl bg-base-100">
                    <div class="card-body">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Product Name</span>
                            </label>
                            <input type="text" {...register("name", {
                                required: {
                                    value : true,
                                    message : 'Product name is Required'
                                }
                            })} placeholder="Enter product name" class="input input-bordered" />
                            <label className="label">
                                {errors?.name && <span className="label-text-alt text-red-500">{errors.name?.message}</span>}
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Price Per Pice</span>
                            </label>
                            <input type="number" {...register("perPrice",{
                                required: {
                                    value : true,
                                    message : 'Product name is Required'
                                },
                                min : {
                                    value : 5,
                                    message : 'Minimun Per Price should up to $5'
                                }
                            })} placeholder="Enter the each pice price" class="input input-bordered" />
                            <label className="label">
                                {errors?.perPrice && <span className="label-text-alt text-red-500">{errors.perPrice?.message}</span>}
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Quantity</span>
                            </label>
                            <input type="number" {...register("quantity",{
                                required: {
                                    value : true,
                                    message : 'Quantity is Required'
                                },
                                min : {
                                    value : 100,
                                    message : 'Minimun product should be 100+'
                                }
                            })} placeholder="Quantity" class="input input-bordered" />
                            <label className="label">
                                {errors?.quantity && <span className="label-text-alt text-red-500">{errors.quantity?.message}</span>}
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Minimun Order Quantity</span>
                            </label>
                            <input type="number" {...register("minQuantity",{
                                required: {
                                    value : true,
                                    message : 'Minimun Order Quantity is Required'
                                },
                                min : {
                                    value : 10,
                                    message : 'Minium Quanity 10 '
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
                            <textarea {...register("description", {
                                required: {
                                    value : true,
                                    message : 'Description is Required'
                                },
                                minLength : {
                                    value : 10,
                                    message : 'Minimun length 10 Character'
                                },
                                maxLength : {
                                    value : 100,
                                    message : 'Maximun Length is 100 Character'
                                }
                            })} placeholder="short text..." class="input input-bordered" />
                            <label className="label">
                                {errors?.description && <span className="label-text-alt text-red-500">{errors.description?.message}</span>}
                            </label>
                        </div>
                        <div class='form-control'>
                            <label class='label btn btn-primary flex justify-center items-center gap-[15px] w-full block' for='file-upload'>
                                 Upload <span className='text-[22px]'> <GoCloudUpload /> </span>
                            </label>
                            <input
                                type='file'
                                id="file-upload"
                                {...register('image',{
                                    required: {
                                        value : true,
                                        message : 'Image is Required'
                                    }
                                })}
                                class='input hidden input-bordered'
                            />
                              <label className="label">
                                {errors?.image && <span className="label-text-alt text-red-500">{errors.image?.message}</span>}
                            </label>
                        </div>
                        <div class="form-control mt-6">
                            <button class={`btn btn-primary ${loading && 'btn-disabled'}`} type="submit">Add Product</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddProducts
