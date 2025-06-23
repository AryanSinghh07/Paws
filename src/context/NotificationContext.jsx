import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationContext = createContext();

const NotificationContainer = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
`;

const NotificationItem = styled(motion.div)`
  background: ${props => {
    switch (props.type) {
      case 'success':
        return 'rgba(72, 187, 120, 0.9)';
      case 'error':
        return 'rgba(245, 101, 101, 0.9)';
      case 'warning':
        return 'rgba(236, 201, 75, 0.9)';
      default:
        return 'rgba(66, 153, 225, 0.9)';
    }
  }};
  color: white;
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  pointer-events: auto;
  max-width: 400px;
  backdrop-filter: blur(5px);

  svg {
    width: 20px;
    height: 20px;
  }

  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    opacity: 0.7;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

const Message = styled.div`
  flex: 1;
  
  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { ...notification, id }]);

    // Auto remove after duration
    setTimeout(() => {
      removeNotification(id);
    }, notification.duration || 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <AnimatePresence>
        <NotificationContainer>
          {notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              type={notification.type}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              {notification.icon && (
                <span className="icon">{notification.icon}</span>
              )}
              <Message>
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
              </Message>
              <button onClick={() => removeNotification(notification.id)}>
                ✕
              </button>
            </NotificationItem>
          ))}
        </NotificationContainer>
      </AnimatePresence>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}; 