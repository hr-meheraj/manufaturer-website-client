import React ,{useState,useEffect} from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useQuery } from 'react-query'
import axios from 'axios'
import privateAxios from '../../../api/privateAxios';
import Loading from '../../Shared/Loading/Loading';

function CheckoutForm({productInfo}) {
    const { _id, quantity, name, minQuantity, productName, email, perPrice  } = productInfo;
    const [price, setPrice] = useState(minQuantity * perPrice);
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const getClientSecret = async () => {
        setLoading(true);
        const response = await axios.post('https://manufacturer-server.hrmeheraj.repl.co/create-payment-intent', { price : price});
        setLoading(false);
        if(response?.data?.clientSecret){
            setClientSecret(response.data.clientSecret)
        }
    }
    useEffect(() =>{
        getClientSecret();
    },[price])

    if(loading){
        return <Loading/>
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        setCardError(error?.message || '')
        setSuccess('');
        setProcessing(true);
        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    }
                },
            },
        );

        if (intentError) {
            setCardError(intentError?.message);
            setProcessing(false);
        }
        else {
            setCardError('');
            setTransactionId(paymentIntent.id);
            console.log(paymentIntent);
            setSuccess('Congratulation! Your payment is completed.')
            
            const payment = {
                paymentProductId : _id,
                transactionId: paymentIntent.id
            }
            const response = privateAxios.put(`https://manufacturer-server.hrmeheraj.repl.co/purchase/${_id}`, payment);
            if(response){
                console.log(response);
            }
            setProcessing(false);
        }
    }

    return (
        
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className={`btn btn-success block w-full mt-[40px] `} disabled={!stripe || !clientSecret || success} type="submit" >
                    Pay
                </button>
               
            </form>
            {
                cardError && <p className='text-red-600'>{cardError}</p>
            }
            {
                success && <div className='text-green-500'>
                    <p>{success}  </p>
                    <p>Your transaction Id: <span className="text-green-500">{transactionId}</span> </p>
                </div>
            }
        </>
            
    )
}

export default CheckoutForm
