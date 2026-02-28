import React, { useState, useEffect } from 'react';
import api from '../api/api';
import './ImageGallery.css';

const ImageGallery = ({ productId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/images/${productId}`);
      setImages(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) fetchImages();
  }, [productId]);

  if (loading) return <p>Loading images...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="image-gallery">
      {images.map((img) => (
        <img
          key={img._id}
          src={img.thumbnailUrl || img.originalUrl}
          alt="product"
        />
      ))}
    </div>
  );
};

export default ImageGallery;
