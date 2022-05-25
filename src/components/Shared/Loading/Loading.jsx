import React from 'react'
import './Loading.css'

function Loading() {
    return (
       <div className='loader'>
           <div "lds-ripple"><div></div><div></div></div>
       </div>
    )
}

export default Loading
