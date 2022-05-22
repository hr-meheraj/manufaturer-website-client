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
        <div class="hero py-[60px]">
            <div class="hero-content flex-col lg:flex-row-reverse">
                {/* <div className="lottie-container w-full md:w-6/12" ref={container}> </div> */}
                <div className="lottie-container w-full lg:w-6/12">
                    <img src="https://www.nicepng.com/png/detail/128-1289383_settings-settings-icon-png-white.png" alt='banner' className='w-full '/>    
                 </div>
                <div className='w-full lg:w-6/12'>
                    <h1 class="text-5xl font-bold">GET HIGH <span className='text-primary'>QUALITY TOOLS</span></h1>
                    <p class="py-6">Order for your needed manufaturing tools. Fast servicing and Warrented Tools. Place you happy perchase</p>
                    <div className='flex gap-[15px]'>
                    <Link to='/purchase' className='btn btn-primary rounded-md'>Get Order </Link>
                    <Link to='/about-me' className='btn btn-secondary rounded-md'>Portfolio</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
