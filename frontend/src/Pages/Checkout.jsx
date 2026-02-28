import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { orderAPI } from '../api/api';
import './CSS/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  
  const [formData, setFormData] = useState({
    shippingAddress: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || '',
      country: user?.address?.country || '',
    },
    paymentMethod: 'credit_card',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      shippingAddress: {
        ...formData.shippingAddress,
        [name]: value,
      },
    });
  };

  const handlePaymentChange = (e) => {
    setFormData({
      ...formData,
      paymentMethod: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      const response = await orderAPI.createOrder({
        ...formData,
        paymentStatus: 'completed', // In real app, this would be after payment processing
      });
      
      // Payment would happen here in real application
      // For now, we'll assume payment is successful
      navigate(`/order-confirmation/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating order');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="checkout-container"><p>Please log in to checkout</p></div>;
  }

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.1 * 100) / 100;
  const shippingCost = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shippingCost;

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      <div className="checkout-content">
        <div className="checkout-form">
          <form onSubmit={handleSubmit}>
            <h2>Shipping Address</h2>
            
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.shippingAddress.name}
              onChange={handleInputChange}
              required
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.shippingAddress.email}
              onChange={handleInputChange}
              required
            />
            
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.shippingAddress.phone}
              onChange={handleInputChange}
              required
            />
            
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={formData.shippingAddress.street}
              onChange={handleInputChange}
              required
            />
            
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.shippingAddress.city}
              onChange={handleInputChange}
              required
            />
            
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.shippingAddress.state}
              onChange={handleInputChange}
              required
            />
            
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.shippingAddress.zipCode}
              onChange={handleInputChange}
              required
            />
            
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.shippingAddress.country}
              onChange={handleInputChange}
              required
            />

            <h2>Payment Method</h2>
            
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  checked={formData.paymentMethod === 'credit_card'}
                  onChange={handlePaymentChange}
                />
                Credit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="debit_card"
                  checked={formData.paymentMethod === 'debit_card'}
                  onChange={handlePaymentChange}
                />
                Debit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handlePaymentChange}
                />
                PayPal
              </label>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={loading} className="checkout-btn">
              {loading ? 'Processing...' : 'Complete Purchase'}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="order-items">
            {items.map(item => (
              <div key={item._id} className="summary-item">
                <div className="item-details">
                  <p>{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            {subtotal > 100 && <p className="free-shipping">Free Shipping!</p>}
            <div className="total-row final">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
