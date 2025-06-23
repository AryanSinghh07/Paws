import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 179, 71, 0.1);
  border-radius: 50%;
  border-top-color: #ffb347;
  animation: ${spin} 1s ease-in-out infinite;
  margin-bottom: 1rem;
`;

const PawIcon = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: #ffb347;
  border-radius: 50%;
  animation: ${bounce} 1s ease-in-out infinite;
  
  &::before {
    content: '🐾';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
  }
`;

const Text = styled.p`
  color: ${props => props.theme.text};
  font-size: ${props => props.theme.fontlg};
  margin-top: 1rem;
  opacity: 0.8;
`;

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <Container>
      <div style={{ position: 'relative' }}>
        <Spinner />
        <PawIcon />
      </div>
      <Text>{text}</Text>
    </Container>
  );
};

export default LoadingSpinner; 