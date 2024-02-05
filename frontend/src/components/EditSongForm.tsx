import React, { useState } from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import {
  updateSongFailure,
  updateSongStart,
  updateSongSuccess,
} from "../features/songSlice";
import { updateSongApi } from "../api/api";
import { Song } from "../interfaces/Song";

interface EditSongModalProps {
  song: Song;
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  z-index: 2000;
  background: white;
  padding: 20px;
  border-radius: 4px;
  width: 80%;
  max-width: 560px;
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  font-size: 16px;

  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  border-radius: 4px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px;
  border: none;
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
const ButtonClose = styled.button`
  margin: 10px;
  padding: 10px;
  font-size: 16px;

  border: none;
  border-radius: 20px;
  background-color: #bf3131;
  color: white;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const EditSongModal: React.FC<EditSongModalProps> = ({ song, onClose }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>(song.title);
  const [artist, setArtist] = useState<string>(song.artist);
  const [album, setAlbum] = useState<string>(song.album);
  const [genre, setGenre] = useState<string>(song.genre);
  console.log(song);
  const handleSave = async () => {
    try {
      dispatch(updateSongStart());
      const updateedSong = { _id: song._id, title, artist, album, genre };
      const response = await updateSongApi(updateedSong);
      dispatch(updateSongSuccess(response.data));
      onClose(); // Close the modal after saving
    } catch (error: any) {
      dispatch(updateSongFailure(error.message));
      // Handle error
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Edit Song</h2>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <Input
          type="text"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        />
        <Select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select genre</option>
          <option value="pop">Pop</option>
          <option value="reggae">Reggae</option>
          <option value="traditional">Traditional</option>
          <option value="rock">Rock</option>
          <option value="other">Other</option>
        </Select>
        <Button onClick={handleSave}>Update Song</Button>
        <ButtonClose onClick={onClose}>Cancel</ButtonClose>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditSongModal;
