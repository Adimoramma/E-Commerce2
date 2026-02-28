import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../api/api';
import '../CSS/AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminAPI.getDashboardStats();
        console.log('Dashboard stats response:', response.data);
        setStats(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{stats?.totalUsers || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-value">{stats?.totalProducts || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{stats?.totalOrders || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">${stats?.totalRevenue?.toFixed(2) || 0}</p>
        </div>
      </div>

      <div className="admin-actions">
        <Link to="/admin/products" className="admin-btn">Manage Products</Link>
        <Link to="/admin/categories" className="admin-btn">Manage Categories</Link>
        <Link to="/admin/orders" className="admin-btn">Manage Orders</Link>
        <Link to="/admin/users" className="admin-btn">Manage Users</Link>
        <Link to="/admin/analytics" className="admin-btn">View Analytics</Link>
      </div>

      {error && <div className="admin-error">{error}</div>}
    </div>
  );
};

export default AdminDashboard;
