import React, { useContext } from 'react'
import './Popular.css'
import Item from '../Items/Item'
import { ShopContext } from '../../Context/ShopContext';

const Popular = () => {
  const { products, loading } = useContext(ShopContext);
  // show first 8 products or all if fewer
  const display = products ? products.slice(0, 8) : [];

  return (
    <div className='popular'>
        <h1>POPULAR ITEMS</h1>
        <hr />
        <div className="popular-item">
            {loading ? <p>Loading...</p> : display.map((item,i)=>{
                return <Item key={item._id || item.id} id={item._id || item.id} name={item.name} image={item.images && item.images.length>0 ? item.images[0].thumbnailUrl : item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default Popular