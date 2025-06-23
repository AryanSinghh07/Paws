import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';

const CartContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, ${props => props.theme.body} 0%, #1a1a1a 100%);
  padding: 2rem;
`;

const CartContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled(motion.h1)`
  font-size: ${props => props.theme.fontxxxl};
  font-family: 'Kaushan Script';
  color: ${props => props.theme.text};
  text-align: center;
  margin-bottom: 2rem;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  
  h3 {
    font-size: ${props => props.theme.fontlg};
    color: ${props => props.theme.text};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: ${props => props.theme.fontmd};
    color: #ffb347;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;

  button {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: ${props => props.theme.text};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${props => props.theme.fontmd};

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  span {
    color: ${props => props.theme.text};
    font-size: ${props => props.theme.fontmd};
  }
`;

const RemoveButton = styled(motion.button)`
  background: rgba(255, 0, 0, 0.1);
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  color: #ff4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 0, 0, 0.2);
  }
`;

const CartSummary = styled.div`
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.text};
  font-size: ${props => props.theme.fontxl};
  margin-bottom: 1.5rem;
`;

const CheckoutButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(90deg, #ffb347, #ffcc33);
  border: none;
  border-radius: 10px;
  color: ${props => props.theme.body};
  font-size: ${props => props.theme.fontlg};
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const EmptyCart = styled(motion.div)`
  text-align: center;
  color: ${props => props.theme.text};
  padding: 3rem;

  svg {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  h2 {
    font-size: ${props => props.theme.fontxxl};
    margin-bottom: 1rem;
  }

  p {
    font-size: ${props => props.theme.fontlg};
    margin-bottom: 2rem;
    opacity: 0.7;
  }

  button {
    padding: 1rem 2rem;
    background: linear-gradient(90deg, #ffb347, #ffcc33);
    border: none;
    border-radius: 10px;
    color: ${props => props.theme.body};
    font-size: ${props => props.theme.fontmd};
    cursor: pointer;
  }
`;

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <CartContent>
          <EmptyCart
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaShoppingCart />
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <motion.button
              onClick={() => navigate('/products')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Products
            </motion.button>
          </EmptyCart>
        </CartContent>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartContent>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Shopping Cart
        </Title>

        <CartItems>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <img src={item.image} alt={item.name} />
              <ItemInfo>
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <QuantityControl>
                  <motion.button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <span>{item.quantity}</span>
                  <motion.button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </QuantityControl>
              </ItemInfo>
              <RemoveButton
                onClick={() => removeFromCart(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTrash />
              </RemoveButton>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <Total>
            <span>Total</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </Total>
          <CheckoutButton
            onClick={() => navigate('/checkout')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Proceed to Checkout
          </CheckoutButton>
        </CartSummary>
      </CartContent>
    </CartContainer>
  );
};

export default Cart; 