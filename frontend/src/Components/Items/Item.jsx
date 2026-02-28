import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart as addToCartAction, setCart } from '../../store/cartSlice'
import { cartAPI } from '../../api/api'

const Item = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleAdd = async (e) => {
    e.preventDefault();
    const cartItem = {
      _id: props.id,
      name: props.name,
      price: props.price || props.new_price,
      image: props.image,
      quantity: 1,
    };

    dispatch(addToCartAction(cartItem));

    if (user) {
      try {
        const res = await cartAPI.addToCart({ productId: props.id, quantity: 1 });
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
          }));
          dispatch(setCart(updatedItems));
        }
      } catch (err) {
        console.error('Error syncing cart from item list:', err);
      }
    }
  };

  return (
    <div className="item">
        <Link to={`/product/${props.id}`}><img src={props.image} alt="" /> </Link> 
        <p>{props.name}</p>
        <div className="item-prices">
          <div className="item-price-new">
            &#8358;{props.price || props.new_price}
          </div>
          {(props.originalPrice || props.old_price) && (
            <div className="item-price-old">
              &#8358;{props.originalPrice || props.old_price}
            </div>
          )}
        </div>
        <button className="item-add-btn" onClick={handleAdd}>Add to Cart</button>
    </div>
  )
}

export default Item