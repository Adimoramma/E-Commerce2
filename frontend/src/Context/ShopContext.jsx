import React, { createContext, useState, useEffect } from 'react';
import { productAPI, categoryAPI } from '../api/api';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('newest');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getAllCategories();
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products based on filters
  const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: itemsPerPage,
          ...(selectedCategory && { category: selectedCategory }),
          ...(searchQuery && { search: searchQuery }),
          ...(sortType && { sort: sortType }),
        };

        const response = await productAPI.getAllProducts(params);
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery, sortType, currentPage, itemsPerPage]);

  const getNewCollections = async () => {
    try {
      const response = await productAPI.getNewProducts();
      return response.data;
    } catch (err) {
      console.error('Error fetching new collections:', err);
      return [];
    }
  };

  const contextValue = {
    products,
    filteredProducts,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortType,
    setSortType,
    loading,
    error,
    getNewCollections,
    fetchProducts,          // expose refresh method
    currentPage,
    setCurrentPage,
    itemsPerPage,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;