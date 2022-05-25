import React, {useState} from 'react'
import { BsCartFill } from 'react-icons/bs'
import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.config';
import { Link } from 'react-router-dom'
import privateAxios from '../../../api/privateAxios';
import Loading from '../../Shared/Loading/Loading';
import { toast } from 'react-toastify'
function Orders() {
    const [orderDelete, setOrderDelete] = useState(null);
    const [ loading, setLoading] = useState(false);
    const [user, authLoading] = useAuthState(auth);
    const getOrders = async() => {
        const { data } =await privateAxios.get(`https://manufacturer-server.hrmeheraj.repl.co/purchase/${user?.email}`);
        return data;
    }
    const { data : orders, isLoading, refetch} = useQuery("orders", () => getOrders() );
    const handleSetOrderInfo = (order) => {
        console.log("Order info is : ", order);
        setOrderDelete(order)
    }
    const handleDelete = async(id) => {
        console.log("clicked button", id);
        setLoading(true);
        const response = await privateAxios.delete(`https://manufacturer-server.hrmeheraj.repl.co/purchase/${id}`);
        console.log("inside response ", response);
        if(response.status === 200){
            setLoading(false);
            setOrderDelete(null);
            toast.success("Order Canceled Successfully");
            refetch();
        }else{
            setLoading(false);
            toast.error("Order Deleted Successfully");
        }
    }
    if(loading || isLoading || authLoading){
        return <Loading/>
    }
    return (
        <div className='max-w-[820px] mx-auto w-[95%] p-4 mt-[20px]'>
            <div className='flex justify-around items-center py-2 shadow-md mb-[30px]'>
                <h2 className='text-xl font-semibold text-primary'> My Orders </h2>
                <label for="" className='btn btn-active btn-link gap-2 text-xl'>  <BsCartFill /> </label>
            </div>
            <div class="overflow-x-auto w-full">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Info</th>
                            <th> Quantity </th>
                            <th>Price</th>
                            <th>Status</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map( (order, index) => {
                                const { _id, imgURL, productName, name, email,perPrice, quantity } = order;
                                return(
                                     <tr>
                            <th>
                             <label>
                                 {index + 1}
                             </label>
                           </th>
                           <td>
                             <div class="flex items-center space-x-3">
                                 <div class="avatar">
                                     <div class="mask mask-squircle w-12 h-12">
                                         <img src={imgURL} className='rounderBorder' alt={productName} />
                                     </div>
                                 </div>
                                 <div>
                                     <div class="font-bold">{productName}</div>
                                     <div class="text-md opacity-50">Per Price : {perPrice}</div>
                                 </div>
                             </div>
                            </td>
                            <td>
                            {email}
                            <br/>
                               {order?.paid &&   <span class="badge badge-primary badge-sm">{order?.transactionId}</span>}
                               {!order?.paid &&   <span class="badge badge-primary badge-sm">Not Paid yet</span>}
                            </td>
                             <td> {quantity}</td>
                            <td>${parseInt(quantity) * parseInt(perPrice)}</td>
                          <th>
                                {!order?.paid &&  <Link to={`payment/${_id}`} class="btn btn-primary btn-xs" >Pay</Link>}
                                {order?.paid && <button className='btn btn-xs btn-disabled'>Paid</button>}
                           </th>
                           <th>  {!order?.paid &&  <label for='delete-order' onClick={() => handleSetOrderInfo(order)} class={`btn btn-danger btn-xs ${loading && "btn-disabled"}`}>Cancel</label>}</th>
                         </tr>
                                )
                            })
                        }
                   </tbody>
                        {
                            orderDelete && (
                                <> 
                                <input type="checkbox" id="delete-order" class="modal-toggle" />
                                <div class="modal">
                                    <div class="modal-box">
                                        <h3 class="font-bold text-lg">Do you want to Cancel this Order?</h3>
                                        <p class="py-4">{orderDelete?.productName} will be Delete from Database! if you click Yes</p>
                                        <div class="modal-action">
                                        <button className='btn btn-primary' onClick={() => handleDelete(orderDelete?._id)}>YES </button>
                                         <label for="delete-order " onClick={() => setOrderDelete(null)} class="btn">Cancel</label>
                                        </div>
                                    </div>
                                </div>
                                </>
                            )
                        }
                    </table>
                 </div>
            </div> 
    )
}

export default Orders
