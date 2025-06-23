import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, ${props => props.theme.body} 0%, #1a1a1a 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/path/to/paw-pattern.png') repeat;
    opacity: 0.05;
    z-index: 0;
  }
`;

const Title = styled(motion.h1)`
  font-size: ${props => props.theme.fontxxxl};
  font-family: 'Kaushan Script';
  color: ${props => props.theme.text};
  text-align: center;
  margin: 2rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;

  @media (max-width: 64em) {
    font-size: ${props => props.theme.fontxxl};
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent);
    transform: translateX(-100%);
    transition: 0.5s;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`;

const CardTitle = styled.h2`
  font-size: ${props => props.theme.fontxl};
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    width: 24px;
    height: 24px;
    color: #ffb347;
  }
`;

const CardDescription = styled.p`
  font-size: ${props => props.theme.fontmd};
  color: ${props => props.theme.text};
  margin-bottom: 1.5rem;
  line-height: 1.6;
  opacity: 0.8;
`;

const Button = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(90deg, #ffb347, #ffcc33);
  border: none;
  border-radius: 25px;
  color: ${props => props.theme.body};
  font-size: ${props => props.theme.fontmd};
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(255, 179, 71, 0.3);

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: linear-gradient(90deg, #ffcc33, #ffb347);
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Stat = styled.div`
  text-align: center;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  flex: 1;

  h3 {
    font-size: ${props => props.theme.fontxl};
    color: #ffb347;
    margin-bottom: 0.2rem;
  }

  p {
    font-size: ${props => props.theme.fontsm};
    color: ${props => props.theme.text};
    opacity: 0.7;
  }
`;

const Community = () => {
  return (
    <Section id="community">
      <Title
        data-scroll
        data-scroll-speed="-1"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Join Our Pet-Loving Community
      </Title>
      <Container>
        <Card
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
              <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
            </svg>
            Pet Owner Forum
          </CardTitle>
          <Stats>
            <Stat>
              <h3>5K+</h3>
              <p>Members</p>
            </Stat>
            <Stat>
              <h3>500+</h3>
              <p>Daily Posts</p>
            </Stat>
          </Stats>
          <CardDescription>
            Connect with fellow pet parents in our vibrant community! Share experiences, get expert advice, and participate in engaging discussions about pet care, training, and more.
          </CardDescription>
          <Button to="/forum" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
            </svg>
            Join Discussion
          </Button>
        </Card>

        <Card
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
            </svg>
            Success Stories
          </CardTitle>
          <Stats>
            <Stat>
              <h3>1K+</h3>
              <p>Happy Stories</p>
            </Stat>
            <Stat>
              <h3>2K+</h3>
              <p>Lives Changed</p>
            </Stat>
          </Stats>
          <CardDescription>
            Discover heartwarming tales of successful adoptions, incredible transformations, and the beautiful bonds formed between pets and their forever families. Your story could be next!
          </CardDescription>
          <Button to="/success-stories" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            Read Stories
          </Button>
        </Card>

        <Card
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
            </svg>
            Pet Care Academy
          </CardTitle>
          <Stats>
            <Stat>
              <h3>100+</h3>
              <p>Guides</p>
            </Stat>
            <Stat>
              <h3>50+</h3>
              <p>Experts</p>
            </Stat>
          </Stats>
          <CardDescription>
            Access our comprehensive library of expert-written guides, training resources, and health tips. Learn everything from basic pet care to advanced training techniques.
          </CardDescription>
          <Button to="/pet-care-tips" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
            </svg>
            Learn More
          </Button>
        </Card>

        <Card
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
            Events Calendar
          </CardTitle>
          <Stats>
            <Stat>
              <h3>20+</h3>
              <p>Monthly Events</p>
            </Stat>
            <Stat>
              <h3>5+</h3>
              <p>Cities</p>
            </Stat>
          </Stats>
          <CardDescription>
            Stay updated with our upcoming adoption drives, pet health camps, training workshops, and fun community meetups. Don't miss out on these pawsome events!
          </CardDescription>
          <Button to="/events" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
            </svg>
            View Calendar
          </Button>
        </Card>
      </Container>
    </Section>
  );
};

export default Community; 