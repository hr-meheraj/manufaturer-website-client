import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import Loading from '../../Shared/Loading/Loading';
import { AiFillStar } from 'react-icons/ai'
function Reviews() {
    const [itmesFound, setItemsFound] = useState(0);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const getReviews = async () => {
        const { data } = await axios.get(`https://tools-manufacture.herokuapp.com/reviews?size=${size}&page=${page}`);
        return data;
    }
    const getPage = async () => {
        try{
            const res = await axios.get(`https://tools-manufacture.herokuapp.com/reviewsCount`);
            const data = await res.data.count;
            setItemsFound(data);
            const page = Math.ceil(data / size);
            setCount(page);
        }catch(err){
            console.log(err);
        }
    };

    useEffect(() =>{
        getPage();
    },[size])

    const { data: reviews, isLoading, refetch } = useQuery(['reviews', size, page], () => getReviews());

    return (
        <div className=''>
            {
                isLoading && <Loading />
            }
            <div className='py-[50px] mb-[40px] flex justify-center  bg-[#112233] text-white items-center '>
               <div className='max-w-[820px] mx-auto w-[95%] '>
               <h2 className='text-xl md:text-2xl text-yellow-300 text-center'>ALL REVIEWS </h2>
                <p className='my-[15px] text-gray-500 text-center'> Explore some review and trust us. </p>
                </div>
            </div>
           <div className='max-w-[1000px] w-[95%]  mx-auto'>
           <div>
                <h3 className='text-gray-500 font-semibold my-[40px]'> Total Reveiw Found : {itmesFound} </h3>
                <hr />
            </div>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-[40px] gap-[20px] md:gap-[40px]'>
                {
                    reviews?.map(review => {
                        return (
                            <div key={review._id} className='p-4 rounded-md shadow-md mt-[20px]'>
                                <div className='my-[10px] flex justify-center items-center'>
                                    <img src={review.imgURL || 'https://www.w3schools.com/howto/img_avatar.png'} className='w-[140px] h-[140px] avatar rounded-full' alt={review.name} />
                                </div>
                                <div className=''>
                                    <h2 className='text-2xl mb-4 text-center'> {review.name}</h2>
                                    <p className='px-3 text-center'>{review.review} </p>
                                    <div className='my-4 text-xl flex gap-[8px] text-[#f9a10a] justify-center'>
                                        {
                                            [...Array(parseInt(review?.ratings)).keys()]?.map((rating, index) => {
                                                return <span key={index} className='text-[#f9a10a]'> <AiFillStar /></span>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='text-center mb-[50px]'>
                <div className="btn-group" >
                  {
                      count && 
                      [...Array(count).keys()].map((each,index) => {
                          return(
                            <button onClick={(() => setPage(each))} className={`btn btn-md ${(each === page) && 'btn-active'}`} key={index}>{each + 1}</button>
                          )
                      })
                  }
                   <select onChange={(e) => setSize(e.target.value)}> 
                     <option default value="10">10</option>
                     <option value="15">15</option>
                     <option value="20">20</option>
                     <option value={itmesFound}>All</option>
                   </select>
                </div>
            </div>
          </div>
        </div>
    )
}

export default Reviews