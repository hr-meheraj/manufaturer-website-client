import React from 'react'
import {Link} from 'react-router-dom'
function NotFound() {
    return (
        <div className='w-full mx-auto flex justify-center items-center mt-[60px]'>
           <div className='text-center'>
             <img className='max-w-[90%] w-[550px] h-auto' src="https://t3.ftcdn.net/jpg/03/88/23/82/360_F_388238209_tCXemYkYHzhiSV6KVUbaiuCEfoSAFLwz.jpg" alt="404 Not Found Image"/>
             <Link className='text-2xl text-blue-700 hover:text-blue-900' to='/'>Back to HOME PAGE</Link>
           </div>
        </div>
    )
}

export default NotFound
