import React,{ useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'
import Loading from '../../Shared/Loading/Loading';
import axios from 'axios'
function Blog() {
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(false);
    const getBlog = async () => {
        setLoading(true);
        const { data } = await axios.get(`https://manufacturer-server.hrmeheraj.repl.co/blogs/${id}`);
        setBlog(data);
        setLoading(false);
    }
    useEffect(() =>{
        getBlog();
    },[id])
    return (
        <>
        {
            loading && <Loading/>
        }
        <div className='max-w-[720px] mx-auto w-[95%] mt-[25px]'>
            <img className='w-full block mb-4 rounded-md md:border-[4px] border-[2px] md:border-[#112233] ' src={blog.imgURL} alt={blog.title} /> 
            <h2 className='mb-3 text-[20px] font-bold md:text-[30px] font-[Raleway]'>{blog.title} </h2>
            <p className='text-gray-700 justify'> {blog.body}</p> 
            <p className='mb-[40px]'> <span className='font-bold'> Author: </span> {blog.author} </p>
        </div>
        </>
    )
}

export default Blog
