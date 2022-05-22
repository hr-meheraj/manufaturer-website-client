import React from 'react'
import {Link} from 'react-router-dom'
function CallToAction() {
    return (
        <div className='py-[20px] gap-[20px] rounded-md bg-base-100 md:items-center shadow-xl flex-col md:flex  px-4 my-[40px]'>
            <div className='lg:w-8/12 w-full '> 
                <h2 className='text-primary mb-3 text-3xl font-bold'>Have you any question about our Tools? </h2>     
                <p className='font-semibold'> There are not worry about our product </p>
             </div>
             <div className='lg:w-4/12 w-full flex justify-center items-center gap-[15px]'>
                <Link className='btn btn-neutral' to='/contact'> Contact </Link>
                <Link className='btn btn-neutral px-[25px]' to='/register'> Registration </Link>
             </div>
        </div>
    )
}

export default CallToAction
