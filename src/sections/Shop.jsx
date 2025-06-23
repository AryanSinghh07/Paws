import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import img1 from "../assets/Images/T-shite Cover.jpg";
import img2 from "../assets/Images/Dog hoddies cover.jpg";
import img4 from "../assets/Images/Dog harness cover.jpg";
import img5 from "../assets/Images/Dog collar cover.jpg";
import img6 from "../assets/Images/Dog cat leashes cover.jpg";
import img7 from "../assets/Images/Dog and cat beds.jpg";
import img8 from "../assets/Images/Dog and cat toy cover.jpg";
import img9 from "../assets/Images/Dog and cat accessories cover.jpg";

const Section = styled(motion.section)`
  min-height: 100vh;
  height: auto;
  /* width: 80vw; */
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  position: relative;

  /* background-color: orange; */
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: "Kaushan Script";
  font-weight: 300;
  /* text-transform: capitalize; */
  color: ${(props) => props.theme.text};
  text-shadow: 1px 1px 1px ${(props) => props.theme.body};

  position: absolute;
  top: 1rem;
  left: 5%;
  z-index: 11;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Left = styled.div`
  width: 35%;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};

  min-height: 100vh;
  z-index: 10;

  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: ${(props) => props.theme.fontlg};
    font-weight: 300;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 2rem;
  }

  @media (max-width: 64em) {
    p {
      font-size: ${(props) => props.theme.fontmd};
    }
  }

  @media (max-width: 48em) {
    width: 40%;
    p {
      font-size: ${(props) => props.theme.fontsm};
    }
  }
  @media (max-width: 30em) {
    p {
      font-size: ${(props) => props.theme.fontxs};
    }
  }
`;

const ViewAllButton = styled(motion.button)`
  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: ${(props) => props.theme.fontmd};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  text-decoration: none;
  display: inline-block;

  &:hover {
    transform: scale(1.1);
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    border: 1px solid ${(props) => props.theme.text};
  }

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontsm};
    padding: 0.6rem 1.5rem;
  }
`;

const Right = styled.div`
  /* width: 65%; */
  position: absolute;
  left: 35%;
  padding-left: 30%;
  background-color: ${(props) => props.theme.grey};
  min-height: 100vh;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Item = styled(motion.div)`
  display: inline-block;
  width: 20rem;
  /* background-color: black; */
  margin-right: 6rem;
  img {
    width: 100%;
    height: auto;
    cursor: pointer;
  }

  h1 {
    font-weight: 500;
    text-align: center;
    cursor: pointer;
  }

  @media (max-width: 48em) {
    width: 15rem;
  }
`;
const Product = ({ img, title = "" }) => {
  return (
    <Item
      initial={{ filter: "grayscale(100%)" }}
      whileInView={{ filter: "grayscale(0%)" }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: "all" }}
    >
      <img width="400" height="600" src={img} alt={title} />
      <h1>{title}</h1>
    </Item>
  );
};

const Shop = () => {
  gsap.registerPlugin(ScrollTrigger);
  const ref = useRef(null);

  const Horizontalref = useRef(null);

  useLayoutEffect(() => {
    let element = ref.current;

    let scrollingElement = Horizontalref.current;

    let pinWrapWidth = scrollingElement.offsetWidth;
    let t1 = gsap.timeline();

    setTimeout(() => {
      t1.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: `${pinWrapWidth} bottom`,
          scroller: ".App",
          scrub: 1,
          pin: true,
        },
        height: `${scrollingElement.scrollWidth}px`,
        ease: "none",
      });

      t1.to(scrollingElement, {
        scrollTrigger: {
          trigger: scrollingElement,
          start: "top top",
          end: `${pinWrapWidth} bottom`,
          scroller: ".App", 
          scrub: 1,
        },
        x: -pinWrapWidth,

        ease: "none",
      });
      ScrollTrigger.refresh();
    }, 1000);
    ScrollTrigger.refresh();

    return () => {
      t1.kill();
      ScrollTrigger.kill();
    };
  }, []);

  return (
    <Section ref={ref} id="shop">
      <Title data-scroll data-scroll-speed="-1">
        New Collection
      </Title>
      <Left>
        <p>
          Our brand new pet collection is proudly being crafted right here in the India. We use only the highest quality materials, including soft, durable fabrics and pet-safe components, to ensure comfort, style, and safety for your furry friends.
          <br /> <br />
          From stylish pet apparel like cozy jackets, adorable dresses, and trendy paw-wear, to handcrafted pet jewelry and accessories, our collection is designed to help your pets look and feel their best. We're excited to share this unique line with pet lovers across the country—because pets deserve to stand out in style, wherever they go. 🐶🐱✨
        </p>
        <ViewAllButton
          as={Link}
          to="/products"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          View All Products
        </ViewAllButton>
      </Left>
      <Right data-scroll ref={Horizontalref}>
        <Product img={img4} title="Dogs Harness" />
        <Product img={img1} title="Dog T-shirts" />
        <Product img={img2} title="Dog Hoodies" />
        <Product img={img5} title="Dog and Cat Collars" />
        <Product img={img6} title="Dog and Cat Leashes" />
        <Product img={img7} title="Dog and Cat Beds" />
        <Product img={img8} title="Dog and Cat Toys" />
        <Product img={img9} title="Dog and Cat Accessories" />
      </Right>
    </Section>
  );
};

export default Shop;
