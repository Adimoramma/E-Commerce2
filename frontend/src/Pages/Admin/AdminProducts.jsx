import React, { useState, useEffect, useContext } from 'react';
import { productAPI, categoryAPI } from '../../api/api';
import api from '../../api/api';
import UploadForm from '../../Components/UploadForm';
import ImageGallery from '../../Components/ImageGallery';
import { ShopContext } from '../../Context/ShopContext';
import '../CSS/AdminProducts.css';

const AdminProducts = () => {
  const { fetchProducts: refreshProducts } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [galleryRefresh, setGalleryRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({

    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    stock: '',
    image: '',
    sizes: [],
    colors: [],
    isFeatured: false,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // reload categories whenever the form is opened, in case they failed earlier
  useEffect(() => {
    if (showForm) {
      fetchCategories();
    }
  }, [showForm]);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAllProducts({ limit: 100 });
      setProducts(response.data.products);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);
    uploadFormData.append('productId', editingProduct?._id || 'temp');

    try {
      const response = await api.post('/images/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFormData({
        ...formData,
        image: response.data.largeUrl || response.data.originalUrl,
      });
      // refresh list so shop pages will see new image immediately
      refreshProducts();
    } catch (err) {
      console.error('Image upload error:', err);
      alert('Failed to upload image. Make sure you are logged in as admin.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data with proper types
      const dataToSend = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : 0,
        stock: parseInt(formData.stock) || 0,
      };

      if (editingProduct) {
        await productAPI.updateProduct(editingProduct._id, dataToSend);
        setShowForm(false);
        setEditingProduct(null);
        setFormData({
          name: '',
          description: '',
          price: '',
          originalPrice: '',
          category: '',
          stock: '',
          image: '',
          sizes: [],
          colors: [],
          isFeatured: false,
        });
      } else {
        // Creating a new product
        const response = await productAPI.createProduct(dataToSend);
        // Auto-load the newly created product for image uploads
        setEditingProduct(response.data);
        setFormData(response.data);
        // Keep the form open in edit mode so user can upload images
      }
      // refresh global product list so shop pages update
      refreshProducts();
    } catch (err) {
      console.error('Error saving product:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Failed to save product';
      alert(`Error: ${errorMsg}`);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(id);
        fetchProducts();
        // also update global shop list in case users are viewing
        refreshProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: '',
      stock: '',
      image: '',
      sizes: [],
      colors: [],
      isFeatured: false,
    });
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-products">
      <h1>Manage Products</h1>
      <button className="add-btn" onClick={() => setShowForm(true)}>Add New Product</button>

      {showForm && (
        <div className="product-form-container">
          <form className="product-form" onSubmit={handleSubmit}>
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            
            <textarea
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              required
              step="0.01"
            />
            
            <input
              type="number"
              name="originalPrice"
              placeholder="Original Price (Optional)"
              value={formData.originalPrice}
              onChange={handleInputChange}
              step="0.01"
            />
            
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              disabled={categories.length === 0}
            >
              <option value="">
                {categories.length === 0 ? 'Loading categories...' : 'Select Category'}
              </option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
            
            <label className="file-upload-label">
              <span>Upload Product Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {uploading && <span className="uploading">Uploading...</span>}
            </label>
            
            {formData.image && (
              <div className="image-preview">
                <p>Image URL:</p>
                <input
                  type="text"
                  value={formData.image}
                  readOnly
                  style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                />
              </div>
            )}
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
              />
              Mark as Featured
            </label>

            {editingProduct && (
              <div className="image-management">
                <h3>Product Images</h3>
                <UploadForm
                  productId={editingProduct._id}
                  onUpload={() => {
                    setGalleryRefresh(prev => prev + 1);
                    refreshProducts();
                  }}
                />
                <ImageGallery
                  key={galleryRefresh}
                  productId={editingProduct._id}
                />
              </div>
            )}

            <div className="form-buttons">
              <button type="submit" className="submit-btn">Save Product</button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category?.name || 'N/A'}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
