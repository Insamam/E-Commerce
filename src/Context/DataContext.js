// DataContext.js
import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/products`);

        if (!response.ok) {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          return;
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchProductById = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/product/${productId}`);
  
      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return null;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return null;
    }
  };

  useEffect(() => {
    const filteredResults = products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [search, products]);

  const updateSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <DataContext.Provider value={{ search, setSearch, products, searchResults, isLoading, updateSearchResults, fetchProductById }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
