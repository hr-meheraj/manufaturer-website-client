import React from 'react'
import {Link} from 'react-router-dom'
function Footer() {
    return (
      <div className='bg-[#0a131b] '>

      
        <footer className="footer max-w-[1000px] w-[95%] mx-auto text-white  rounded-md  mt-[40px] p-10 ">

        <div>
          <span className="footer-title">Services</span> 
          <Link to='/' className="link link-hover">Branding</Link> 
          <Link to='/' className="link link-hover">Design</Link> 
          <Link to='/' className="link link-hover">Marketing</Link> 
          <Link to='/' className="link link-hover">Advertisement</Link>
        </div> 
        <div>
          <span className="footer-title">Company</span> 
          <Link to='/' className="link link-hover">About us</Link> 
          <Link to='/' className="link link-hover">Contact</Link> 
          <Link to='/' className="link link-hover">Jobs</Link> 
          <Link to='/' className="link link-hover">Press kit</Link>
        </div> 
        <div>
          <span className="footer-title">Legal</span> 
          <Link  to='/' className="link link-hover">Terms of use</Link> 
          <Link  to='/' className="link link-hover">Privacy policy</Link> 
          <Link  to='/' className="link link-hover">Cookie policy</Link>
        </div>
      </footer> 
      </div>
        )
}

export default Footer
