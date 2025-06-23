import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

// Import all product images
import img1 from '../assets/Images/new collars.jpg';
import img2 from '../assets/Images/new dress.jpg';
import img3 from '../assets/Images/new food.jpg';
import img4 from '../assets/Images/new toy.jpg';

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  background-color: ${props => props.theme.body};
  padding: 2rem;
`;

const OfferBanner = styled(motion.div)`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #ffb347 0%, #ffcc33 100%);
  border-radius: 20px;
  color: ${props => props.theme.body};
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: shine 3s infinite;
  }

  @keyframes shine {
    to {
      left: 100%;
    }
  }
`;

const OfferText = styled.h2`
  font-family: 'Kaushan Script';
  font-size: ${props => props.theme.fontxl};
  margin-bottom: 0.5rem;

  @media (max-width: 48em) {
    font-size: ${props => props.theme.fontlg};
  }
`;

const OfferSubtext = styled.p`
  font-size: ${props => props.theme.fontmd};
  opacity: 0.9;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontxxxl};
  font-family: 'Kaushan Script';
  color: ${props => props.theme.text};
  text-align: center;
  margin: 2rem 0;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);

  @media (max-width: 64em) {
    font-size: ${props => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${props => props.theme.fontxl};
  }
`;

const FilterContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: ${props => props.active ? 
    'linear-gradient(90deg, #ffb347, #ffcc33)' : 
    'rgba(255, 255, 255, 0.1)'
  };
  border: ${props => props.active ? 
    'none' : 
    '1px solid #ffb347'
  };
  border-radius: 30px;
  color: ${props => props.active ? 
    props.theme.body : 
    '#ffb347'
  };
  font-size: ${props => props.theme.fontmd};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  padding: 2rem 0;
`;

const ProductCard = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 45px 0 rgba(31, 38, 135, 0.3);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${ProductCard}:hover & img {
    transform: scale(1.1);
  }
`;

const DiscountTag = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #ff4e50 0%, #f9d423 100%);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  z-index: 2;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h2`
  font-size: ${props => props.theme.fontlg};
  color: ${props => props.theme.text};
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Price = styled.p`
  font-size: ${props => props.theme.fontmd};
  color: #ffb347;
  font-weight: 600;
`;

const OriginalPrice = styled.span`
  font-size: ${props => props.theme.fontmd};
  color: ${props => props.theme.text};
  text-decoration: line-through;
  opacity: 0.7;
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 0.8rem;
  border-radius: 50%;
  color: ${props => props.theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

// Enhanced product data with discounts and original prices
const products = [
  {
    id: 1,
    name: 'Stylish Pet Collar',
    price: '$24.99',
    originalPrice: '$29.99',
    discount: '17% OFF',
    image: img1,
    category: 'Collars'
  },
  {
    id: 2,
    name: 'Designer Pet Dress',
    price: '$34.99',
    originalPrice: '$44.99',
    discount: '22% OFF',
    image: img2,
    category: 'Dresses'
  },
  {
    id: 3,
    name: 'Premium Pet Food',
    price: '$49.99',
    originalPrice: '$59.99',
    discount: '17% OFF',
    image: img3,
    category: 'Food'
  },
  {
    id: 4,
    name: 'Interactive Pet Toy',
    price: '$19.99',
    originalPrice: '$24.99',
    discount: '20% OFF',
    image: img4,
    category: 'Toys'
  },
  {
    id: 5,
    name: 'Luxury Pet Collar',
    price: '$29.99',
    originalPrice: '$39.99',
    discount: '25% OFF',
    image: img1,
    category: 'Collars'
  },
  {
    id: 6,
    name: 'Summer Pet Dress',
    price: '$39.99',
    originalPrice: '$49.99',
    discount: '20% OFF',
    image: img2,
    category: 'Dresses'
  },
  {
    id: 7,
    name: 'Organic Pet Food',
    price: '$54.99',
    originalPrice: '$69.99',
    discount: '21% OFF',
    image: img3,
    category: 'Food'
  },
  {
    id: 8,
    name: 'Durable Pet Toy',
    price: '$22.99',
    originalPrice: '$27.99',
    discount: '18% OFF',
    image: img4,
    category: 'Toys'
  },
];

const AllNewArrivals = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const categories = ['All', 'Collars', 'Dresses', 'Food', 'Toys'];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleBackClick = () => {
    // Navigate to home page
    navigate('/');
    // Force page reload after a brief delay to ensure navigation completes
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <Section>
      <BackButton
        onClick={handleBackClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
        </svg>
      </BackButton>

      <OfferBanner
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <OfferText>Special Summer Sale! 🌟</OfferText>
        <OfferSubtext>Up to 25% off on all new arrivals - Limited time offer!</OfferSubtext>
      </OfferBanner>

      <Title
        as={motion.h1}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        New Arrivals
      </Title>

      <FilterContainer>
        {categories.map((category) => (
          <FilterButton
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>

      <Container>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ImageContainer>
              <DiscountTag>{product.discount}</DiscountTag>
              <img src={product.image} alt={product.name} />
            </ImageContainer>
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>
                <Price>{product.price}</Price>
                <OriginalPrice>{product.originalPrice}</OriginalPrice>
              </ProductPrice>
            </ProductInfo>
          </ProductCard>
        ))}
      </Container>
    </Section>
  );
};

export default AllNewArrivals; 