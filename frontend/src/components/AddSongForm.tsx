import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/reducer";
import {
  createSongFailure,
  createSongStart,
  createSongSuccess,
} from "../features/songSlice";
import { createSongApi } from "../api/api";
import styled from "@emotion/styled";

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
const FloatingButton = styled(Button)`
  position: fixed;
  right: 20px;
  bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 4px;
  width: 80%;
  max-width: 560px;
`;

const AddSongForm: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.songs);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const songData = { title, artist, album, genre };
    try {
      dispatch(createSongStart());
      const response = await createSongApi(songData);
      dispatch(createSongSuccess(response.data));
      setTitle("");
      setArtist("");
      setAlbum("");
      setGenre("");
      setIsOpen(false);
      return response.data;
    } catch (error: any) {
      dispatch(createSongFailure(error.message));
      throw error;
    }
  };

  return (
    <div>
      <FloatingButton onClick={() => setIsOpen(true)}>
        Create A New Song
      </FloatingButton>
      {isOpen && (
        <Modal>
          <ModalContent>
            <h2>Add New Song</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Album"
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
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add New Song"}
              </Button>
              <ButtonClose onClick={() => setIsOpen(false)}>Close</ButtonClose>
            </form>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default AddSongForm;
