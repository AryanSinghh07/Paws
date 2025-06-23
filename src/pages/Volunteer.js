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

const Volunteer = () => {
  return (
    <Container>
      <Title>Volunteer Registration</Title>
      {/* Volunteer registration form will be implemented here */}
      <p style={{ textAlign: 'center' }}>Coming Soon! Join our volunteer program to help animals in need.</p>
    </Container>
  );
};

export default Volunteer; 