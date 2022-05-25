import React from 'react'
import { useParams } from 'react-router-dom'
import { MdPayment } from 'react-icons/md'
import { useQuery } from 'react-query'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Loading from '../../Shared/Loading/Loading';
import privateAxios from '../../../api/privateAxios';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L3D18LiBwdXb9tUmHWMLO3Z5tG5eqsFKGmBByJL0UhFxlMJ8ezKKUeo42Inkh2CQdjHHC9ROwZk5zkOWx9tuOT300amNRMLD2');

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
                                Per Price : <span> ${paymentProduct?.perPrice} </span>
                            </div>
                            <div>
                                <h3 className='text-center text-xl'>Total Pay :  </h3>
                                <h2 className='text-4xl font-bold text-center my-[15px]'> ${paymentProduct?.quantity * paymentProduct?.perPrice} </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-compact w-96 bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title">Payment with Stripe!</h2>
                         <Elements stripe={stripePromise}>
                            <CheckoutForm productInfo={paymentProduct} />
                         </Elements>
                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default Payment
