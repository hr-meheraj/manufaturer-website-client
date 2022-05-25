import React from 'react'
import Footer from '../../Shared/Footer/Footer'
import Loading from '../../Shared/Loading/Loading';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import CallToAction from './CallToAction';
import Review from './Review'
import Tools from './Tools';

function Home() {

    return (
        <div className='max-x-[1180px] w-[95%]  mx-auto'>        
            <Banner/>
            <Tools/>
            <Review/>
            <BusinessSummary/>
            <CallToAction/>
            <Footer/>

        </div>
    )
}

export default Home
