import React, { useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart as addToCartAction, setCart } from '../../store/cartSlice'
import { cartAPI } from '../../api/api'

const ProductDisplay = (props) => {
    const {product} = props;
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [selectedImg, setSelectedImg] = useState(
      (product.images && product.images.length > 0 && product.images[0].largeUrl) || product.image
    );

    const handleAddToCart = async () => {
      const cartItem = {
        _id: product._id || product.id,
        name: product.name,
        price: product.price,
        image:
          product.images && product.images.length > 0
            ? product.images[0].thumbnailUrl
            : product.image,
        description: product.description,
        quantity: 1,
      };

      // update local redux store immediately
      dispatch(addToCartAction(cartItem));

      // if user is logged in, sync with backend and overwrite local cart with server state
      if (user) {
        try {
          const res = await cartAPI.addToCart({ productId: product._id || product.id, quantity: 1 });
          if (res.data && res.data.items) {
            const updatedItems = res.data.items.map((i) => ({
              _id: i.product._id || i.product.id,
              name: i.product.name,
              price: i.product.price,
              image:
                i.product.images && i.product.images.length > 0
                  ? i.product.images[0].thumbnailUrl
                  : i.product.image,
              quantity: i.quantity,
              description: i.product.description,
            }));
            dispatch(setCart(updatedItems));
          }
        } catch (err) {
          console.error('Error syncing cart with server:', err);
        }
      }
    };
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                {(product.images && product.images.length > 0 ? product.images : [{originalUrl: product.image}]).map((img,i)=>(
                  <img
                    key={i}
                    src={img.thumbnailUrl || img.originalUrl}
                    alt=""
                    onClick={() => setSelectedImg(img.largeUrl || img.originalUrl)}
                  />
                ))}
            </div>
            <div className="productdisplay-img">
                <img className="productdisplay-main-img" src={selectedImg} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p className="productdisplay-right-rating">122</p>
            </div>
            <div className="productdisplay-right-prices">
                {product.originalPrice && (
                  <div className="productdisplay-right-price-old">
                      &#8358;{product.originalPrice}
                  </div>
                )}
                <div className="productdisplay-right-price-new">
                    &#8358;{product.price}
                </div>
            </div>
            <div className="productdisplay-right-description">
                {product.description}
            </div>
            <div className="productdisplay-right-size">
                <h3>Select Size</h3>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button className="productdisplay-right-addtocart" onClick={handleAddToCart}>Add to Cart</button>
            <p className='productdisplay-right-category'><span>Category: </span>Women, T-Shirt, Crop Top</p>
            <p className='productdisplay-right-category'><span>Tags: </span>Modern, Latest</p>
        </div>
    </div>
  )
}

export default ProductDisplay