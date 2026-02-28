import React, { useContext } from 'react'
import './NewCollections.css'
import Item from '../Items/Item'
import { ShopContext } from '../../Context/ShopContext';

const NewCollections = () => {
  const { products, loading } = useContext(ShopContext);
  // show newest 8 by createdAt
  const sorted = products ? [...products].sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)) : [];
  const display = sorted.slice(0,8);

  return (
    <div className="new-collections">
       <h1>NEW COLLECTIONS</h1>
         <hr />
        <div className="collections">
            {loading ? <p>Loading...</p> : display.map((item,i)=>{
              return <Item key={item._id || item.id} id={item._id || item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default NewCollections