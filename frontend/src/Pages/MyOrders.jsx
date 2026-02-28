import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { orderAPI } from '../api/api';
import './CSS/MyOrders.css';

const MyOrders = () => {
  const { user } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getMyOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="my-orders-container"><p>Please log in to view your orders</p></div>;
  }

  if (loading) return <div className="my-orders-loading">Loading...</div>;
  if (error) return <div className="my-orders-error">Error: {error}</div>;

  return (
    <div className="my-orders-container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div 
                className="order-header"
                onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
              >
                <div className="order-info">
                  <p className="order-id">Order #{order._id?.slice(-6)}</p>
                  <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="order-summary">
                  <span className={`status-badge ${order.orderStatus}`}>{order.orderStatus}</span>
                  <p className="order-total">${order.total?.toFixed(2)}</p>
                </div>
              </div>

              {expandedOrder === order._id && (
                <div className="order-details">
                  <div className="details-grid">
                    <div className="detail-section">
                      <h4>Items</h4>
                      <ul>
                        {order.items?.map((item, index) => (
                          <li key={index}>
                            <span>{item.product?.name}</span>
                            <span>Qty: {item.quantity} x ${item.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail-section">
                      <h4>Shipping Address</h4>
                      <p>{order.shippingAddress?.name}</p>
                      <p>{order.shippingAddress?.street}</p>
                      <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                    </div>

                    <div className="detail-section">
                      <h4>Payment</h4>
                      <p>Method: {order.paymentMethod?.replace('_', ' ').toUpperCase()}</p>
                      <p>Status: <span className={`payment-badge ${order.paymentStatus}`}>{order.paymentStatus}</span></p>
                    </div>

                    <div className="detail-section">
                      <h4>Order Total</h4>
                      <p>Subtotal: ${order.subtotal?.toFixed(2)}</p>
                      <p>Tax: ${order.tax?.toFixed(2)}</p>
                      <p>Shipping: ${order.shippingCost?.toFixed(2)}</p>
                      <p className="total"><strong>Total: ${order.total?.toFixed(2)}</strong></p>
                    </div>
                  </div>

                  {order.trackingNumber && (
                    <div className="tracking-info">
                      <p>Tracking Number: <strong>{order.trackingNumber}</strong></p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
