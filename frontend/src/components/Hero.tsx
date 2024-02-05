import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

// Define a type for the imageUrl prop
type ImageUrlType = string;

// Styled components for the hero section
const HeroSection = styled.div<{ imageUrl: ImageUrlType }>`
  width: 100%;
  height: 25vh; /* Adjust the height as needed */
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

// Define the props interface for the HalfHeroSection component
interface HalfHeroSectionProps {
  imageUrl: ImageUrlType;
  heading: string;
}

const HalfHeroSection: React.FC<HalfHeroSectionProps> = ({
  imageUrl,
  heading,
}) => {
  return (
    <HeroSection imageUrl={imageUrl}>
      <HeroContent>
        <h1>{heading}</h1>
        <br />
        <p>Addis Software Test project Thank you!!</p>
        <Link to={"/statistics"}>
          <Button>Show Stat</Button>
        </Link>
      </HeroContent>
      <HeroImage src={imageUrl} alt="Hero Image" />
    </HeroSection>
  );
};

export default HalfHeroSection;
