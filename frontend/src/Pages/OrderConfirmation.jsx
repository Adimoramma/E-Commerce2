import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderAPI } from '../api/api';
import './CSS/OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderAPI.getOrderById(orderId);
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="confirmation-loading">Loading...</div>;
  if (error) return <div className="confirmation-error">Error: {error}</div>;
  if (!order) return <div className="confirmation-error">Order not found</div>;

  return (
    <div className="order-confirmation-container">
      <div className="confirmation-content">
        <div className="confirmation-header">
          <h1>Order Confirmed!</h1>
          <p className="confirmation-message">Thank you for your purchase</p>
        </div>

        <div className="confirmation-card">
          <div className="order-number">
            <p>Order Number</p>
            <h2>#{order._id?.slice(-8)}</h2>
          </div>

          <div className="order-status">
            <p>Status: <span className={`status-badge ${order.orderStatus}`}>{order.orderStatus}</span></p>
            <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="confirmation-details">
          <h3>Order Details</h3>
          
          <div className="details-section">
            <h4>Items Ordered</h4>
            <div className="items-list">
              {order.items?.map((item, index) => (
                <div key={index} className="item-row">
                  <div className="item-info">
                    <p>{item.product?.name}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="details-section">
            <h4>Shipping Address</h4>
            <p>{order.shippingAddress?.name}</p>
            <p>{order.shippingAddress?.street}</p>
            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}</p>
            <p>{order.shippingAddress?.country}</p>
          </div>

          <div className="details-section">
            <h4>Order Summary</h4>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${order.subtotal?.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>${order.tax?.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>${order.shippingCost?.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${order.total?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
          <Link to="/orders" className="view-orders">View My Orders</Link>
        </div>

        <div className="confirmation-footer">
          <p>A confirmation email has been sent to {order.shippingAddress?.email}</p>
          <p>You can track your order status at any time in your account</p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
