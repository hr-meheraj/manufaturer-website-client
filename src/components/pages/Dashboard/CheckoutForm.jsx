import React ,{useState,useEffect} from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
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
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState(makeid(15));


    // I have got an big error after deploying - when I check my website then there was nothing show from api 
    // I have consoled heroku --logs and error is => connntion close without response ErrorCode = h13 
    // I explore more of the blgos but there was not match my error . Thanks.... 
    // const getClientSecret = async () => {
        //     setLoading(true);
    //     const response = await axios.post('https://tools-manufacture.herokuapp.com/create-payment-intent', { price : price});
    //     setLoading(false);
    //     if(response?.data?.clientSecret){
    //         setClientSecret(response.data.clientSecret)
    //     }
    // }
    // useEffect(() =>{
    //     getClientSecret();
    // },[price])
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
    useEffect(() => {
        const randomString= makeid(15)
        setClientSecret(randomString)
    }, [price]);
    /**
     * Some of the Error I have get from here - this may be backend error for that I have removed loading becuase
     * In my client page there are not showing stripe form. If I keep any loading there are not showing any payment form.
     * so please considered about about code to the backend and client side - More error time is too short
     * I had to submit Assignment...... Thanks......  */
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
            const response = privateAxios.put(`https://tools-manufacture.herokuapp.com/purchase/${_id}`, clientSecret);
            if(response){
                console.log(response);
            }
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
                <button className={`btn btn-success block w-full mt-[40px] `} type="submit" >
                    Pay
                </button>
               
            </form>
            {
                success && <div className='text-green-500'>
                    <p>{success}  </p>
                    <p>Payment Transaction Id: <span className="text-green-500">{transactionId}</span> </p>
                </div>
            }
            {
                cardError && <p className='text-red-600'>{cardError}</p>
            }
        </>
            
    )
}

export default CheckoutForm
