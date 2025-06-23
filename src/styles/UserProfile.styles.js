import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2.5rem;
  padding: 0 2rem;
  min-height: 90vh;
  background: #f8f9fa;
  border-radius: 30px;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1.5rem;
  }
`;

export const Navigation = styled.nav`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 24px;
  padding: 1.5rem;
  height: fit-content;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.4);
  position: sticky;
  top: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    z-index: 1000;
    border-radius: 24px 24px 0 0;
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    background: #ffffff;
  }
`;

export const NavItem = styled(motion.li)`
  list-style: none;
  margin-bottom: 0.8rem;
  
  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 0;
    flex: 1;
    margin: 0 0.3rem;
  }
`;

export const NavButton = styled(motion.button)`
  width: 100%;
  padding: 1.2rem 1.4rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${props => props.active ? 'linear-gradient(135deg, #FFB347 0%, #FFCC33 100%)' : '#ffffff'};
  border: 1px solid ${props => props.active ? 'transparent' : '#e0e0e0'};
  border-radius: 16px;
  color: ${props => props.active ? '#000000' : '#2d3436'};
  font-size: 1.1rem;
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 4px 12px rgba(255, 179, 71, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)'};

  svg {
    width: 22px;
    height: 22px;
    color: ${props => props.active ? '#000000' : '#666666'};
  }

  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #FFB347 0%, #FFCC33 100%)' : '#f8f9fa'};
    color: ${props => props.active ? '#000000' : '#FFB347'};
    transform: translateX(5px);
    box-shadow: ${props => props.active ? '0 6px 16px rgba(255, 179, 71, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.08)'};

    svg {
      color: ${props => props.active ? '#000000' : '#FFB347'};
    }
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.8rem;
    border-radius: 12px;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      transform: translateY(-5px);
    }
  }
`;

export const Content = styled.main`
  background: #ffffff;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 600px;
  overflow: auto;
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  color: #1a1a1a;
  margin-bottom: 2.5rem;
  font-weight: 700;
  position: relative;
  padding-bottom: 1rem;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, #FFB347 0%, #FFCC33 100%);
    border-radius: 2px;
  }
`;

export const ProfileSection = styled.div`
  padding: 2rem;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  max-width: 800px;
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    background: #ffffff;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const Label = styled.span`
  font-size: 1.2rem;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 600;

  svg {
    width: 24px;
    height: 24px;
    color: #FFB347;
  }
`;

export const Value = styled.span`
  font-size: 1.1rem;
  color: #1a1a1a;
  font-weight: 500;
  background: #ffffff;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  min-width: 220px;
  text-align: center;
  border: 2px solid rgba(255, 179, 71, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

export const PetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0.5rem;
  }
`;

export const PetCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  }
`;

export const PetImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

export const PetInfo = styled.div`
  padding: 2rem;
  background: #ffffff;

  h3 {
    font-size: 1.8rem;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
    font-weight: 700;
    border-bottom: 3px solid #FFB347;
    padding-bottom: 0.5rem;
    display: inline-block;
  }

  p {
    font-size: 1.2rem;
    color: #2d3436;
    margin-bottom: 1.2rem;
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);

    strong {
      color: #1a1a1a;
      font-weight: 600;
      min-width: 100px;
    }

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
  }
`;

export const SettingsGrid = styled.div`
  display: grid;
  gap: 2rem;
  padding: 1.5rem;
`;

export const SettingCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    background: #f8f9fa;
  }
`;

export const SettingInfo = styled.div`
  h3 {
    font-size: 1.4rem;
    color: #1a1a1a;
    margin-bottom: 0.8rem;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
    color: #2d3436;
    max-width: 80%;
    line-height: 1.5;
  }
`;

export const ToggleSwitch = styled(motion.button)`
  width: 70px;
  height: 36px;
  background: ${props => props.active ? 
    'linear-gradient(135deg, #FFB347 0%, #FFCC33 100%)' : 
    '#e0e0e0'};
  border-radius: 18px;
  padding: 4px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #ffffff;
    left: ${props => props.active ? 'calc(100% - 32px)' : '4px'};
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

export const CartGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

export const CartCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2rem;
  transition: all 0.3s ease;

  img {
    width: 100px;
    height: 100px;
    border-radius: 15px;
    object-fit: cover;
    border: 2px solid rgba(255, 179, 71, 0.3);
  }

  h3 {
    font-size: 1.2rem;
    color: #FFFFFF;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
    color: #FFB347;
    font-weight: 600;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateX(5px);
  }
`;

export const CartActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.8rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  span {
    color: #FFFFFF;
    font-weight: 600;
    min-width: 30px;
    text-align: center;
  }
`;

export const QuantityButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  color: #FFFFFF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const RemoveButton = styled(motion.button)`
  background: rgba(255, 68, 68, 0.1);
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  color: #FF4444;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: rgba(255, 68, 68, 0.2);
  }
`;

export const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

export const WishlistCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  h3 {
    padding: 1.2rem 1.2rem 0.8rem;
    font-size: 1.1rem;
    color: #FFFFFF;
    font-weight: 600;
  }

  p {
    padding: 0 1.2rem 1.2rem;
    font-size: 1.1rem;
    color: #FFB347;
    font-weight: 600;
  }

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

export const AddToCartButton = styled(motion.button)`
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, #FFB347 0%, #FFCC33 100%);
  border: none;
  color: #1A1A1A;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

export const OrdersGrid = styled.div`
  display: grid;
  gap: 2rem;
  padding: 1.5rem;
`;

export const OrderCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  }
`;

export const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const OrderDetails = styled.div`
  h3 {
    font-size: 1.4rem;
    color: #1a1a1a;
    margin-bottom: 0.8rem;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
    color: #666666;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: #FFB347;
    }
  }
`;

export const OrderStatus = styled.span`
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  background: ${props => {
    switch (props.status?.toLowerCase()) {
      case 'delivered':
        return 'rgba(72, 187, 120, 0.1)';
      case 'processing':
        return 'rgba(66, 153, 225, 0.1)';
      case 'cancelled':
        return 'rgba(245, 101, 101, 0.1)';
      default:
        return 'rgba(160, 174, 192, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.status?.toLowerCase()) {
      case 'delivered':
        return '#2F855A';
      case 'processing':
        return '#2B6CB0';
      case 'cancelled':
        return '#C53030';
      default:
        return '#4A5568';
    }
  }};
  border: 1px solid ${props => {
    switch (props.status?.toLowerCase()) {
      case 'delivered':
        return 'rgba(72, 187, 120, 0.2)';
      case 'processing':
        return 'rgba(66, 153, 225, 0.2)';
      case 'cancelled':
        return 'rgba(245, 101, 101, 0.2)';
      default:
        return 'rgba(160, 174, 192, 0.2)';
    }
  }};
`;

export const OrderItems = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export const OrderItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 16px;
  transition: all 0.3s ease;

  img {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    grid-template-columns: auto 1fr;
    gap: 1rem;
    padding: 1rem;

    img {
      width: 60px;
      height: 60px;
    }
  }
`;

export const ItemInfo = styled.div`
  h4 {
    font-size: 1.2rem;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    color: #666666;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const ItemPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a1a1a;

  @media (max-width: 768px) {
    grid-column: 2;
    justify-self: end;
  }
`;

export const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  span {
    font-size: 1.2rem;
    color: #1a1a1a;
    font-weight: 600;
  }

  strong {
    font-size: 1.4rem;
    color: #FFB347;
    font-weight: 700;
  }
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 20px;
  border: 2px dashed rgba(0, 0, 0, 0.1);

  svg {
    width: 64px;
    height: 64px;
    color: #FFB347;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.6rem;
    color: #1a1a1a;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
    color: #666666;
    max-width: 400px;
    margin: 0 auto;
  }
`;

export const WishlistInfo = styled.div`
  padding: 1rem;
  flex: 1;

  h3 {
    font-size: ${props => props.theme.fontlg};
    margin-bottom: 0.5rem;
    color: ${props => props.theme.text};
  }

  p {
    font-size: ${props => props.theme.fontmd};
    color: #ffb347;
    margin-bottom: 1rem;
  }
`;

export const CartInfo = styled.div`
  padding: 1rem;
  flex: 1;

  h3 {
    font-size: ${props => props.theme.fontlg};
    margin-bottom: 0.5rem;
    color: ${props => props.theme.text};
  }

  p {
    font-size: ${props => props.theme.fontmd};
    color: #ffb347;
    margin-bottom: 1rem;
  }
`;

export const LoadingSpinner = styled(motion.div)`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  svg {
    animation: spin 1s linear infinite;
    color: #FFB347;
  }
`; 