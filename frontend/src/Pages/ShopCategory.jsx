import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Items/Item';

const ShopCategory = (props) => {
  const {filteredProducts, loading} = useContext(ShopContext);
  const category = props.category || '';
  const banner = props.banner || '';
  return (
    <div className="shop-category"> 
        {banner && <img className='shopcategory-banner' src={banner} alt="" />}        <div className="shopcategory-indexSort">
          <p>
            <span>Showing 1-12</span> out of 36 products
          </p>
          <div className="shopcategory-sort">
            Sort by <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="shopcategory-products">
          {loading ? <p>Loading...</p> : (filteredProducts && filteredProducts.length > 0 ? filteredProducts.map((item,i)=>{
            // if category prop is provided, only show matching products; otherwise display all
            if (!category ||
                (item.category && item.category.name &&
                  item.category.name.toLowerCase() === category.toLowerCase())
            ) {
              return <Item key={item._id || item.id} id={item._id || item.id} name={item.name} image={item.images && item.images.length>0 ? item.images[0].thumbnailUrl : item.image} price={item.price} originalPrice={item.originalPrice} />
            }
            return null;
          }) : <p>No products found</p>)}
        </div>
        <div className="shopcategory-loadmore">
          Explore more
        </div>
    </div>
  )
}

export default ShopCategory