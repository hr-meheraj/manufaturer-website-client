import React from 'react'
import { FaReact, FaNodeJs } from 'react-icons/fa'
import { GrStripe } from 'react-icons/gr'
import { SiTailwindcss,SiExpress,SiReactrouter, SiFirebase,SiMongodb ,SiJsonwebtokens} from 'react-icons/si'
function Skills() {
    const skills = [
        {
            id : 1,
            Logo : FaReact,
            title : "React"
        },
        {
            id : 2,
            Logo : SiTailwindcss,
            title : "Tailwind CSS"
        },
        {
            id : 3,
            Logo : SiFirebase,
            title : " Firebase"
        },
        {
            id : 4,
            Logo : FaNodeJs,
            title : " Node Js"
        },
        {
            id : 5,
            Logo : SiExpress,
            title : " Express Js"
        },
        {
            id : 6,
            Logo : SiReactrouter,
            title : " React Router"
        },
        {
            id : 7,
            Logo : SiMongodb,
            title : " MongoDB Database"
        },
        {
            id : 8,
            Logo : SiJsonwebtokens,
            title : "JWT"
        },
        {
            id : 9,
            Logo : GrStripe,
            title : "Stripe Payment"
        },
    ]
    return (
        <div className='max-w-[720px] w-[95%] mx-auto mt-[40px] mb-[40px]'>
            <h2 className='text-4xl text-primary font-bold'> My All Skills : </h2>
            <br/> 
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[20px] mt-[20px]'>
            {
                skills.map(skill => {
                    const { title , Logo, id} = skill;
                    return(
                        <div key={id} className='p-4 rounded-md shadow-md bg-[#112233] text-white'>
                            <div className='text-6xl mb-3 text-center w-full flex justify-center text-[#5fff2b]'> <Logo/> </div> 
                            <h2 className='text-center text-xl '>{title}</h2> 
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Skills
