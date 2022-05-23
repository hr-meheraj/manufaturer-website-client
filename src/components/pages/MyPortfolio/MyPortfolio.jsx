import React from 'react'
import Loading from '../../Shared/Loading/Loading'
import Footer from '../../Shared/Footer/Footer'
import Banner from './Banner'
import EducationInfo from './EducationInfo'
import  Projects from './Projects'
import Skills from './Skills'
import EmailCard from './EmailCard'
function MyPortfolio() {
    return (
        <>
           <Banner/>
           <EmailCard/>
           <Projects/>
           <Skills/>
           <EducationInfo/>
           <Footer/>
        </>
    )
}

export default MyPortfolio


