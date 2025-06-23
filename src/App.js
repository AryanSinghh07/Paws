import "locomotive-scroll/dist/locomotive-scroll.css";

import { AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { ThemeProvider } from "styled-components";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { saveOrder, getOrder } from "./services/api";

import Loader from "./components/Loader";
import ScrollTriggerProxy from "./components/ScrollTriggerProxy";
import About from "./sections/About";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Marquee from "./sections/Marquee";
import NewArrival from "./sections/NewArrival";
import Shop from "./sections/Shop";
import FeedAndAdopt from "./sections/FeedAndAdopt";
import Community from "./sections/Community";
import AllNewArrivals from "./pages/AllNewArrivals";
import UserProfile from "./pages/UserProfile";
import AdoptionForm from "./pages/AdoptionForm";
import AvailablePets from "./pages/AvailablePets";
import Products from "./pages/Products";
import Cart from "./components/Cart";
import OrderConfirmation from "./components/OrderConfirmation";
import Forum from "./pages/Forum";
import SuccessStories from "./pages/SuccessStories";
import PetCareTips from "./pages/PetCareTips";
import Events from "./pages/Events";
import Volunteer from "./pages/Volunteer";
import Checkout from "./pages/Checkout";
import GlobalStyles from "./styles/GlobalStyles";
import { dark } from "./styles/Themes";
import Navbar from "./components/Navbar";
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

const HomePage = ({ containerRef }) => (
  <main className="App" data-scroll-container ref={containerRef}>
    <Home key="home" />
    <About key="about" />
    <Shop key="Shop" />
    <Marquee key="marquee" />
    <NewArrival key="new arrival" />
    <FeedAndAdopt key="feed-adopt" />
    <Community key="community" />
    <Footer key="Footer" />
  </main>
);

function App() {
  const containerRef = useRef(null);
  const [Loaded, setLoaded] = useState(false);
  const location = useLocation();
  const [userId, setUserId] = useState(localStorage.getItem('userId') || 'default_user');

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <CartProvider>
      <WishlistProvider>
        <GlobalStyles />
        <ThemeProvider theme={dark}>
          {isHomePage ? (
            <LocomotiveScrollProvider
              options={{
                smooth: true,
                smartphone: {
                  smooth: true,
                },
                tablet: {
                  smooth: true,
                },
              }}
              containerRef={containerRef}
            >
              <AnimatePresence>{Loaded ? null : <Loader />}</AnimatePresence>
              <ScrollTriggerProxy />
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<HomePage containerRef={containerRef} />} />
                </Routes>
              </AnimatePresence>
            </LocomotiveScrollProvider>
          ) : (
            <>
              <Navbar />
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/new-arrivals" element={<AllNewArrivals />} />
                  <Route path="/profile" element={<UserProfile userId={userId} />} />
                  <Route path="/adoption-form" element={<AdoptionForm />} />
                  <Route path="/available-pets" element={<AvailablePets />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation getOrderByNumber={getOrder} />} />
                  <Route path="/forum" element={<Forum />} />
                  <Route path="/success-stories" element={<SuccessStories />} />
                  <Route path="/pet-care-tips" element={<PetCareTips />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/volunteer" element={<Volunteer />} />
                </Routes>
              </AnimatePresence>
            </>
          )}
        </ThemeProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
