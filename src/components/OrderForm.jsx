import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled(motion.div)`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${props => props.theme.body};
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: ${props => props.theme.fontxl};
  color: ${props => props.theme.text};
  margin-bottom: 2rem;
  text-align: center;
`;

const OrderSummary = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
`;

const SummaryTitle = styled.h3`
  font-size: ${props => props.theme.fontlg};
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const Total = styled.div`
  font-size: ${props => props.theme.fontlg};
  color: ${props => props.theme.text};
  text-align: right;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: ${props => props.theme.fontmd};
  color: ${props => props.theme.text};
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: ${props => props.theme.text};
  font-size: ${props => props.theme.fontmd};

  &:focus {
    outline: none;
    border-color: #ffb347;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: ${props => props.theme.text};
  font-size: ${props => props.theme.fontmd};
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #ffb347;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(90deg, #ffb347, #ffcc33);
  border: none;
  border-radius: 10px;
  color: ${props => props.theme.body};
  font-size: ${props => props.theme.fontlg};
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: linear-gradient(90deg, #ffcc33, #ffb347);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const OrderForm = ({ cartItems, total, onOrderPlacement }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    specialInstructions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const orderDetails = {
      items: cartItems,
      total,
      customerInfo: formData,
    };

    onOrderPlacement(orderDetails);
  };

  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Title>Complete Your Order</Title>

      <OrderSummary>
        <SummaryTitle>Order Summary</SummaryTitle>
        <ItemList>
          {cartItems.map(item => (
            <Item key={item.id}>
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </Item>
          ))}
        </ItemList>
        <Total>Total: ${total.toFixed(2)}</Total>
      </OrderSummary>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Full Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Phone Number</Label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Delivery Address</Label>
          <TextArea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>City</Label>
          <Input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>ZIP Code</Label>
          <Input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Special Instructions (Optional)</Label>
          <TextArea
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
          />
        </FormGroup>

        <SubmitButton
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Place Order
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default OrderForm; 