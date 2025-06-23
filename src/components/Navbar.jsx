import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const NavContainer = styled(motion.div)`
  position: absolute;
  /* left: 50%; */
  top: ${(props) => (props.click ? '0' : `-${props.theme.navHeight}`)};
  transition: all 0.3s ease;
  /* transform: translateX(-50%); */
  z-index: 6;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;

  
  @media (max-width: 40em) {
    top: ${(props) => (props.click ? '0' : `calc(-50vh - 4rem)`)};

  }
`;

const MenuBtn = styled.li`
  background-color: ${(props) => `rgba(${props.theme.textRgba},0.7)`};
  color: ${(props) => props.theme.body};
  width: 15rem;
  height: 2.5rem;

  border: none;
  outline: none;

  clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);

  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);

  font-size: ${(props) => props.theme.fontmd};
  font-weight: 600;

  /* border-end-start-radius: 50%; */

  /* border-end-end-radius: 50%; */

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.3s ease;

  @media (max-width: 40em) {
    width: 10rem;
    height: 2rem;

  }
`;

const MenuItems = styled(motion.ul)`
  position: relative;
  height: ${(props) => props.theme.navHeight};
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;

  width: 100%;
  padding: 0 10rem;

  @media (max-width: 40em) {
    flex-direction:column;
    padding:2rem 0;
    height: 50vh;
  }
`;

const Item = styled(motion.li)`
  text-transform: uppercase;
  color: ${(props) => props.theme.text};

  @media (max-width: 40em) {
    flex-direction:column;
    padding:0.5rem 0;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 2rem;

  @media (max-width: 40em) {
    flex-direction: column;
    margin-left: 0;
    gap: 0.5rem;
  }
`;

const AuthButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  background: ${props => props.variant === 'filled' 
    ? 'linear-gradient(90deg, #ffb347, #ffcc33)'
    : 'transparent'
  };
  border: ${props => props.variant === 'filled' 
    ? 'none'
    : '1px solid #ffb347'
  };
  border-radius: 20px;
  color: ${props => props.variant === 'filled' 
    ? props.theme.body
    : '#ffb347'
  };
  font-size: ${props => props.theme.fontmd};
  cursor: pointer;
  text-transform: uppercase;
`;

const ProfileItem = styled(motion.li)`
  text-transform: uppercase;
  color: ${(props) => props.theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 2rem;

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 40em) {
    margin-left: 0;
    padding: 0.5rem 0;
  }
`;

const CartIcon = styled(motion.div)`
  position: relative;
  cursor: pointer;
  margin-left: 1rem;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ffb347;
  color: ${props => props.theme.body};
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
`;

const Navbar = ({ cartItems = [] }) => {
  const [click, setClick] = useState(false);
  const location = useLocation();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const { scroll } = useLocomotiveScroll();

  const handleScroll = (id) => {
    let elem = document.querySelector(id);
    setClick(!click);
    scroll.scrollTo(elem, {
      offset: '-100',
      duration: '2000',
      easing: [0.25, 0.0, 0.35, 1.0],
    });
  };

  return (
    <NavContainer
      click={+click}
      initial={{ y: `-100%` }}
      animate={{ y: 0 }}
      transition={{ duration: 2, delay: 5 }}
    >
      <MenuItems
        drag="y"
        dragConstraints={{ top: 0, bottom: 70 }}
        dragElastic={0.05}
        dragSnapToOrigin
      >
        <MenuBtn onClick={() => setClick(!click)}>
          <span>MENU</span>
        </MenuBtn>
        <Item
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9, y: 0 }}
          onClick={() => handleScroll('#home')}
        >
          <Link to="/">Home</Link>
        </Item>
        <Item
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9, y: 0 }}
          onClick={() => handleScroll('.about')}
        >
          <Link to="/">about</Link>
        </Item>
        <Item
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9, y: 0 }}
          onClick={() => handleScroll('#shop')}
        >
          <Link to="/">shop</Link>
        </Item>
        <Item
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9, y: 0 }}
          onClick={() => handleScroll('.new-arrival')}
        >
          <Link to="/">new arrival</Link>
        </Item>
        <Item
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9, y: 0 }}
          onClick={() => handleScroll('#feed-adopt')}
        >
          <Link to="/">feed & adopt</Link>
        </Item>
        <ProfileItem
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9, y: 0 }}
        >
          <Link to="/profile">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </ProfileItem>
        <Item
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9, y: 0 }}
          onClick={() => handleScroll('#cart')}
        >
          <Link to="/cart">
            <CartIcon
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
              {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
            </CartIcon>
          </Link>
        </Item>
      </MenuItems>
    </NavContainer>
  );
};

export default Navbar;
