import React, { useState } from 'react'
import { AiTwotoneShop } from 'react-icons/ai'
import privateAxios from '../../../api/privateAxios';
import Loading from '../../Shared/Loading/Loading';
import { toast } from 'react-toastify'
import { useQuery } from 'react-query'
function ManageOrders() {
    const [loading, setLoading] = useState(false);
    const [orderInfo, setOrderInfo] = useState(null);
    const getOrders = async () => {
        const res = await privateAxios.get('https://manufacturer-server.hrmeheraj.repl.co/purchase');
        console.log(res);
        return res.data;
    }
    const { data : orders , refetch, isLoading} = useQuery("orders-admin", () => getOrders());
     const handleDelete = async (id) => {
        setLoading(true);
        const response = await privateAxios.delete(`https://manufacturer-server.hrmeheraj.repl.co/purchase/${id}`);
        const reqBody = { quantity : orderInfo?.quantity };
        console.log(orderInfo);
        console.log(response);
        console.log(reqBody);
        if (response.status === 200) {
            const responseUpdateQuantity = await privateAxios.put(`https://manufacturer-server.hrmeheraj.repl.co/products/quantity/${orderInfo?.productId}`,reqBody);
            console.log('inde quantitity', responseUpdateQuantity);
            if(responseUpdateQuantity.status === 200){
                 toast.success("Succesfully Order Delete");
            }else{
                toast.error("Error from the Updated Quantity");
            }
            setLoading(false);
            refetch();
            setOrderInfo(null);
        } else {
            toast.error("Something went wrong");
            
            setLoading(false);
            setOrderInfo(null);
        }
        setLoading(false);
    }
    if(isLoading){
        return <Loading/>
    }
    return (
        <div className='mx-auto max-w-[840px] w-[95%] shadow-sm rounded-md p-4 mt-[20px]'>
        <div className='flex justify-between items-center mb-[40px] py-2 px-4 shadow-md'>
            <div className='text-xl'>
                Manage Orders
            </div>
            <div className='text-xl '>
                <AiTwotoneShop />
            </div>
        </div>
        <div class="overflow-x-auto w-full">
                    <table class="table w-full">
                        <thead>
                        <tr>
                            <th>
                            <label>
                            
                            </label>
                            </th>
                            <th>Order</th>
                            <th>Address</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                        </thead>
                         <tbody>
                        {
                            orders?.map((order,index) => {
                                return(
                                    <tr key={order?._id}>
                                    <th>
                                    <label>
                                        { index + 1}
                                    </label>
                                    </th>
                                    <td>
                                    <div class="flex items-center space-x-3">
                                        <div class="avatar">
                                        <div class="mask mask-squircle w-12 h-12">
                                            <img src={order?.imgURL} alt={order?.productName} />
                                        </div>
                                        </div>
                                        <div>
                                        <div class="font-bold">{order?.productName}</div>
                                        <div class="text-sm opacity-50">Quantity : {order?.quantity}</div>
                                        </div>
                                    </div>
                                    </td>
                                    <td>
                                    {order?.address}
                                    <br/>
                                    <span class="badge badge-ghost badge-sm">{order?.email}</span> <br/>
                                    transactionId
                                    {order?.transactionId && <span class="badge badge-success badge-sm">Piad</span>}
                                    </td>
                                    <td>
                                    <span class="badge badge-lg ">Per Price ${order?.perPrice}</span>
                                    <br/>
                                    <span class="font-bold">Total Price:{order?.perPrice * order?.quantity}</span>
                                    </td>
                                    <th>
                                    <label for='delete-orders-admin' onClick={() => setOrderInfo(order)} disabled={order?.transactionId} className="btn btn-error btn-xs ">Delete</label>
                                    </th>
                                </tr>
                                )
                            })
                           }
                           </tbody>
                       </table>
                  </div>
               {
                orderInfo && (
                        <>
                            <input type="checkbox" id="delete-orders-admin" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Do you want to Cancel {orderInfo?.productName}?</h3>
                                    <p className="py-4">{orderInfo?.productName} will be Delete from Database! if you click Yes</p>
                                    <div className="modal-action">
                                        <button className={`btn ${loading && "loading"} btn-primary`}  onClick={() => handleDelete(orderInfo?._id)}>YES </button>
                                        <label for="delete-orders-admin " onClick={() => setOrderInfo(null)} className="btn">Cancel</label>
                                    </div>
                                </div>
                            </div>
                        </>
                      )
                }
    </div>          
 )
}

export default ManageOrders
