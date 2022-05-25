import React from 'react'
import { useParams } from 'react-router-dom'
import { MdPayment } from 'react-icons/md'
import { useQuery } from 'react-query'
import Loading from '../../Shared/Loading/Loading';
import privateAxios from '../../../api/privateAxios';
function Payment() {
    const { id } = useParams();
    const getPaymentProduct = async () => {
        const response = await privateAxios.get(`https://manufacturer-server.hrmeheraj.repl.co/purchase/payment/${id}`);
        console.log(response);
        return response?.data;
    }
    const { data: paymentProduct, isLoading } = useQuery('paymentProduct', () => getPaymentProduct());
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className='max-w-[820px] mx-auto w-[95%] p-4 mt-[20px] mb-[50px]'>
            <div className='flex justify-around items-center py-2 shadow-md mb-[30px]'>
                <h2 className='text-xl font-semibold text-primary'> Payment </h2>
                <label for="" className='btn btn-active btn-link gap-2 text-xl'>  <MdPayment /> </label>
            </div>
            <div className='grid gap-[20px] grid-cols-1 md:grid-cols-2'>
                <div class="card bg-base-100 shadow-xl">
                    <figure><img src={paymentProduct?.imgURL} alt={paymentProduct?.productName} /> </figure>
                    <div class="card-body">
                        <h2 class="card-title">
                            {paymentProduct?.productName}
                            <div class="badge badge-primary badge-xs">Pay</div>
                        </h2>
                        <p>{paymentProduct?.description}</p>

                        <div class="card-actions flex flex-col gap-[10px]">
                            <div class="">
                                Quantity : <span> {paymentProduct?.quantity}</span>
                            </div>
                            <div class="">
                                Per Price : <span> {paymentProduct?.perPrice} </span>
                            </div>
                            <div>
                                <h3 className='text-center text-xl'>Total Pay :  </h3>
                                <h2 className='text-4xl font-bold text-center my-[15px]'> {paymentProduct?.quantity * paymentProduct?.perPrice} </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card  bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title">Stripe Checkout Here!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
