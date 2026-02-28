import React, { useState, useEffect } from 'react';
import { orderAPI } from '../../api/api';
import '../CSS/AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showStatusUpdate, setShowStatusUpdate] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      const params = statusFilter ? { status: statusFilter } : {};
      const response = await orderAPI.getAllOrders(params);
      setOrders(response.data.orders);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId) => {
    try {
      await orderAPI.updateOrderStatus(orderId, {
        orderStatus: newStatus,
        trackingNumber: trackingNumber,
      });
      setShowStatusUpdate(null);
      setNewStatus('');
      setTrackingNumber('');
      fetchOrders();
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-orders">
      <h1>Manage Orders</h1>

      <div className="filter-section">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Orders</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="orders-list">
        {orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-header" onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}>
              <div className="order-info">
                <p className="order-id">Order #{order._id.slice(-6)}</p>
                <p className="order-customer">{order.user?.name}</p>
                <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="order-status">
                <span className={`status-badge ${order.orderStatus}`}>{order.orderStatus}</span>
                <p className="order-total">${order.total?.toFixed(2)}</p>
              </div>
            </div>

            {expandedOrder === order._id && (
              <div className="order-details">
                <div className="details-section">
                  <h4>Items</h4>
                  <ul>
                    {order.items?.map((item, index) => (
                      <li key={index}>
                        {item.product?.name} - Qty: {item.quantity} x ${item.price}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="details-section">
                  <h4>Shipping Address</h4>
                  <p>{order.shippingAddress?.street}</p>
                  <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}</p>
                </div>

                <div className="details-section">
                  <h4>Order Summary</h4>
                  <p>Subtotal: ${order.subtotal?.toFixed(2)}</p>
                  <p>Tax: ${order.tax?.toFixed(2)}</p>
                  <p>Shipping: ${order.shippingCost?.toFixed(2)}</p>
                  <p><strong>Total: ${order.total?.toFixed(2)}</strong></p>
                </div>

                <div className="details-section">
                  <h4>Update Status</h4>
                  {showStatusUpdate === order._id ? (
                    <div className="status-update-form">
                      <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Tracking Number"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                      />
                      <button onClick={() => handleStatusUpdate(order._id)} className="update-btn">
                        Update
                      </button>
                      <button onClick={() => setShowStatusUpdate(null)} className="cancel-btn">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setShowStatusUpdate(order._id)} className="edit-btn">
                      Update Status
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
