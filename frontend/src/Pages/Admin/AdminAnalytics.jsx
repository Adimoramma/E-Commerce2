import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../api/api';
import '../CSS/AdminAnalytics.css';

const AdminAnalytics = () => {
  const [salesData, setSalesData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [period, setPeriod] = useState('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [sales, revenue] = await Promise.all([
        adminAPI.getSalesData(period),
        adminAPI.getRevenueStats(),
      ]);
      setSalesData(sales.data);
      setRevenueData(revenue.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setLoading(false);
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-analytics">
      <h1>Analytics & Reports</h1>

      <div className="period-selector">
        <label>
          Select Period:
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </label>
      </div>

      <div className="analytics-section">
        <h2>Sales Data</h2>
        <div className="sales-chart">
          {salesData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Sales</th>
                  <th>Orders</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((item, index) => (
                  <tr key={index}>
                    <td>{item._id}</td>
                    <td>${item.totalSales?.toFixed(2)}</td>
                    <td>{item.orderCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No sales data available</p>
          )}
        </div>
      </div>

      <div className="analytics-section">
        <h2>Revenue by Category</h2>
        <div className="revenue-chart">
          {revenueData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Revenue</th>
                  <th>Orders</th>
                </tr>
              </thead>
              <tbody>
                {revenueData.map((item, index) => (
                  <tr key={index}>
                    <td>{item._id}</td>
                    <td>${item.totalRevenue?.toFixed(2)}</td>
                    <td>{item.orderCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No revenue data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
