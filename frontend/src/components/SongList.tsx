import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/reducer";
import SongItem from "./SongItem";
import {
  fetchSongsFailure,
  fetchSongsStart,
  fetchSongsSuccess,
} from "../features/songSlice";
import { fetchSongsApi } from "../api/api";
import styled from "@emotion/styled";
import SkeletonCardComponent from "./Skeleton";

// Styled components
const SongListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  @media screen and (min-width: 768px) {
    /* 4 columns on desktop */
    gap: 10px;
    & > * {
      flex: 0 0 calc(25% - 10px);
    }
  }

  @media screen and (max-width: 767px) and (min-width: 481px) {
    /* 3 columns on tablet */
    & > * {
      flex: 0 0 calc(33.33% - 5px);
    }
  }

  @media screen and (max-width: 480px) {
    /* 1 column on mobile */
    & > * {
      flex: 0 0 calc(100% - 5px);
    }
  }
`;

const SongList: React.FC = () => {
  const songs = useSelector((state: RootState) => state.songs.songs);
  const loading = useSelector((state: RootState) => state.songs.loading);

  const dispatch = useDispatch();

  const fetchSong = useCallback(async () => {
    try {
      dispatch(fetchSongsStart());
      const response = await fetchSongsApi();
      dispatch(fetchSongsSuccess(response.data));
      return response.data; // Return the created song
    } catch (error: any) {
      dispatch(fetchSongsFailure(error.message));
      throw error; // Throw the error to be caught by the caller if necessary
    }
  }, []);

  useEffect(() => {
    fetchSong();
  }, []);

  console.log(songs.length, "songs");
  return (
    <SongListContainer>
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCardComponent key={index} />
          ))
        : Array.isArray(songs) &&
          songs.map((song) => <SongItem key={song.id} song={song} />)}
    </SongListContainer>
  );
};

export default SongList;
