import styled, {keyframes} from 'styled-components';

// Define the animation
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Create a styled div for the gradient background
const GradientBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(334deg, #6b97f7, #7525e2, #f7137e);
  background-size: 180% 180%;
  animation: ${gradientAnimation} 6s ease infinite;
`;

export default GradientBackground;
