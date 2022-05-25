import React from 'react'
import { Link, useParams } from 'react-router-dom'
function PurchaseCard({product}) {
    const { id } = useParams();
    const { _id, name, quantity, minQuantity, description, perPrice, imgURL } = product;
    return (
        <div class="card card-compact bg-base-100 shadow-xl">
        <figure><img src={imgURL} className='product' alt={name}/></figure>
        <div class="card-body">
          <h2 class="card-title">{name}</h2>
          <p>{description}</p>
          <div className='flex justify-between  py-2'>
              <span className=' '> Minimun Quantity : {minQuantity} </span>
              <span className=''>  Quantity : {quantity} </span>
        </div>
        <div className='flex justify-between itmes-center  py-2'>
            <h2 className='text-2xl font-bold '> Price: </h2> 
            <h2 className='text-3xl font-bold '> ${perPrice} </h2> 
        </div>
          <div class="card-actions justify-end">
           { (!id) &&  <Link to={`/purchase/${_id}`} class="btn btn-primary">Buy Now</Link>}
          </div>
        </div>
      </div>
    )
}

export default PurchaseCard
