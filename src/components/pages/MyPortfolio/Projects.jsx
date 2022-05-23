import React from 'react'
import writer from '../../../assets/writer.png'
import mern from '../../../assets/mern.png'
import spa from '../../../assets/spa.png'
import laptop from '../../../assets/laptop.png'
function Projects() {
    const projects = [
        { 
            imgUrl: writer,
             viewLink: 'https://writer-auth.web.app' ,
             title : "Writer Services & Authentication Webiste",
             technologies : ["React", "Firebase", "Tailwind CSS"],
            description : "This website quit about Firebase Authentication for Writer Services Selling. This is fully Resposive for all devices and uses Most Power technology Tailwind CSS"},
        { 
            imgUrl: laptop,
             viewLink: 'https://react-laptop-e-commerce.netlify.app/' ,
             title : "React Laptop E-commerce",
             technologies : ["React",  "Tailwind CSS"],
            description : "React js simple laptop e-commerce webiste by tailwindcss and also added it state management"},
        { 
            imgUrl: spa,
             viewLink: 'https://react-router-spa.netlify.app' ,
             title : "Single Page Router Application",
             technologies : ["React", "React Router", "Tailwind CSS", "Chart"],
            description : "This website fully responsive with tailwind CSS - and single page application with chart containing."},
        {
             imgUrl: mern,
             viewLink: 'https://mern-inventory.web.app',
             title : " Inventory Management Website",
             technologies : ["React","MongoDB", "Node Express", "JWT for Security","Firebase","Tailwind CSS"],
             description : "This website fully response using Firebase authentication - integrate with Backend Node js -  MongoDB as Database. For Security uses JWT token most powerfull" }
    ]
    return (
        <div className='mt-[30px] max-w-[840px] mx-auto w-[95%]'>
            <div>

                <h2 className='text-3xl text-center mb-3'>My Recent Work</h2>
                <p className='text-center'> Here are few project that I have link them </p>

            </div>
            <br />
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-[30px]'>
                {
                    projects.map((project, index) => {
                        const { imgUrl, viewLink, description, title, technologies } = project;
                        return(
                            <div  key={index} className="card  bg-base-100 shadow-xl">
                              <figure><img src={imgUrl} alt="Project img" /></figure>
                            <div className="card-body">
                            <h2 className="card-title mb-3">{title}</h2>
                            <p className=''> {description} </p> 
                            <br/>
                           <p>Technologies are uses in this website : </p>
                           <ul className='ml-[20px] list-disc mb-3'>
                               {
                                technologies.map( (tech, index) => <li key={index}> {tech}</li>)
                               } 
                            </ul>
                          <div className="card-actions justify-end">
                            <button className="btn btn-primary"><a href={viewLink} target="_blank"> View Now </a></button>
                          </div>
                        </div>
                      </div>
                        )
                    })

                }
            </div>
        </div>
    )
}

export default Projects
