import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { saveOrder } from '../services/api';
import { FaShoppingCart, FaCreditCard, FaMapMarkerAlt, FaCheck, FaSpinner } from 'react-icons/fa';

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, ${props => props.theme.body} 0%, #1a1a1a 100%);
  padding: 2rem;
`;

const Container = styled.div`
  width: 90%;
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

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontxl};
  color: ${props => props.theme.text};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme.text};
  font-size: ${props => props.theme.fontmd};
`;

const Input = styled.input`
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: ${props => props.theme.text};
  font-size: ${props => props.theme.fontmd};

  &:focus {
    outline: none;
    border-color: #ffb347;
  }
`;

const OrderSummary = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  height: fit-content;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: ${props => props.theme.text};
  font-size: ${props => props.theme.fontmd};
`;

const Total = styled(SummaryItem)`
  font-size: ${props => props.theme.fontlg};
  font-weight: bold;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 1rem;
  margin-top: 1rem;
`;

const PlaceOrderButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(90deg, #ffb347, #ffcc33);
  border: none;
  border-radius: 10px;
  color: ${props => props.theme.body};
  font-size: ${props => props.theme.fontlg};
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  color: ${props => props.theme.text};
  
  svg {
    font-size: 4rem;
    color: #4CAF50;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: ${props => props.theme.fontxxl};
    margin-bottom: 1rem;
  }

  p {
    font-size: ${props => props.theme.fontlg};
    margin-bottom: 2rem;
  }
`;

const BackButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 10px;
  color: ${props => props.theme.text};
  font-size: ${props => props.theme.fontmd};
  cursor: pointer;
  margin-top: 1rem;
`;

const LoadingSpinner = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: ${props => props.theme.text};
  
  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled(motion.div)`
  color: #ff4444;
  text-align: center;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 10px;
  
  p {
    margin: 0;
  }
`;

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, removeFromCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const validateForm = () => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone',
      'address', 'city', 'state', 'zipCode',
      'cardNumber', 'expiryDate', 'cvv'
    ];

    const emptyFields = requiredFields.filter(field => !formData[field]);
    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Basic phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid phone number');
      return false;
    }

    // Basic card number validation (16 digits)
    const cardRegex = /^\d{16}$/;
    if (!cardRegex.test(formData.cardNumber)) {
      setError('Please enter a valid 16-digit card number');
      return false;
    }

    // Basic expiry date validation (MM/YY)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(formData.expiryDate)) {
      setError('Please enter a valid expiry date (MM/YY)');
      return false;
    }

    // Basic CVV validation (3 digits)
    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(formData.cvv)) {
      setError('Please enter a valid 3-digit CVV');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setError(null);
    
    try {
      // Generate order number
      const generatedOrderNumber = Math.floor(100000 + Math.random() * 900000);
      
      // Prepare order data
      const orderData = {
        orderNumber: generatedOrderNumber,
        orderDate: new Date().toISOString(),
        userId: localStorage.getItem('userId') || 'default_user', // Add userId to link orders to users
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          fullName: `${formData.firstName} ${formData.lastName}`
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || 'https://via.placeholder.com/80'
        })),
        payment: {
          cardNumber: formData.cardNumber.slice(-4), // Only store last 4 digits
          expiryDate: formData.expiryDate,
          method: 'Credit Card'
        },
        total: getCartTotal(),
        status: 'Processing',
        deliveryAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`
      };

      // Save order to backend
      const response = await saveOrder(orderData);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to save order');
      }

      // Clear cart
      cartItems.forEach(item => removeFromCart(item.id));
      
      // Set order number for confirmation
      setOrderNumber(generatedOrderNumber);
      
      // Show success message
      setOrderComplete(true);
    } catch (error) {
      console.error('Error processing order:', error);
      setError(error.message || 'There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <Section>
        <Container>
          <SuccessMessage
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaCheck />
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for shopping with us. Your order #{orderNumber} is being processed.</p>
            <p>You will receive a confirmation email shortly.</p>
            <BackButton
              onClick={() => navigate('/products')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Shopping
            </BackButton>
          </SuccessMessage>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Checkout
        </Title>

        {error && (
          <ErrorMessage
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{error}</p>
          </ErrorMessage>
        )}

        <CheckoutGrid>
          <div>
            <FormSection
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SectionTitle>
                <FaMapMarkerAlt />
                Shipping Information
              </SectionTitle>
              <Form onSubmit={handleSubmit}>
                <InputGroup>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <Label>Address</Label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <Label>City</Label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <Label>State</Label>
                  <Input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <Label>ZIP Code</Label>
                  <Input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
              </Form>
            </FormSection>

            <FormSection
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SectionTitle>
                <FaCreditCard />
                Payment Information
              </SectionTitle>
              <Form>
                <InputGroup>
                  <Label>Card Number</Label>
                  <Input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    maxLength="16"
                  />
                </InputGroup>
                <InputGroup>
                  <Label>Expiry Date</Label>
                  <Input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    maxLength="5"
                  />
                </InputGroup>
                <InputGroup>
                  <Label>CVV</Label>
                  <Input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    maxLength="3"
                  />
                </InputGroup>
              </Form>
            </FormSection>
          </div>

          <OrderSummary
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <SectionTitle>
              <FaShoppingCart />
              Order Summary
            </SectionTitle>
            {cartItems.map(item => (
              <SummaryItem key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </SummaryItem>
            ))}
            <Total>
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </Total>
            <PlaceOrderButton
              onClick={handleSubmit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isProcessing || cartItems.length === 0}
            >
              {isProcessing ? (
                <LoadingSpinner>
                  <FaSpinner />
                  Processing...
                </LoadingSpinner>
              ) : (
                'Place Order'
              )}
            </PlaceOrderButton>
          </OrderSummary>
        </CheckoutGrid>
      </Container>
    </Section>
  );
};

export default Checkout; 