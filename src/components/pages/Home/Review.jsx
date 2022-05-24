import React from 'react'
import { useQuery } from 'react-query'
import Loading from '../../Shared/Loading/Loading';
import { AiFillStar } from 'react-icons/ai'
import axios from 'axios'
function Review() {
    const getReviews = async () => {
        const { data } = await axios.get(`https://manufacturer-server.hrmeheraj.repl.co/reviews?size=6&page=0`);
        return data;
    }
    const { data: reviews, isLoading } = useQuery(['reviewsHome'], () => getReviews());
    return (
        <div>
            {
              isLoading && <Loading/>
            }
           <div className='max-w-[820px] mx-auto w-[95%]'>
                    <div>
                        <h3 className='text-primary text-3xl my-[20px] font-semibold text-center'> Our Customers Reviews </h3>
                    </div>
            <div className='grid grid-cols-1  md:grid-cols-2 gap-[20px] p-4 mb-[20px]'>
                {
                    reviews?.map(review => {
                        return (
                            <div key={review._id} className='p-4 rounded-md shadow-md mt-[20px]'>
                                <div className='my-[10px] flex justify-center items-center'>
                                    <img src={review.imgURL || 'https://cdn.lorem.space/images/face/.cache/500x0/stefan-stefancik-QXevDflbl8A-unsplash.jpg'} className='w-[140px] h-[140px] avatar rounded-full' alt={review.name} />
                                </div>
                                <div className=''>
                                    <h2 className='text-2xl mb-4 text-center'> {review.name}</h2>
                                    <p className='px-3'>{review.review} </p>
                                    <div className='my-4 text-xl flex gap-[8px] text-yellow-800 justify-center'>
                                        {
                                            [...Array(parseInt(review?.ratings)).keys()]?.map((rating, index) => {
                                                return <span key={index}> <AiFillStar /></span>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                  }
              </div>
           </div>
        </div>
    )
}

export default Review
