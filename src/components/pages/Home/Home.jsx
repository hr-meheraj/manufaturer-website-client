import React from 'react'
import Footer from '../../Shared/Footer/Footer'
import Loading from '../../Shared/Loading/Loading';
import Banner from './Banner';

function Home() {

    return (
        <div className='max-x-[1180px] mx-auto'>        
            <Banner/>
            <Footer/>

        </div>
    )
}

export default Home
