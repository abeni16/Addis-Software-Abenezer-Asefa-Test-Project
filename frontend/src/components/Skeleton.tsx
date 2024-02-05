import React from "react";
import styled from "@emotion/styled";

// Styled skeleton card component
const SkeletonCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0; /* Light gray background */
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  width: 100%;
  animation: pulse 1s infinite alternate; /* Pulse animation */

  @keyframes pulse {
    0% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const SkeletonImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: #ddd; /* Light gray background for the image */
  border-radius: 8px; /* Adjust the border radius */
  margin-right: 16px;
`;

const SkeletonText = styled.div`
  flex: 1;
  background-color: #fff; /* Light gray background for the text */
  height: 16px; /* Adjust the height of the text */
  border-radius: 4px; /* Adjust the border radius */
  margin-bottom: 8px;
`;

const SkeletonDetail = styled(SkeletonText)`
  width: 50%; /* Adjust the width of the text */
`;

const SkeletonCardComponent: React.FC = () => {
  return (
    <SkeletonCard>
      <SkeletonImage />
      <div>
        <SkeletonText style={{ width: "80%", marginBottom: "8px" }} />
        <SkeletonDetail />
        <SkeletonDetail />
        <SkeletonDetail />
      </div>
    </SkeletonCard>
  );
};

export default SkeletonCardComponent;
