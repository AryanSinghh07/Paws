import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';

const PageBackground = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(255, 179, 71, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(255, 204, 51, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.5;
  }
`;

const Container = styled(motion.div)`
  max-width: 900px;
  margin: 3rem auto;
  padding: 2.5rem;
  background: linear-gradient(145deg, rgba(40, 40, 40, 0.95), rgba(28, 28, 28, 0.97));
  border-radius: 25px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #ffb347, #ffcc33, #ffb347);
  }

  @media (max-width: 768px) {
    margin: 1rem auto;
    padding: 1.5rem;
  }
`;

const LoadingContainer = styled(Container)`
  text-align: center;
  padding: 4rem;
  
  svg {
    width: 50px;
    height: 50px;
    margin-bottom: 1rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  background: linear-gradient(45deg, #4CAF50, #45a049);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);

  svg {
    width: 40px;
    height: 40px;
    color: white;
  }
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontxxl};
  color: ${props => props.theme.text};
  text-align: center;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #ffb347, #ffcc33);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${props => props.theme.text};
  opacity: 0.8;
  font-size: ${props => props.theme.fontlg};
  margin-bottom: 2.5rem;
`;

const OrderNumber = styled.div`
  text-align: center;
  font-size: ${props => props.theme.fontxl};
  color: #ffb347;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 179, 71, 0.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  span {
    display: block;
    font-size: ${props => props.theme.fontmd};
    color: ${props => props.theme.text};
    opacity: 0.7;
    margin-bottom: 0.5rem;
  }
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);
  }
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontlg};
  color: #ffb347;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    color: ${props => props.theme.text};
    font-size: ${props => props.theme.fontmd};
  }
`;

const ItemQuantity = styled.span`
  background: rgba(255, 179, 71, 0.1);
  color: #ffb347;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: ${props => props.theme.fontsm};
`;

const ItemPrice = styled.span`
  color: #4CAF50;
  font-weight: 600;
  font-size: ${props => props.theme.fontmd};
`;

const Total = styled.div`
  font-size: ${props => props.theme.fontlg};
  color: ${props => props.theme.text};
  text-align: right;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(255, 255, 255, 0.1);

  span {
    color: #4CAF50;
    font-weight: 600;
    margin-left: 1rem;
  }
`;

const CustomerInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }

  label {
    display: block;
    color: #ffb347;
    font-size: ${props => props.theme.fontsm};
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  span {
    color: ${props => props.theme.text};
    font-size: ${props => props.theme.fontmd};
    word-break: break-word;
  }
`;

const Button = styled(motion(Link))`
  display: inline-block;
  padding: 1rem 2.5rem;
  background: linear-gradient(90deg, #ffb347, #ffcc33);
  border: none;
  border-radius: 15px;
  color: #1a1a1a;
  font-size: ${props => props.theme.fontmd};
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  margin-top: 2rem;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(255, 179, 71, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #ffcc33, #ffb347);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 179, 71, 0.4);
  }
`;

const OrderConfirmation = ({ getOrderByNumber }) => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const order = await getOrderByNumber(parseInt(orderNumber));
        if (!order) {
          setError(true);
          return;
        }
        setOrderDetails(order);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber, getOrderByNumber]);

  if (loading) {
    return (
      <PageBackground>
        <LoadingContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <svg viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#ffb347" strokeWidth="5" strokeLinecap="round" />
            <circle cx="25" cy="25" r="20" fill="none" stroke="#ffb34740" strokeWidth="5" strokeDasharray="80" strokeDashoffset="60" />
          </svg>
          <Title>Loading your order...</Title>
          <Subtitle>Just a moment while we fetch your order details</Subtitle>
        </LoadingContainer>
      </PageBackground>
    );
  }

  if (error) {
    return (
      <PageBackground>
        <Container
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Order Not Found</Title>
          <Subtitle>There was an error placing your order. Please try again.</Subtitle>
          <Button to="/products">Back to Products</Button>
        </Container>
      </PageBackground>
    );
  }

  if (!orderDetails) {
    return null;
  }

  const { items, total, customerInfo, orderDate } = orderDetails;

  return (
    <PageBackground>
      <Container
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SuccessIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
        </SuccessIcon>
        <Title>Order Confirmed!</Title>
        <Subtitle>Thank you for shopping with us</Subtitle>

        <OrderNumber>
          <span>Order Reference</span>
          #{orderNumber}
        </OrderNumber>

        <Section>
          <SectionTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"/>
            </svg>
            Order Summary
          </SectionTitle>
          <ItemList>
            {items.map(item => (
              <Item key={item.id}>
                <ItemInfo>
                  <span>{item.name}</span>
                  <ItemQuantity>x {item.quantity}</ItemQuantity>
                </ItemInfo>
                <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
              </Item>
            ))}
          </ItemList>
          <Total>
            Total Amount: <span>${total.toFixed(2)}</span>
          </Total>
        </Section>

        <Section>
          <SectionTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Customer Information
          </SectionTitle>
          <CustomerInfo>
            <InfoItem>
              <label>Name</label>
              <span>{customerInfo.name}</span>
            </InfoItem>
            <InfoItem>
              <label>Email</label>
              <span>{customerInfo.email}</span>
            </InfoItem>
            <InfoItem>
              <label>Phone</label>
              <span>{customerInfo.phone}</span>
            </InfoItem>
            <InfoItem>
              <label>Address</label>
              <span>{customerInfo.address}</span>
            </InfoItem>
            <InfoItem>
              <label>City</label>
              <span>{customerInfo.city}</span>
            </InfoItem>
            <InfoItem>
              <label>ZIP Code</label>
              <span>{customerInfo.zipCode}</span>
            </InfoItem>
          </CustomerInfo>
          {customerInfo.specialInstructions && (
            <InfoItem style={{ marginTop: '1.5rem' }}>
              <label>Special Instructions</label>
              <span>{customerInfo.specialInstructions}</span>
            </InfoItem>
          )}
        </Section>

        <Section>
          <SectionTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            Order Details
          </SectionTitle>
          <InfoItem>
            <label>Order Date</label>
            <span>{new Date(orderDate).toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
          </InfoItem>
        </Section>

        <Button
          to="/products"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue Shopping
        </Button>
      </Container>
    </PageBackground>
  );
};

export default OrderConfirmation;