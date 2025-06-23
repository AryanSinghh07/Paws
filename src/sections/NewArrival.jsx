import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, {  useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import img1 from '../assets/Images/new collars.jpg';
import img2 from '../assets/Images/new dress.jpg';
import img3 from '../assets/Images/new food.jpg';
import img4 from '../assets/Images/new toy.jpg';

const Section = styled.section`
  min-height: 100vh;
  /* height: auto; */
  width: 100%;
  margin: 0 auto;
  /* height: 300vh; */

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  /* background-color: ${(props) => props.theme.text}; */
`;

const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 90vh;
  box-shadow: 0 0 0 5vw ${(props) => props.theme.text};
  border: 3px solid black;
  z-index: 11;
  pointer-events: none;

  @media (max-width: 70em) {
  width: 40vw;
    height: 80vh;
  }
  @media (max-width: 64em) {
  width: 50vw;
  box-shadow: 0 0 0 60vw ${(props) => props.theme.text};
    height: 80vh;
  }
  @media (max-width: 48em) {
  width: 60vw;
    height: 80vh;
  }
  @media (max-width: 30em) {
  width: 80vw;
    height: 60vh;
  }
`;

const Container = styled.div`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 25vw;
  height: auto;
  /* background-color: yellow; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 64em) {
  width: 30vw;


  }
  @media (max-width: 48em) {
  width: 40vw;

  }
  @media (max-width: 30em) {
  width: 60vw;

  }
`;

const Title = styled(motion.h1)`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: 'Kaushan Script';
  font-weight: 300;
  /* text-transform: capitalize; */
  color: ${(props) => props.theme.body};
  text-shadow: 1px 1px 1px ${(props) => props.theme.text};

  position: absolute;
  top: 2rem;
  left: 1rem;
  z-index: 15;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};


  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  
  }
`;
const Text = styled.div`
  width: 20%;
  font-size: ${(props) => props.theme.fontlg};
  font-weight: 300;
  position: absolute;
  padding: 2rem;
  top: 0;
  right: 0;
  z-index: 11;

  @media (max-width: 48em) {
    display: none;
  
  }
 
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5rem 0;

  h2 {
  }

  img {
    width: 100%;
    height: auto;
    z-index: 5;
  }
`;
const Photos = ({ img, name }) => {
  return (
    <Item>
      <img width="400" height="600" src={img} alt={name} />
      <h2>{name}</h2>
    </Item>
  );
};

const ViewNewArrivalButton = styled(motion.button)`
  background: linear-gradient(90deg, #ffb347, #ffcc33, #ffb347, #ffcc33);
  background-size: 200% 200%;
  color: ${(props) => props.theme.body};
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-size: ${(props) => props.theme.fontxl};
  font-family: 'Kaushan Script', cursive;
  font-weight: 600;
  cursor: pointer;
  margin-top: 2.5rem;
  box-shadow: 0 4px 24px 0 rgba(255, 204, 51, 0.4), 0 1.5px 6px 0 rgba(255, 179, 71, 0.3);
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  animation: gradientMove 3s ease-in-out infinite;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;

  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  &:hover {
    transform: scale(1.08) rotate(-1deg);
    box-shadow: 0 8px 32px 0 rgba(255, 204, 51, 0.6), 0 3px 12px 0 rgba(255, 179, 71, 0.5);
    background: linear-gradient(90deg, #ffcc33, #ffb347, #ffcc33, #ffb347);
    background-size: 200% 200%;
    filter: brightness(1.1) saturate(1.2);
  }

  &:active {
    transform: scale(0.98);
    filter: brightness(0.95);
  }

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontlg};
    padding: 0.8rem 1.5rem;
  }
`;

const NewArrival = () => {
   gsap.registerPlugin(ScrollTrigger);
  const ref = useRef(null);

  const ScrollingRef = useRef(null);


  useLayoutEffect(() => {
    let element = ref.current;

    let scrollingElement = ScrollingRef.current;
let t1= gsap.timeline();
    setTimeout(() => {
      let mainHeight = scrollingElement.scrollHeight;
      element.style.height = `calc(${mainHeight / 4}px)`;
      t1.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top top',
          end: 'bottom+=100% top-=100%',
          scroller: '.App',
          scrub: 1,
          pin: true,
        },
        ease: 'none',
      });

      t1.fromTo(
        scrollingElement,
        {
          y: '0',
        },
        {
          y: '-100%',
          scrollTrigger: {
            trigger: scrollingElement,
            start: 'top top',
            end: 'bottom top',
            scroller: '.App',
            scrub: 1,
          },
        },
      );

      ScrollTrigger.refresh();
    }, 1000);
    ScrollTrigger.refresh();

    return () => {
      t1.kill();
      ScrollTrigger.kill();
    };
  }, []);

  return (
    <Section  ref={ref} id="fixed-target" className="new-arrival">
      <Overlay />

      <Title
        data-scroll data-scroll-speed="-2" data-scroll-direction="horizontal"
      >
        New Arrivals
      </Title>

      <Container ref={ScrollingRef}>
        <Photos img={img1} name="Collars" />
        <Photos img={img2} name="Cool Dresses" />
        <Photos img={img3} name="Food" />
        <Photos img={img4} name="Toys" />
        <Link to="/new-arrivals">
          <ViewNewArrivalButton
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.6 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            View All New Arrivals
          </ViewNewArrivalButton>
        </Link>
      </Container>

      <Text data-scroll data-scroll-speed="-4">
        Our latest collection of cool pet apparel is here—designed for pets of all shapes and sizes! Whether you're looking to fetch a bold new look or something comfy for everyday tail-wagging adventures, this collection has it all.
        <br />
        <br />
        The first lineup features stylish pieces for dapper dogs, and we've also added three adorable new styles for fabulous felines. From trendy tees to cozy sweaters, there's something to match every pet's personality.
        <br />
        <br />
        Sniff it out and treat yourself to a whole new look—because pets deserve fashion too! 
      </Text>
    </Section>
  );
};

export default NewArrival;
