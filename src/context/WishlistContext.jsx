import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [wishlistedItems, setWishlistedItems] = useState(() => {
    const savedItems = localStorage.getItem('wishlist');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistedItems));
  }, [wishlistedItems]);

  const toggleWishlist = (product) => {
    setWishlistedItems(prev => {
      const isItemInWishlist = prev.some(item => item.id === product.id);
      if (isItemInWishlist) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlistedItems.some(item => item.id === productId);
  };

  const removeFromWishlist = (productId) => {
    setWishlistedItems(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlistedItems, 
      toggleWishlist, 
      isInWishlist,
      removeFromWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
}; 