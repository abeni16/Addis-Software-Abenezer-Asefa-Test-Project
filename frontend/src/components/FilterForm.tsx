import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { filterSongs } from "../features/songSlice";

const FilterForm: React.FC = () => {
  const dispatch = useDispatch();
  const [genre, setGenre] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch(filterSongs(genre));
    setGenre("");
  };

  return (
    <div>
      <h2>Filter Songs</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button type="submit">Filter</button>
      </form>
    </div>
  );
};

export default FilterForm;
