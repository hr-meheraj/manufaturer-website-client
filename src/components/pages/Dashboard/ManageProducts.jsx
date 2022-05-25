import React, { useState } from 'react'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import privateAxios from '../../../api/privateAxios';
import Loading from '../../Shared/Loading/Loading';
import { toast } from 'react-toastify'
import { useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
function ManageProducts() {
    const [productInfo, setProductInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const getProducts = async () => {
        const response = await privateAxios.get('https://manufacturer-server.hrmeheraj.repl.co/products/');
        return response.data;

    }
    const { isLoading, data: products, refetch } = useQuery("all-products", () => getProducts());
    const handleDelete = async (id) => {
        setLoading(true);
        const response = await privateAxios.delete(`https://manufacturer-server.hrmeheraj.repl.co/products/${id}`)
        if (response.status === 200) {
            toast.success("Succesfully Product Delete");
            setLoading(false);
            setProductInfo(null);
            refetch();
        } else {
            toast.error("Something went wrong");
            setLoading(false);
            setProductInfo(null);
        }
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        setUpdating(true);
        const response = await privateAxios.put(`https://manufacturer-server.hrmeheraj.repl.co/products/${productInfo?._id}`,data);
        if(response.status === 200){
            toast.success("Product Updated Successfully");
            setUpdating(false);
            refetch();
            setProductInfo(null);
        }else{
            toast.error("Something went wrong");
            setUpdating(false);
            setProductInfo(null);
        }
    }
    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='mx-auto max-w-[840px] w-[95%] shadow-sm rounded-md p-4 mt-[20px]'>
            <div className='flex justify-between items-center mb-[40px] py-2 px-4 shadow-md'>
                <div className='text-xl'>
                    Manage Products
                </div>
                <div className='text-xl '>
                    <MdOutlineProductionQuantityLimits />
                </div>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                </label>
                            </th>
                            <th>Info</th>
                            <th> Stock </th>
                            <th>Price</th>
                            <th> </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((product, index) => {
                                const { _id, imgURL, name, minQuantity, perPrice, quantity } = product;

                                return (
                                    <tr>
                                        <th>
                                            <label>
                                                {index + 1}
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={imgURL} className='rounderBorder' alt={name} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{name}</div>
                                                    {/* <div className="text-md opacity-50">Per Price : {perPrice}</div> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            Quantity : {quantity}
                                            <br />
                                            <span className="badge badge-primary badge-md">Min Quantity :{minQuantity}</span>
                                        </td>
                                        <td>
                                            ${perPrice}
                                        </td>
                                        <th>
                                            <label for='update-product' className='btn btn-sm btn-primary' onClick={() => setProductInfo(product)}>Update</label>
                                        </th>
                                        <th>

                                            <label for='delete-product' onClick={() => setProductInfo(product)} className="btn btn-error btn-xs ">Delete</label>
                                        </th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {
                    productInfo && (
                        <>
                            <input type="checkbox" id="delete-product" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Do you want to Delete {productInfo?.name}?</h3>
                                    <p className="py-4">{productInfo?.name} will be Delete from Database! if you click Yes</p>
                                    <div className="modal-action">
                                        <button className='btn btn-primary' onClick={() => handleDelete(productInfo?._id)}>YES </button>
                                        <label for="delete-product " onClick={() => setProductInfo(null)} className="btn">Cancel</label>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                {
                    productInfo && (
                        <>
                            <div>
                                <input type="checkbox" id="update-product" class="modal-toggle" />
                                <div class="modal modal-bottom sm:modal-middle mx-auto">
                                    <div class="modal-box">
                                        <label for="update-product" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                        <div class="modal-box mx-auto">
                                            <h3 class="font-bold text-lg">Update Product</h3>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="card  w-full mx-auto max-w-[550px]  shadow-2xl bg-base-100">
                                                    <div className="card-body">
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Product Name</span>
                                                            </label>
                                                            <input type="text" defaultValue={productInfo?.name} {...register("name", {
                                                                required: {
                                                                    value: true,
                                                                    message: 'Product name is Required'
                                                                }
                                                            })} placeholder="Enter product name" className="input input-bordered" />
                                                            <label className="label">
                                                                {errors?.name && <span className="label-text-alt text-red-500">{errors.name?.message}</span>}
                                                            </label>
                                                        </div>
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Price Per Pice</span>
                                                            </label>
                                                            <input defaultValue={productInfo?.perPrice} type="number" {...register("perPrice", {
                                                                required: {
                                                                    value: true,
                                                                    message: 'Product name is Required'
                                                                },
                                                                min: {
                                                                    value: 5,
                                                                    message: 'Minimun Per Price should up to $5'
                                                                }
                                                            })} placeholder="Enter the each pice price" className="input input-bordered" />
                                                            <label className="label">
                                                                {errors?.perPrice && <span className="label-text-alt text-red-500">{errors.perPrice?.message}</span>}
                                                            </label>
                                                        </div>
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Quantity</span>
                                                            </label>
                                                            <input defaultValue={productInfo?.quantity} type="number" {...register("quantity", {
                                                                required: {
                                                                    value: true,
                                                                    message: 'Quantity is Required'
                                                                },
                                                                min: {
                                                                    value: 10,
                                                                    message: 'Minimun product should be 10+'
                                                                }
                                                            })} placeholder="Quantity" className="input input-bordered" />
                                                            <label className="label">
                                                                {errors?.quantity && <span className="label-text-alt text-red-500">{errors.quantity?.message}</span>}
                                                            </label>
                                                        </div>
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Minimun Order Quantity</span>
                                                            </label>
                                                            <input type="number" defaultValue={productInfo?.minQuantity} {...register("minQuantity", {
                                                                required: {
                                                                    value: true,
                                                                    message: 'Minimun Order Quantity is Required'
                                                                },
                                                                min: {
                                                                    value: 1,
                                                                    message: 'Minium Quanity 1 '
                                                                }
                                                            })} placeholder="Minimun order Quantity" className="input input-bordered" />
                                                            <label className="label">
                                                                {errors?.minQuantity && <span className="label-text-alt text-red-500">{errors.minQuantity?.message}</span>}
                                                            </label>
                                                        </div>
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Short Description</span>
                                                            </label>
                                                            <textarea defaultValue={productInfo?.description} {...register("description", {
                                                                required: {
                                                                    value: true,
                                                                    message: 'Description is Required'
                                                                },
                                                                minLength: {
                                                                    value: 10,
                                                                    message: 'Minimun length 10 Character'
                                                                },
                                                                maxLength: {
                                                                    value: 100,
                                                                    message: 'Maximun Length is 100 Character'
                                                                }
                                                            })} placeholder="short text..." className="input input-bordered" />
                                                            <label className="label">
                                                                {errors?.description && <span className="label-text-alt text-red-500">{errors.description?.message}</span>}
                                                            </label>
                                                        </div>
                                                        <div className="form-control mt-6">
                                                            <button className={`btn btn-primary ${updating && 'btn-disabled'}`} type="submit">{updating ? "Updating" : "Update Product"}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>

        </div>
    )
}

export default ManageProducts
