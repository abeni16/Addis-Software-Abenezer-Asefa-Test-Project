import React, { useCallback, useState } from "react";
import { Song } from "../interfaces/Song";
import styled from "@emotion/styled";
import { FaBeer, FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  deleteSongFailure,
  deleteSongStart,
  deleteSongSuccess,
} from "../features/songSlice";
import { deleteSongApi } from "../api/api";
import EditSongModal from "./EditSongForm";

// Styled song card component
const SongCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2); /* Semi-transparent background */
  backdrop-filter: blur(10px); /* Apply blur effect */
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  width: 100%;
  max-width: 500px;
  transition: 0.5s ease;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
`;

const SongImage = styled.img`
  width: 100px; /* Adjust the width of the image as needed */
  height: auto;
  margin-right: 16px; /* Adjust the margin as needed */
  border-radius: 8px; /* Adjust the border radius to match the card */

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const SongTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SongDetail = styled.p`
  font-size: 1rem;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
`;

const Icon = styled.i`
  cursor: pointer;
  padding: 8px;
  height: 30px;
  width: 30px;
  display: flex;
  background-color: rgba(255, 255, 255, 0.6); /* Semi-transparent background */
  backdrop-filter: blur(10px);
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 100px;
`;
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 4px;
  width: 80%;
  max-width: 560px;
  z-index: 1000;
`;
const ConfirmationDialog = styled.div`
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
interface Props {
  song: Song;
}

const SongItem: React.FC<Props> = ({ song }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = () => {
    setShowEditModal(!showEditModal);
  };
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    console.log(song._id);

    try {
      dispatch(deleteSongStart());
      if (song._id) {
        const response = await deleteSongApi(song._id);
        console.log(response);
        dispatch(deleteSongSuccess(response.data._id));
        setShowConfirmation(false);

        return response.data; // Return the created song
      }
    } catch (error: any) {
      dispatch(deleteSongFailure(error.message));
      setShowConfirmation(false);

      throw error; // Throw the error to be caught by the caller if necessary
    }
  };

  return (
    <>
      <SongCard>
        <SongImage
          src={"https://cdn.jim-nielsen.com/ios/512/apple-music-2020-09-25.png"}
          alt={"music"}
        />
        <div>
          <SongTitle>{song.title}</SongTitle>
          <SongDetail>Artist: {song.artist}</SongDetail>
          <SongDetail>Album: {song.album}</SongDetail>
          <SongDetail>Genre: {song.genre}</SongDetail>
        </div>
        <IconContainer>
          <Icon
            className="fas fa-trash"
            onClick={() => setShowConfirmation(true)}
          >
            <FaTrash fontSize={16} color="red" />
          </Icon>
          <Icon className="fas fa-edit" onClick={handleEditClick}>
            <FaEdit fontSize={16} color="#007bff" />
          </Icon>
        </IconContainer>
      </SongCard>
      {showConfirmation && (
        <ConfirmationDialog>
          <ModalContent>
            <h3>Are you sure you want to delete this song?</h3>
            <ButtonClose onClick={() => handleDelete()}>Delete</ButtonClose>
            <Button onClick={() => setShowConfirmation(false)}>Cancel</Button>
          </ModalContent>
        </ConfirmationDialog>
      )}
      {/* Render the edit song modal */}
      {showEditModal && <EditSongModal onClose={handleEditClick} song={song} />}
    </>
  );
};

export default SongItem;
