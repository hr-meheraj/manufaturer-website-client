import React from 'react'
import {Link} from 'react-router-dom'
function Footer() {
    return (
        <footer class="footer bg-[#0a131b] text-white  rounded-md  mt-[40px] p-10 ">

        <div>
          <span class="footer-title">Services</span> 
          <Link to='/' class="link link-hover">Branding</Link> 
          <Link to='/' class="link link-hover">Design</Link> 
          <Link to='/' class="link link-hover">Marketing</Link> 
          <Link to='/' class="link link-hover">Advertisement</Link>
        </div> 
        <div>
          <span class="footer-title">Company</span> 
          <Link to='/' class="link link-hover">About us</Link> 
          <Link to='/' class="link link-hover">Contact</Link> 
          <Link to='/' class="link link-hover">Jobs</Link> 
          <Link to='/' class="link link-hover">Press kit</Link>
        </div> 
        <div>
          <span class="footer-title">Legal</span> 
          <Link  to='/' class="link link-hover">Terms of use</Link> 
          <Link  to='/' class="link link-hover">Privacy policy</Link> 
          <Link  to='/' class="link link-hover">Cookie policy</Link>
        </div>
      </footer> 
        )
}

export default Footer
