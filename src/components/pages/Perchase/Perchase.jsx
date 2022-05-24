import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import PurchaseCard from './PurchaseCard';
import Loading from '../../Shared/Loading/Loading';

function Perchase() {
    const [itmesFound, setItemsFound] = useState(0);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const getReviews = async () => {
        const { data } = await axios.get(`https://manufacturer-server.hrmeheraj.repl.co/products?size=${size}&page=${page}`);
        return data;
    }
    const getPage = async () => {
        try{
            const res = await axios.get(`https://manufacturer-server.hrmeheraj.repl.co/productsCount`);
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

    const { data: products , isLoading, refetch } = useQuery(['products', size, page], () => getReviews());
    return (
        <div>
            {
                isLoading && <Loading/>
            }
            <div className='py-[50px] bg-[#112233] text-white flex  mb-[40px] justify-center items-center'>
                <div className='text-center mx-auto max-w-[920px] w-[95%]'>
                    <h2 className='text-2xl text-yellow-600'>All Tools Page</h2>
                    <p className='px-4 py-2'>Explore All Tools and Book now easily. </p>
                </div>
             </div>
            <div className='max-w-[1000px] mx-auto w-[95%]'>
            <div>
                 <h3 className='text-xl font-semibold text-center'>Total Tools Found : {products?.length}</h3>
                 <br/>
                 <hr/>
                 <br/>
            </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] p-4'>
                {
                    products?.map(product => <PurchaseCard key={product._id} product={product}/>)
                }
                </div>

            <div className='text-center mb-[50px]'>
                <div class="btn-group" >
                  {
                      count && 
                      [...Array(count).keys()].map((each,index) => {
                          return(
                            <button class={`btn btn-md ${(each === page) && 'btn-active'}`} key={index}>{each + 1}</button>
                          )
                      })
                  }
                   <select onChange={(e) => setSize(e.target.value)}> 
                     <option default value="6">6</option>
                     <option value="10">10</option>
                     <option value="15">15</option>
                   </select>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Perchase
