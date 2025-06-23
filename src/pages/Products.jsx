import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

// Import product images
import img1 from "../assets/Images/T-shite Cover.jpg";
import img2 from "../assets/Images/Dog hoddies cover.jpg";
import img4 from "../assets/Images/Dog harness cover.jpg";
import img5 from "../assets/Images/Dog collar cover.jpg";
import img6 from "../assets/Images/Dog cat leashes cover.jpg";
import img7 from "../assets/Images/Dog and cat beds.jpg";
import img8 from "../assets/Images/Dog and cat toy cover.jpg";
import img9 from "../assets/Images/Dog and cat accessories cover.jpg";

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
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);

  @media (max-width: 64em) {
    font-size: ${props => props.theme.fontxxl};
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 3rem;
`;

const SearchBar = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  margin: 0 auto 2rem;
  position: relative;

  input {
    width: 100%;
    padding: 1rem 3rem 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 25px;
    color: ${props => props.theme.text};
    font-size: ${props => props.theme.fontmd};
    backdrop-filter: blur(5px);

    &:focus {
      outline: none;
      border-color: #ffb347;
      background: rgba(255, 255, 255, 0.1);
    }
  }

  svg {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    color: ${props => props.theme.text};
    opacity: 0.5;
  }
`;

const FiltersGroup = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const FilterButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: ${props => props.active ? 
    'linear-gradient(90deg, #ffb347, #ffcc33)' : 
    'rgba(255, 255, 255, 0.05)'
  };
  border: ${props => props.active ? 
    'none' : 
    '1px solid rgba(255, 255, 255, 0.2)'
  };
  border-radius: 25px;
  color: ${props => props.active ? props.theme.body : props.theme.text};
  font-size: ${props => props.theme.fontmd};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? 
      'linear-gradient(90deg, #ffcc33, #ffb347)' : 
      'rgba(255, 255, 255, 0.1)'
    };
    transform: translateY(-2px);
  }
`;

const ProductsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProductCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.3);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 280px;
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

const ProductInfo = styled.div`
  padding: 1.5rem;
  color: ${props => props.theme.text};
`;

const ProductName = styled.h3`
  font-size: ${props => props.theme.fontlg};
  font-family: 'Kaushan Script';
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.div`
  font-size: ${props => props.theme.fontmd};
  color: #ffb347;
  margin: 0.5rem 0;
  font-weight: 600;
`;

const ProductDescription = styled.p`
  font-size: ${props => props.theme.fontsm};
  opacity: 0.8;
  margin: 0.5rem 0;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Detail = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: ${props => props.theme.fontsm};
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const AddToCartButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(90deg, #ffb347, #ffcc33);
  border: none;
  border-radius: 15px;
  color: ${props => props.theme.body};
  font-size: ${props => props.theme.fontmd};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #ffcc33, #ffb347);
    transform: translateY(-2px);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const BackButton = styled(motion.button)`
  position: fixed;
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

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const WishlistButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  svg {
    width: 24px;
    height: 24px;
    color: ${props => props.isWishlisted ? '#ff4b4b' : props.theme.text};
    transition: all 0.3s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const products = [
  {
    id: 1,
    name: "Paws T-Shirt",
    price: 29.99,
    image: img1,
    description: "Comfortable cotton t-shirt with cute paw prints design",
    category: "Apparel",
    details: ["100% Cotton", "Machine Washable", "Sizes: S-XXL"]
  },
  {
    id: 2,
    name: "Dog Hoodie",
    price: 34.99,
    image: img2,
    description: "Warm and cozy hoodie for your furry friend",
    category: "Apparel",
    details: ["Fleece Material", "Machine Washable", "Various Sizes"]
  },
  {
    id: 3,
    name: "Dog Harness",
    price: 24.99,
    image: img4,
    description: "Comfortable and secure harness for daily walks",
    category: "Accessories",
    details: ["Adjustable", "Reflective", "Padded"]
  },
  {
    id: 4,
    name: "Dog Collar",
    price: 14.99,
    image: img5,
    description: "Stylish and durable collar with quick-release buckle",
    category: "Accessories",
    details: ["Adjustable", "Waterproof", "Multiple Colors"]
  },
  {
    id: 5,
    name: "Pet Leash",
    price: 19.99,
    image: img6,
    description: "Strong and comfortable leash for dogs and cats",
    category: "Accessories",
    details: ["6ft Length", "Padded Handle", "Reflective"]
  },
  {
    id: 6,
    name: "Pet Bed",
    price: 49.99,
    image: img7,
    description: "Soft and cozy bed for your pet's comfort",
    category: "Furniture",
    details: ["Machine Washable", "Non-slip Bottom", "Multiple Sizes"]
  },
  {
    id: 7,
    name: "Pet Toys Bundle",
    price: 29.99,
    image: img8,
    description: "Set of interactive toys for dogs and cats",
    category: "Toys",
    details: ["Non-toxic", "Durable", "Various Types"]
  },
  {
    id: 8,
    name: "Pet Accessories Set",
    price: 39.99,
    image: img9,
    description: "Complete set of essential pet accessories",
    category: "Accessories",
    details: ["Grooming Tools", "Bowls", "Storage Bag"]
  }
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const handleAddToCart = (product) => {
    addToCart(product);
    // Show feedback to user
    const button = document.getElementById(`add-to-cart-${product.id}`);
    if (button) {
      button.textContent = 'Added!';
      setTimeout(() => {
        button.textContent = 'Add to Cart';
      }, 1500);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
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

      <Container>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Pet Products
        </Title>

        <FilterContainer>
          <SearchBar
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </SearchBar>

          <FiltersGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {categories.map(category => (
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
          </FiltersGroup>
        </FilterContainer>

        <ProductsGrid
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProductImage>
                <WishlistButton
                  onClick={() => toggleWishlist(product)}
                  isWishlisted={isInWishlist(product.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill={isInWishlist(product.id) ? "currentColor" : "none"} 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                </WishlistButton>
                <img src={product.image} alt={product.name} />
              </ProductImage>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductDetails>
                  {product.details.map((detail, index) => (
                    <Detail key={index}>{detail}</Detail>
                  ))}
                </ProductDetails>
                <AddToCartButton
                  id={`add-to-cart-${product.id}`}
                  onClick={() => handleAddToCart(product)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Cart
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      </Container>
    </Section>
  );
};

export default Products; 