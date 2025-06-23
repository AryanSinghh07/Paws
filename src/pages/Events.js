import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.text};
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontxxl};
  text-align: center;
  margin: 2rem 0;
`;

const Events = () => {
  return (
    <Container>
      <Title>Adoption Events Calendar</Title>
      {/* Events calendar content will be implemented here */}
      <p style={{ textAlign: 'center' }}>Coming Soon! Stay updated with our upcoming adoption events.</p>
    </Container>
  );
};

export default Events; 