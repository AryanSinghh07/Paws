import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  position: relative
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.body};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontxxxl};
  font-family: 'Kaushan Script';
  color: ${props => props.theme.text};
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  margin: 1rem auto;
  border-bottom: 2px solid ${props => props.theme.text};
  width: fit-content;

  @media (max-width: 70em) {
    font-size: ${props => props.theme.fontxxl};
  }
  @media (max-width: 64em) {
    font-size: ${props => props.theme.fontxl};
  }
  @media (max-width: 48em) {
    font-size: ${props => props.theme.fontlg};
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Card = styled(motion.div)`
  width: 350px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 45px 0 rgba(31, 38, 135, 0.3);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.1);
  }
`;

const CardTitle = styled.h2`
  font-size: ${props => props.theme.fontxl};
  color: ${props => props.theme.text};
  font-family: 'Kaushan Script';
  text-align: center;
`;

const CardText = styled.p`
  font-size: ${props => props.theme.fontmd};
  color: ${props => props.theme.text};
  text-align: center;
  opacity: 0.8;
  line-height: 1.5;
`;

const Button = styled(motion.button)`
  padding: 0.8rem 2rem;
  background: linear-gradient(90deg, #ffb347, #ffcc33);
  border: none;
  border-radius: 50px;
  color: ${props => props.theme.body};
  font-size: ${props => props.theme.fontmd};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(255, 179, 71, 0.3);

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: linear-gradient(90deg, #ffcc33, #ffb347);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: linear-gradient(90deg, #ffb347, #ffcc33);
    border-radius: 5px;
    transition: width 0.3s ease;
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.5rem;
`;

const StatText = styled.span`
  font-size: ${props => props.theme.fontsm};
  color: ${props => props.theme.text};
  opacity: 0.8;
`;

const InfoBox = styled(motion.div)`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    font-size: ${props => props.theme.fontxl};
    color: ${props => props.theme.text};
    font-family: 'Kaushan Script';
    margin-bottom: 1rem;
    text-align: center;
  }

  p {
    font-size: ${props => props.theme.fontmd};
    color: ${props => props.theme.text};
    line-height: 1.8;
    margin-bottom: 1rem;
    opacity: 0.8;
    text-align: justify;
  }

  ul {
    list-style-type: none;
    margin: 1rem 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: ${props => props.theme.fontmd};
    color: ${props => props.theme.text};
    opacity: 0.8;

    svg {
      width: 20px;
      height: 20px;
      color: #ffb347;
    }
  }
`;

const FormButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  background: linear-gradient(90deg, #ffb347, #ffcc33);
  border: none;
  border-radius: 50px;
  color: ${props => props.theme.body};
  font-size: ${props => props.theme.fontlg};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 2rem auto;
  box-shadow: 0 4px 15px rgba(255, 179, 71, 0.3);

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: linear-gradient(90deg, #ffcc33, #ffb347);
    transform: scale(1.05);
  }
`;

const FeedAndAdopt = () => {
  const [feedProgress, setFeedProgress] = useState({
    dogs: 65,
    cats: 45
  });

  const handleFeed = (animal) => {
    setFeedProgress(prev => ({
      ...prev,
      [animal]: Math.min(prev[animal] + 5, 100)
    }));
  };

  return (
    <Section id="feed-adopt">
      <Title data-scroll data-scroll-speed="-2">Feed & Adopt</Title>
      
      <InfoBox
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2>Why Feed Street Animals?</h2>
        <p>
          Street animals face numerous challenges in their daily lives, from finding food and shelter to staying safe from various hazards. By contributing to our feeding program, you're not just providing a meal – you're giving hope and comfort to these resilient creatures who share our urban spaces.
        </p>
        <p>
          Our dedicated team of volunteers ensures that your contributions reach the animals who need them most. We maintain regular feeding spots and schedules, allowing us to monitor the health and well-being of street animals in our community.
        </p>
        <ul>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
            Regular feeding schedules
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
            Quality-checked food
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
            Health monitoring
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
            Volunteer support
          </li>
        </ul>
      </InfoBox>

      <Container>
        <Card
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <ImageContainer>
            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b" alt="Dogs" />
          </ImageContainer>
          <CardTitle>Feed Street Dogs</CardTitle>
          <CardText>
            Help us feed street dogs in your area. Every contribution helps provide a meal to a hungry soul.
          </CardText>
          <ProgressBar progress={feedProgress.dogs} />
          <Stats>
            <StatText>Daily Goal: {feedProgress.dogs}%</StatText>
            <StatText>{Math.round(feedProgress.dogs * 0.5)} meals served</StatText>
          </Stats>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFeed('dogs')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
            </svg>
            Feed Now
          </Button>
        </Card>

        <Card
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ImageContainer>
            <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba" alt="Cats" />
          </ImageContainer>
          <CardTitle>Feed Street Cats</CardTitle>
          <CardText>
            Support our mission to feed street cats. Your contribution ensures they don't go hungry.
          </CardText>
          <ProgressBar progress={feedProgress.cats} />
          <Stats>
            <StatText>Daily Goal: {feedProgress.cats}%</StatText>
            <StatText>{Math.round(feedProgress.cats * 0.5)} meals served</StatText>
          </Stats>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFeed('cats')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
            </svg>
            Feed Now
          </Button>
        </Card>

        <Card
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <ImageContainer>
            <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1" alt="Adopt" />
          </ImageContainer>
          <CardTitle>Adopt a Pet</CardTitle>
          <CardText>
            Give a forever home to a loving companion. Our adoption process ensures both you and your future pet find the perfect match. Start your journey to pet parenthood today!
          </CardText>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            as={Link}
            to="/available-pets"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            View Available Pets
          </Button>
          <FormButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            as={Link}
            to="/adoption-form"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
            Fill Adoption Form
          </FormButton>
        </Card>
      </Container>
    </Section>
  );
};

export default FeedAndAdopt; 