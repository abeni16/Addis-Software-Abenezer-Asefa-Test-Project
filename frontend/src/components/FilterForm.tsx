import styled from "@emotion/styled";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { filterSongApi } from "../api/api";
import {
  fetchFilteredSongsFailure,
  fetchFilteredSongsStart,
  fetchFilteredSongsSuccess,
} from "../features/songSlice";

const Select = styled.select`
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  border-radius: 4px;
`;
const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-left: 22px;
  padding-right: 22px;
`;

const FilterForm: React.FC = () => {
  const dispatch = useDispatch();
  const [genre, setGenre] = useState("");

  const handleGenreChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setGenre(e.target.value);
    },
    []
  );

  const fetchFilteredSongs = useCallback(async () => {
    try {
      dispatch(fetchFilteredSongsStart());
      const response = await filterSongApi(genre);
      dispatch(fetchFilteredSongsSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchFilteredSongsFailure(error.message));
      throw error;
    }
  }, [dispatch, genre]);

  useEffect(() => {
    fetchFilteredSongs();
  }, [fetchFilteredSongs]);

  const genreOptions = useMemo(
    () => (
      <>
        <option value="">Select genre</option>
        <option value="pop">Pop</option>
        <option value="reggae">Reggae</option>
        <option value="traditional">Traditional</option>
        <option value="rock">Rock</option>
        <option value="other">Other</option>
      </>
    ),
    []
  );

  return (
    <Container>
      <h4>Filter Songs</h4>
      <FaFilter />
      <Select value={genre} onChange={handleGenreChange}>
        {genreOptions}
      </Select>
    </Container>
  );
};

export default memo(FilterForm);
