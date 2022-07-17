import React from 'react'
import {Link} from 'react-router-dom'
function CallToAction() {
    return (
        <div className=' bg-[#0a131b] text-white text-center rounded-md my-[54px] p-[15px] md:p-[40px]'>
            <div className=' w-full '> 
                <h2 className='text-[#f9a10a]mb-3 text-2xl md:text-3xl font-bold'>Have you any question about our Tools? </h2>     
                <p className='font-semibold text-gray'> There are not worry about our product </p>
             </div>
             <div className='flex justify-center items-center gap-[15px] mt-[20px]'>
                <Link className='btn btn-neutral' to='/contact'> Contact </Link>
                <Link className='btn btn-neutral px-[25px]' to='/register'> Registration </Link>
             </div>
        </div>
    )
}

export default CallToAction
