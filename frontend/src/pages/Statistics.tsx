// pages/Statistics.tsx
import React from "react";
import StatisticsDashboard from "../components/Stat";
import HalfStatHero from "../components/HeroStat";
import styled from "@emotion/styled";
const SongListContainer = styled.div``;
const Statistics: React.FC = () => {
  // Add statistics content here
  return (
    <SongListContainer>
      <HalfStatHero
        heading="Abenezer Asefa"
        imageUrl="https://www.sampra.org.za/wp-content/uploads/2022/08/bnr2-1.jpg"
      />
      <h1>Statistics</h1>
      <StatisticsDashboard />
      {/* Add statistics components or content */}
    </SongListContainer>
  );
};

export default Statistics;
