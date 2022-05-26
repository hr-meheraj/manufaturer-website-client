import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loading from '../../Shared/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom'
function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const getBlogs = async () => {
        setIsLoading(true);
        const { data } =await axios.get(`https://tools-manufacture.herokuapp.com/blogs`);
        setBlogs(data);
        setIsLoading(false);
    }
    useEffect(() =>{
        getBlogs();
    },[])
    return (
        <div>
            {
                isLoading && <Loading/>
            }
           <div className='bg-[#112233] mb-[20px] md:mb-[40px] py-[20px] md:py-[50px] flex justify-center items-center text-white'>
              <div> <h2 className='text-[25px] font-bold md:text-4xl mb-4 text-center'> Welcome to Blog Page</h2>
               <p className='text-[16px] px-[15px] md:text-xl font-sembiold text-gray-200 text-center'> Read All blogs content - dynamic blog here </p></div>
           </div>
           <div className='mx-auto max-w-[720px] w-[95%] mb-[40px]'>
            <h2 className='text-gray-500 text-xl mt-[20px] mb-[15px]'> Total Blogs Found : {blogs?.length} </h2>
            <div className='mt-[10px]'>
                  {
                      blogs.map( blog => {
                          const { title, body, imgURL, _id} = blog;
                          return(
                            <div key={_id} onClick={() => navigate(`${_id}`)}  className="mb-[20px] cursor-pointer w-full max-w-full md:min-w-[720px] flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 border-gray-700 bg-gray-800 hover:bg-gray-700">
                            <img className="object-cover w-full h-[240px] rounded-t-lg md:h-[252px] md:w-[324px] md:rounded-none md:rounded-l-lg" src={imgURL}  alt={title}/>
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title.slice(0,60)}...</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{body.slice(0,64)}...</p>
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

export default Blogs
