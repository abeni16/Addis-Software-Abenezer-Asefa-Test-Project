import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

// Define a type for the imageUrl prop
type ImageUrlType = string;

// Styled components for the hero section
const HeroSection = styled.div<{ imageUrl: ImageUrlType }>`
  width: 100%;
  height: 25vh; /* Adjust the height as needed */
  marging-bottom: 22px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  display: flex;
  padding: 22px;
  flex-direction: columon;
  justify-content: flex-start;
  color: #444; /* Text color */
  border-bottom-left-radius: 50px; /* Adjust the border radius as needed */
  border-bottom-right-radius: 50px; /* Adjust the border radius as needed */
`;
const Button = styled.button`
  margin: 10px;
  padding: 10px;
  border-width: 2px;
  border-color: #444;
  border-radius: 20px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
const HeroContent = styled.div`
  align-text: center;
`;

const HeroImage = styled.img`
  display: none; /* Hide the image if not needed */
`;

// Define the props interface for the HalfStatHero component
interface HalfStatHeroProps {
  imageUrl: ImageUrlType;
  heading: string;
}

const HalfStatHero: React.FC<HalfStatHeroProps> = ({ imageUrl, heading }) => {
  return (
    <HeroSection imageUrl={imageUrl}>
      <HeroContent>
        <h1>{heading}</h1>
        <br />
        <p>Addis Software Test project Thank you!!</p>
        <Link to={"/"}>
          <Button>Back To Home</Button>
        </Link>
      </HeroContent>
      <HeroImage src={imageUrl} alt="Hero Image" />
    </HeroSection>
  );
};

export default HalfStatHero;
