import React,{useEffect, useRef} from 'react'
import lottie from 'lottie-web';
// import bannerAnimation from './banner-animation.json'
import {Link} from 'react-router-dom'
function Banner() {
//    const container = useRef();
//    useEffect(() =>{
//        lottie.loadAnimation({
//            container : container.current,
//             renderer : "svg",
//             loop : true,
//             autoplay : true,
//             animationData : bannerAnimation
//        })
//    }, [])
    return (
        <div className=" hero py-[60px] mt-[20px] text-white bg-[#0a131b] mt-[40px] pl-[40px] rounded-md">
            <div className="hero-content flex-col lg:flex-row-reverse ">
                {/* <div className="lottie-container w-full md:w-6/12" ref={container}> </div> */}
                <div className="lottie-container w-full lg:w-6/12">
                    <img src="https://i.ibb.co/rZ7tdgx/car-settings-icon-260nw-402897862.png" alt='banner' className='w-full '/>    
                 </div>
                <div className='w-full lg:w-6/12'>
                    <h1 className="text-2xl md:text-5xl font-bold font-[poppins]">GET HIGH <span className='text-yellow-600'>QUALITY TOOLS</span></h1>
                    <p className="py-6">Order for your needed manufaturing tools. Fast servicing and Warrented Tools. Place you happy perchase</p>
                    <div className='flex gap-[15px]'>
                    <Link to='/purchase' className='btn btn-primary  rounded-md'>Get Order </Link>
                    <Link to='/about-me' className='btn rounded-md bg-gray'>Portfolio</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
