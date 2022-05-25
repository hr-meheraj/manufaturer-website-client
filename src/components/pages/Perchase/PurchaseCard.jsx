import React from 'react'
import { Link, useParams } from 'react-router-dom'
function PurchaseCard({product}) {
    const { id } = useParams();
    const { _id, name, quantity, minQuantity, description, perPrice, imgURL } = product;
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
        <figure><img src={imgURL} className='product' alt={name}/></figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
          <div className='flex justify-between  py-2'>
              <span className=' '> Minimun Quantity : {minQuantity} </span>
              <span className=''>  Quantity : {quantity} </span>
        </div>
        <div className='flex justify-between itmes-center  py-2'>
            <h2 className='text-2xl font-bold '> Price: </h2> 
            <h2 className='text-3xl font-bold '> ${perPrice} </h2> 
        </div>
          <div className="card-actions justify-end">
           { (!id) &&  <Link to={`/purchase/${_id}`} className="btn btn-primary">Buy Now</Link>}
          </div>
        </div>
      </div>
    )
}

export default PurchaseCard
