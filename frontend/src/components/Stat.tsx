import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/reducer";
import {
  fetchSongsFailure,
  fetchSongsStart,
  fetchSongsSuccess,
  fetchStatSongsFailure,
  fetchStatSongsStart,
  fetchStatSongsSuccess,
} from "../features/songSlice";
import { fetchSongsApi, fetchStatSongsApi } from "../api/api";
import styled from "@emotion/styled";

const DashboardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  background: linear-gradient(120deg, #f3eeea, #ebe3d5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StatisticCard: React.FC<{ title: string; value: number }> = ({
  title,
  value,
}) => {
  return (
    <Card>
      <h3>{title}</h3>
      <h1>{value}</h1>
    </Card>
  );
};

const StatisticsDashboard: React.FC = () => {
  const { totalSongs, uniqueArtists, uniqueAlbums, uniqueGenres } = useSelector(
    (state: RootState) => state.songs.statData
  );

  const dispatch = useDispatch();
  const fetchSongs = async () => {
    try {
      dispatch(fetchStatSongsStart());
      const response = await fetchStatSongsApi();
      dispatch(fetchStatSongsSuccess(response.data));
      return response.data;
    } catch (error: any) {
      dispatch(fetchStatSongsFailure(error.message));
      throw error;
    }
  };
  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <DashboardContainer>
      <StatisticCard title="Total Songs" value={totalSongs} />
      <StatisticCard title="Unique Artists" value={uniqueArtists} />
      <StatisticCard title="Unique Albums" value={uniqueAlbums} />
      <StatisticCard title="Unique Genres" value={uniqueGenres} />
    </DashboardContainer>
  );
};

export default StatisticsDashboard;
