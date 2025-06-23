import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { getOrdersByUser } from '../services/api';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import {
  Container,
  Navigation,
  NavItem,
  NavButton,
  Content,
  Title,
  ProfileSection,
  ProfileInfo,
  InfoItem,
  Label,
  Value,
  PetGrid,
  PetCard,
  PetImage,
  PetInfo,
  SettingsGrid,
  SettingCard,
  SettingInfo,
  ToggleSwitch,
  CartGrid,
  CartCard,
  CartActions,
  QuantityControl,
  QuantityButton,
  RemoveButton,
  WishlistGrid,
  WishlistCard,
  WishlistInfo,
  AddToCartButton,
  OrdersGrid,
  OrderCard,
  OrderInfo,
  OrderItems,
  OrderItem,
  OrderTotal,
  OrderStatus,
  EmptyMessage,
  OrderDetails,
  ItemInfo,
  ItemPrice,
  CartInfo
} from '../styles/UserProfile.styles';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaPaw, FaShoppingCart, FaHeart, FaClipboardList, FaCog, FaArrowLeft, FaCreditCard, FaShoppingBag, FaFileAlt, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import AdoptionApplications from '../components/AdoptionApplications';

const UserProfile = ({ userId, addToCart }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [adoptionApplications, setAdoptionApplications] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { scroll } = useLocomotiveScroll();
  const { wishlistedItems, removeFromWishlist } = useWishlist();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  // Sample user data
  const userData = {
    name: 'Aryan Singh',
    email: 'aryan.singhh02@gmail.com',
    phone: '+91 234 567 8900',
    address: 'Lucknow, Uttar Pradesh, India',
    joinDate: 'January 2025',
    role: 'Pet Parent',
    status: 'Active'
  };

  const petProfiles = [
    {
      id: 1,
      name: 'Harry',
      type: 'Dog',
      breed: 'Labrador Retriever',
      age: '3 years',
      image: require('../assets/Images/harry.jpg'),
      weight: '30 kg',
      height: '60 cm',
      gender: 'Male',
      color: 'Golden'
    },
    {
      id: 2,
      name: 'Adda',
      type: 'Cat',
      breed: 'Persian',
      age: '2 years',
      image: require('../assets/Images/adda.jpg'),
      weight: '4 kg',
      height: '25 cm',
      gender: 'Female',
      color: 'White'
    }
  ];

  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    newsletter: false,
    autoReorder: false
  });

  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const wishlistItems = [
    {
      id: 1,
      image: 'https://via.placeholder.com/200',
      name: 'Luxury Pet Bed',
      price: '$89.99'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/200',
      name: 'Designer Pet Dress',
      price: '$34.99'
    }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching orders for user:', userId);
      const response = await getOrdersByUser(userId);
      console.log('Orders response:', response);
      
      if (response.success) {
        // Log each order's structure
        response.orders.forEach((order, index) => {
          console.log(`Order ${index + 1} structure:`, {
            id: order.id || order._id,
            orderNumber: order.orderNumber,
            orderDate: order.orderDate,
            customer: order.customer,
            payment: order.payment,
            items: order.items,
            status: order.status,
            total: order.total,
            deliveryAddress: order.deliveryAddress
          });
        });
        
        setOrders(response.orders);
      } else {
        console.error('Failed to fetch orders:', response.message);
        setError('Failed to load orders. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('An error occurred while loading orders. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [userId, activeTab, fetchOrders]);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleAddToCart = (item) => {
    if (addToCart) {
      addToCart(item);
      removeFromWishlist(item.id);
    } else {
      // If addToCart is not provided, just navigate to the product page
      navigate(`/products`);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Title>My Profile</Title>
            <ProfileSection>
              <ProfileInfo>
                <InfoItem>
                  <Label>
                    <FaUser />
                    Name
                  </Label>
                  <Value>{userData.name}</Value>
                </InfoItem>
                
                <InfoItem>
                  <Label>
                    <FaEnvelope />
                    Email
                  </Label>
                  <Value>{userData.email}</Value>
                </InfoItem>

                <InfoItem>
                  <Label>
                    <FaPhone />
                    Phone
                  </Label>
                  <Value>{userData.phone}</Value>
                </InfoItem>

                <InfoItem>
                  <Label>
                    <FaMapMarkerAlt />
                    Location
                  </Label>
                  <Value>{userData.address}</Value>
                </InfoItem>

                <InfoItem>
                  <Label>
                    <FaCalendarAlt />
                    Member Since
                  </Label>
                  <Value>{userData.joinDate}</Value>
                </InfoItem>

                <InfoItem>
                  <Label>
                    <FaPaw />
                    Role
                  </Label>
                  <Value>{userData.role}</Value>
                </InfoItem>

                <InfoItem>
                  <Label>
                    <FaUser />
                    Status
                  </Label>
                  <Value style={{ 
                    background: userData.status === 'Active' ? 'rgba(72, 187, 120, 0.1)' : 'rgba(245, 101, 101, 0.1)',
                    color: userData.status === 'Active' ? '#2F855A' : '#C53030',
                    borderColor: userData.status === 'Active' ? 'rgba(72, 187, 120, 0.2)' : 'rgba(245, 101, 101, 0.2)'
                  }}>
                    {userData.status}
                  </Value>
                </InfoItem>
              </ProfileInfo>
            </ProfileSection>
          </motion.div>
        );

      case 'pets':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Title>Pet Profiles</Title>
            <PetGrid>
              {petProfiles.map(pet => (
                <PetCard
                  key={pet.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <PetImage src={pet.image} alt={pet.name} />
                  <PetInfo>
                    <h3>{pet.name}</h3>
                    <p><strong>Type:</strong> {pet.type}</p>
                    <p><strong>Breed:</strong> {pet.breed}</p>
                    <p><strong>Gender:</strong> {pet.gender}</p>
                    <p><strong>Age:</strong> {pet.age}</p>
                    <p><strong>Color:</strong> {pet.color}</p>
                    <p><strong>Weight:</strong> {pet.weight}</p>
                    <p><strong>Height:</strong> {pet.height}</p>
                  </PetInfo>
                </PetCard>
              ))}
            </PetGrid>
          </motion.div>
        );

      case 'adoptions':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AdoptionApplications />
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Title>Account Settings</Title>
            <SettingsGrid>
              <SettingCard whileHover={{ scale: 1.02 }}>
                <SettingInfo>
                  <h3>Email Notifications</h3>
                  <p>Get important updates about your pets, appointments, and special offers directly to your inbox</p>
                </SettingInfo>
                <ToggleSwitch
                  active={settings.notifications}
                  onClick={() => toggleSetting('notifications')}
                  whileTap={{ scale: 0.95 }}
                />
              </SettingCard>

              <SettingCard whileHover={{ scale: 1.02 }}>
                <SettingInfo>
                  <h3>Dark Mode</h3>
                  <p>Switch between light and dark theme for a more comfortable viewing experience</p>
                </SettingInfo>
                <ToggleSwitch
                  active={settings.darkMode}
                  onClick={() => toggleSetting('darkMode')}
                  whileTap={{ scale: 0.95 }}
                />
              </SettingCard>

              <SettingCard whileHover={{ scale: 1.02 }}>
                <SettingInfo>
                  <h3>Newsletter Subscription</h3>
                  <p>Receive weekly pet care tips, training guides, and exclusive discounts on pet supplies</p>
                </SettingInfo>
                <ToggleSwitch
                  active={settings.newsletter}
                  onClick={() => toggleSetting('newsletter')}
                  whileTap={{ scale: 0.95 }}
                />
              </SettingCard>

              <SettingCard whileHover={{ scale: 1.02 }}>
                <SettingInfo>
                  <h3>Auto Reorder</h3>
                  <p>Never run out of pet supplies with automatic reordering of your frequently purchased items</p>
                </SettingInfo>
                <ToggleSwitch
                  active={settings.autoReorder}
                  onClick={() => toggleSetting('autoReorder')}
                  whileTap={{ scale: 0.95 }}
                />
              </SettingCard>
            </SettingsGrid>
          </motion.div>
        );

      case 'cart':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Title>Shopping Cart</Title>
            {cartItems.length > 0 ? (
              <>
                <CartGrid>
                  {cartItems.map((item) => (
                    <CartCard
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img src={item.image} alt={item.name} />
                      <CartInfo>
                        <h3>{item.name}</h3>
                        <p>${item.price.toFixed(2)}</p>
                        <CartActions>
                          <QuantityControl>
                            <QuantityButton
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              -
                            </QuantityButton>
                            <span>{item.quantity}</span>
                            <QuantityButton
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              +
                            </QuantityButton>
                          </QuantityControl>
                          <RemoveButton
                            onClick={() => removeFromCart(item.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Remove
                          </RemoveButton>
                        </CartActions>
                      </CartInfo>
                    </CartCard>
                  ))}
                </CartGrid>
                <OrderTotal>
                  <h3>Total: ${getCartTotal().toFixed(2)}</h3>
                  <AddToCartButton
                    onClick={() => navigate('/checkout')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Proceed to Checkout
                  </AddToCartButton>
                </OrderTotal>
              </>
            ) : (
              <EmptyMessage>
                <FaShoppingCart size={48} />
                <p>Your cart is empty</p>
                <motion.button
                  onClick={() => navigate('/products')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Products
                </motion.button>
              </EmptyMessage>
            )}
          </motion.div>
        );

      case 'wishlist':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Title>My Wishlist</Title>
            {wishlistedItems.length > 0 ? (
              <WishlistGrid>
                {wishlistedItems.map((item) => (
                  <WishlistCard
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img src={item.image} alt={item.name} />
                    <WishlistInfo>
                      <h3>{item.name}</h3>
                      <p>${item.price.toFixed(2)}</p>
                      <CartActions>
                        <AddToCartButton
                          onClick={() => handleAddToCart(item)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {addToCart ? 'Move to Cart' : 'View Product'}
                        </AddToCartButton>
                        <RemoveButton
                          onClick={() => removeFromWishlist(item.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Remove
                        </RemoveButton>
                      </CartActions>
                    </WishlistInfo>
                  </WishlistCard>
                ))}
              </WishlistGrid>
            ) : (
              <EmptyMessage>
                <FaHeart size={48} />
                <p>Your wishlist is empty</p>
                <motion.button
                  onClick={() => navigate('/products')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Products
                </motion.button>
              </EmptyMessage>
            )}
          </motion.div>
        );

      case 'orders':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Title>Your Orders</Title>
            <OrdersGrid>
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ textAlign: 'center', padding: '2rem' }}
                >
                  <FaSpinner style={{ fontSize: '2rem', marginBottom: '1rem', animation: 'spin 1s linear infinite' }} />
                  <p>Loading your orders...</p>
                </motion.div>
              ) : error ? (
                <EmptyMessage>
                  <FaExclamationCircle size={48} color="#ff4444" />
                  <h3>Error Loading Orders</h3>
                  <p>{error}</p>
                  <motion.button
                    onClick={() => {
                      setError(null);
                      setLoading(true);
                      fetchOrders();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try Again
                  </motion.button>
                </EmptyMessage>
              ) : orders && orders.length > 0 ? (
                orders.map((order) => (
                  <OrderCard
                    key={order.id || order._id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <OrderInfo>
                      <OrderDetails>
                        <h3>Order #{order.orderNumber || order.id || 'N/A'}</h3>
                        <p>
                          <FaCalendarAlt />
                          {order.orderDate ? formatDate(order.orderDate) : 'Date not available'}
                        </p>
                        <p>
                          <FaMapMarkerAlt />
                          {order.deliveryAddress || (order.customer && `${order.customer.address}, ${order.customer.city}, ${order.customer.state} ${order.customer.zipCode}`) || 'Address not available'}
                        </p>
                        <p>
                          <FaCreditCard />
                          {order.payment ? (
                            order.payment.method ? (
                              order.payment.method === 'Credit Card' ? 
                                `Card ending in ${order.payment.cardNumber}` : 
                                order.payment.method
                            ) : (
                              order.payment.cardNumber ? 
                                `Card ending in ${order.payment.cardNumber}` : 
                                'Payment Processed'
                            )
                          ) : (
                            'Payment Processed'
                          )}
                        </p>
                      </OrderDetails>
                      <OrderStatus status={order.status || 'Processing'}>
                        {order.status || 'Processing'}
                      </OrderStatus>
                    </OrderInfo>

                    <OrderItems>
                      {(order.items || []).map((item) => (
                        <OrderItem key={item.id || item._id}>
                          <img 
                            src={item.image || 'https://via.placeholder.com/80'} 
                            alt={item.name || 'Product'} 
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/80';
                            }}
                          />
                          <ItemInfo>
                            <h4>{item.name || 'Product Name Not Available'}</h4>
                            <p>Quantity: {item.quantity || 1}</p>
                          </ItemInfo>
                          <ItemPrice>
                            ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                          </ItemPrice>
                        </OrderItem>
                      ))}
                    </OrderItems>

                    <OrderTotal>
                      <span>Total Amount</span>
                      <strong>${(order.total || 0).toFixed(2)}</strong>
                    </OrderTotal>
                  </OrderCard>
                ))
              ) : (
                <EmptyMessage>
                  <FaShoppingBag size={48} />
                  <h3>No Orders Yet</h3>
                  <p>
                    You haven't placed any orders yet. Start shopping for your
                    furry friend!
                  </p>
                  <motion.button
                    onClick={() => navigate('/products')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse Products
                  </motion.button>
                </EmptyMessage>
              )}
            </OrdersGrid>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <Navigation>
        <NavItem>
          <NavButton onClick={handleBackClick}>
            <FaArrowLeft />
            Back
          </NavButton>
        </NavItem>

        <NavItem>
          <NavButton
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaUser />
            Profile
          </NavButton>
        </NavItem>

        <NavItem>
          <NavButton
            active={activeTab === 'pets'}
            onClick={() => setActiveTab('pets')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaPaw />
            Pets
          </NavButton>
        </NavItem>

        <NavItem>
          <NavButton
            active={activeTab === 'orders'}
            onClick={() => setActiveTab('orders')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaClipboardList />
            Orders
          </NavButton>
        </NavItem>

        <NavItem>
          <NavButton
            active={activeTab === 'cart'}
            onClick={() => setActiveTab('cart')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaShoppingCart />
            Cart
          </NavButton>
        </NavItem>

        <NavItem>
          <NavButton
            active={activeTab === 'wishlist'}
            onClick={() => setActiveTab('wishlist')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaHeart />
            Wishlist
          </NavButton>
        </NavItem>

        <NavItem>
          <NavButton
            active={activeTab === 'adoptions'}
            onClick={() => setActiveTab('adoptions')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaFileAlt />
            Adoption Applications
          </NavButton>
        </NavItem>

        <NavItem>
          <NavButton
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaCog />
            Settings
          </NavButton>
        </NavItem>
      </Navigation>
      
      <Content>
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </Content>
    </Container>
  );
};

export default UserProfile; 