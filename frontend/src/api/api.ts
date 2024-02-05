import axios, { AxiosResponse } from "axios";
import { Song, SongWithoutId } from "../interfaces/Song";

// Define the response type for the API
interface ApiResponse<T> {
  data: T;
}

// Define the base URL for your API
const baseURL = "http://localhost:5000";

// Fetch songs from the server
export const fetchSongsApi = async (): Promise<ApiResponse<Song[]>> => {
  try {
    const response: AxiosResponse<Song[]> = await axios.get(`${baseURL}/songs`);
    return { data: response.data };
  } catch (error) {
    throw new Error("Failed to fetch songs");
  }
};

// Create a new song on the server
export const createSongApi = async (
  newSong: SongWithoutId
): Promise<ApiResponse<Song>> => {
  console.log(newSong);
  try {
    const response: AxiosResponse<Song> = await axios.post(
      `${baseURL}/songs`,
      newSong
    );
    return { data: response.data };
  } catch (error) {
    throw new Error("Failed to create song");
  }
};

// Update an existing song on the server
export const updateSongApi = async (
  updatedSong: Song
): Promise<ApiResponse<Song>> => {
  try {
    const response: AxiosResponse<Song> = await axios.patch(
      `${baseURL}/songs/${updatedSong.id}`,
      updatedSong
    );
    return { data: response.data };
  } catch (error) {
    throw new Error("Failed to update song");
  }
};

// Delete an existing song from the server
export const deleteSongApi = async (
  songId: string
): Promise<ApiResponse<Song>> => {
  try {
    const response = await axios.delete(`${baseURL}/songs/${songId}`);
    return { data: response.data };
  } catch (error) {
    throw new Error("Failed to delete song");
  }
};