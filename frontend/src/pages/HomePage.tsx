// pages/HomePage.tsx
import React from "react";
import SongList from "../components/SongList";
import AddSongForm from "../components/AddSongForm";
import FilterForm from "../components/FilterForm";
import styled from "@emotion/styled";

const SongListContainer = styled.div`
  background: linear-gradient(220deg, #dcf2f1, #aad9bb);
`;

const HomePage: React.FC = () => {
  return (
    <SongListContainer>
      <h1>My Music App</h1>
      {/* <FilterForm /> */}
      <SongList />
      <AddSongForm />
    </SongListContainer>
  );
};

export default HomePage;
