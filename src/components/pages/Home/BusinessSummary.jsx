import React from 'react'
import { FcSettings } from 'react-icons/fc'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { BiWorld } from 'react-icons/bi'
import { MdStarRate } from 'react-icons/md'
function BusinessSummary() {
    const businessData = [
        { 
            Icons : MdStarRate,
            title : 'Reviews',
            number : "42K+"
        },
        {
            Icons : BiWorld,
            title : 'Countries',
            number : "120+"
        },
        {
            Icons : FaRegMoneyBillAlt ,
            title : 'Annual Revenew',
            number : "90 Millions+"
        },
        {
            Icons : FcSettings ,
            title : 'Tools',
            number : "90+"
        }
    ]
    return (
        <div>
           <div className='my-[40px] text-center'>
              <h2 className='text-4xl mb-3 font-bold text-primary'> International Service Provider Trust Us</h2>
              <p className='text-xl font-semibold'>All most 1k+ Client get tools from us every year. </p> 
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px]'>
                {
                    businessData.map( (data, i) => {
                        const { number, title, Icons } = data;
                        return(
                            <div key={i} className='shadow-md text-center rounded-md p-6'>
                                <h2 className='text-6xl flex justify-center mb-4 text-purple-900'> {<Icons/>} </h2>
                                <h2 className='text-4xl font-semibold mb-3'> {number} </h2>
                                <h3 className='text-2xl mb-3 text-secondary'> {title} </h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BusinessSummary
