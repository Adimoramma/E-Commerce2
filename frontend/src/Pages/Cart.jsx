import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateCartItem, setCart, clearCart } from '../store/cartSlice';
import { cartAPI } from '../api/api';
import './CSS/Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      dispatch(updateCartItem({ _id: productId, quantity: newQuantity }));
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  // when user logs in, fetch their server cart and merge into redux
  React.useEffect(() => {
    const fetchServerCart = async () => {
      try {
        const res = await cartAPI.getCart();
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
        console.error('Error fetching server cart:', err);
      }
    };

    if (user) {
      fetchServerCart();
    } else {
      // if user logs out clear local cart as well
      dispatch(clearCart());
    }
  }, [user, dispatch]);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.1 * 100) / 100;
  const shippingCost = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shippingCost;

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping-link">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-items-header">
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
          </div>

          {items.map(item => (
            <div key={item._id} className="cart-item">
              <div className="product-info">
                {item.image && <img src={item.image} alt={item.name} />}
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description?.substring(0, 50)}...</p>
                </div>
              </div>
              <p className="price">${item.price?.toFixed(2)}</p>
              <div className="quantity-selector">
                <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>-</button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              <p className="total">${(item.price * item.quantity).toFixed(2)}</p>
              <button className="remove-btn" onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-item">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Shipping</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          
          {subtotal > 100 && (
            <div className="free-shipping-badge">FREE SHIPPING!</div>
          )}

          <div className="summary-item total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>

          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;