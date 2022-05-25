import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loading from '../../Shared/Loading/Loading'
function Tools() {
    const getProducts = async () => {
        const { data } = await axios.get(`https://manufacturer-server.hrmeheraj.repl.co/products?size=${6}&page=${0}`);
        return data;
    }
    const { data: products , isLoading, refetch } = useQuery(['products'], () => getProducts());
    return (
        <div>
            {
              isLoading && <Loading/>
            }
           <div className=''>
                    <div>
                        <h3 className='text-primary mt-[70px] mb-[40px] text-3xl font-semibold text-center'> Our Manufacturer </h3>
                    </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-[40px] gap-[20px] md:gap-[40px]'>
                {
                    products?.map((product) => {
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
                                <Link to={`/purchase/${_id}`} class="btn btn-primary">Buy Now</Link>
                              </div>
                            </div>
                          </div>
                        )
                    })
                  }
              </div>
           </div>
        </div>
    )
}

export default Tools
