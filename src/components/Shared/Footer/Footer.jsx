import React from 'react'
import {Link} from 'react-router-dom'
function Footer() {
    return (
        <footer "footer bg-[#0a131b] text-white  rounded-md  mt-[40px] p-10 ">

        <div>
          <span "footer-title">Services</span> 
          <Link to='/' "link link-hover">Branding</Link> 
          <Link to='/' "link link-hover">Design</Link> 
          <Link to='/' "link link-hover">Marketing</Link> 
          <Link to='/' "link link-hover">Advertisement</Link>
        </div> 
        <div>
          <span "footer-title">Company</span> 
          <Link to='/' "link link-hover">About us</Link> 
          <Link to='/' "link link-hover">Contact</Link> 
          <Link to='/' "link link-hover">Jobs</Link> 
          <Link to='/' "link link-hover">Press kit</Link>
        </div> 
        <div>
          <span "footer-title">Legal</span> 
          <Link  to='/' "link link-hover">Terms of use</Link> 
          <Link  to='/' "link link-hover">Privacy policy</Link> 
          <Link  to='/' "link link-hover">Cookie policy</Link>
        </div>
      </footer> 
        )
}

export default Footer
