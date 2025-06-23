// Base URL for your backend API
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Save order to backend
export const saveOrder = async (orderData) => {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

// Get order by order number
export const getOrder = async (orderNumber) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/${orderNumber}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error getting order:', error);
    throw error;
  }
};

// Get orders by user ID
export const getOrdersByUser = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/user/${userId}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error getting user orders:', error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (orderNumber, status) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/${orderNumber}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await fetch(`${BASE_URL}/orders`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    return data.orders;
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};

export const saveCart = async (cartData) => {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    });
    
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    
    return data;
  } catch (error) {
    console.error('Error saving cart:', error);
    throw error;
  }
};

export const getCart = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/cart/${userId}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    return data.cart;
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
}; 