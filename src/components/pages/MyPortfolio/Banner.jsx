import React from 'react'
import { SiGmail } from 'react-icons/si'
import { BsGithub } from 'react-icons/bs'
import { ImLinkedin2 } from 'react-icons/im'
function Banner() {
    const socialAccounts = [
        { Icons : SiGmail, link : 'mailto:hrmeheraj2021@gmail.com'},
        { Icons : BsGithub , link : 'https://github.com/hr-meheraj'},
        { Icons : ImLinkedin2 , link : 'https://linkedin.com/in/hrmeheraj'},
    ]
    return (
        <div className='w-full py-[50px] lg:py-[100px] bg-[#0a131b] text-white flex justify-center items-center'>
            <div className='max-w-[720px] mx-auto w-[95%] text-center'>
                <h1 className='text-2xl md:text-4xl font-semibold text-[#00fff0]'> HI, I AM HR MEHERAJ</h1>
                <p className='text-[#3d4451] px-4 mt-3'> I am junior React JS Front End Developer and Experience Working with Backend CRUD Operator using MongoDB Database </p>
                <div className='w-[200px] mx-auto flex  gap-[20px] justify-center items-center'>
                    {
                        socialAccounts.map( (each, index) => {
                            const {Icons, link} = each;
                            return(
                                <div className='btn rounded-md shadow-md text-4xl text-white bg-[#112233] w-[70px] mt-[20px]'>
                                   <a key={index} href={link} target="_blank"> <Icons/> </a>
                                </div>
                            )
                        })
                    }
                 </div>
             </div>
        </div>
    )
}

export default Banner
