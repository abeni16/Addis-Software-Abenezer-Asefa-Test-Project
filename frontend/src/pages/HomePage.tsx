// pages/HomePage.tsx
import React from "react";
import SongList from "../components/SongList";
import AddSongForm from "../components/AddSongForm";
import FilterForm from "../components/FilterForm";
import styled from "@emotion/styled";
import HalfHeroSection from "../components/Hero";

const SongListContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #f3eeea, #ebe3d5);
`;

const HomePage: React.FC = () => {
  return (
    <SongListContainer>
      <HalfHeroSection
        heading="Abenezer Asefa"
        imageUrl="https://www.sampra.org.za/wp-content/uploads/2022/08/bnr2-1.jpg"
      />

      <FilterForm />
      <SongList />
      {/* <StatisticsDashboard /> */}

      <AddSongForm />
    </SongListContainer>
  );
};

export default HomePage;
