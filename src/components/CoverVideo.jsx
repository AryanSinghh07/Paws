import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import MainVideo1 from "../assets/video1.mp4";
import MainVideo2 from "../assets/video2.mp4";
import MainVideo3 from "../assets/video3.mp4";
import MainVideo4 from "../assets/video4.mp4";

const VideoContainer = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 1s ease-in-out;

    &.active {
      opacity: 1;
    }

    @media (max-width: 48em) {
      object-position: center 10%;
    }
    @media (max-width: 30em) {
      object-position: center 50%;
    }
  }
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: ${(props) => `rgba(${props.theme.bodyRgba},0.6)`};
`;

const Title = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.text};

  div {
    display: flex;
    flex-direction: row;
  }

  h1 {
    font-family: "Kaushan Script";
    font-size: ${(props) => props.theme.fontBig};

    text-shadow: 1px 1px 1px ${(props) => props.theme.body};

    @media (max-width: 30em) {
      /* font-size: ${(props) => props.theme.fontxxxl}; */
      font-size: calc(5rem + 8vw);
    }
  }
  h2 {
    font-size: ${(props) => props.theme.fontlg};
    font-family: "Sirin Stencil";
    font-weight: 500;
    text-shadow: 1px 1px 1px ${(props) => props.theme.body};
    margin: 0 auto;

    text-transform: capitalize;

    @media (max-width: 30em) {
      font-size: ${(props) => props.theme.fontmd};
      /* font-size: calc(5rem + 8vw); */
      margin-top: -1.5rem;
    }
  }
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 5, // 2
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const CoverVideo = () => {
  const [currentVideo, setCurrentVideo] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo(prev => {
        if (prev === 4) return 1;
        return prev + 1;
      });
    }, 8000); // Switch every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <VideoContainer data-scroll>
      <DarkOverlay />

      <Title variants={container} initial="hidden" animate="show">
        <div>
          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.13"
            data-scroll-speed="4"
          >
            P
          </motion.h1>
          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.09"
            data-scroll-speed="4"
          >
            a
          </motion.h1>
          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.06"
            data-scroll-speed="4"
          >
            w
          </motion.h1>
          <motion.h1
            variants={item}
            data-scroll
            data-scroll-delay="0.04"
            data-scroll-speed="4"
          >
            s
          </motion.h1>
        </div>
        <motion.h2
          style={{ alignSelf: "flex-end" }}
          variants={item}
          data-scroll
          data-scroll-delay="0.04"
          data-scroll-speed="2"
        >
          For the love of paws and purrs.
        </motion.h2>
      </Title>

      <video 
        src={MainVideo1} 
        type="video/mp4" 
        autoPlay 
        muted 
        loop 
        className={currentVideo === 1 ? 'active' : ''}
      />
      <video 
        src={MainVideo2} 
        type="video/mp4" 
        autoPlay 
        muted 
        loop 
        className={currentVideo === 2 ? 'active' : ''}
      />
      <video 
        src={MainVideo3} 
        type="video/mp4" 
        autoPlay 
        muted 
        loop 
        className={currentVideo === 3 ? 'active' : ''}
      />
      <video 
        src={MainVideo4} 
        type="video/mp4" 
        autoPlay 
        muted 
        loop 
        className={currentVideo === 4 ? 'active' : ''}
      />
    </VideoContainer>
  );
};

export default CoverVideo;
