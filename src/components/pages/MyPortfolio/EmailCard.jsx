import React from 'react'

function EmailCard() {
    return (
        <div className='email rounded-md max-w-[720px] w-[95%] py-[20px] mx-auto bg-[#112233] text-white text-center shadow-md my-[20px]'>
            <p className='text-xl'> <span className='font-bold'>Email :</span> <a href='mailto:habib.meheraj@gmail.com' targert="_blank"> habib.meheraj@gmail.com</a></p> 
        </div>
    )
}

export default EmailCard
