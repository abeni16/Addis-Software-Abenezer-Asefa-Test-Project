import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchSongsApi,
  createSongApi,
  updateSongApi,
  deleteSongApi,
} from "../api/api"; // Define your API functions
import { Song, SongsState, SongWithoutId } from "../interfaces/Song";
import { UseDispatch } from "react-redux";

// Define the initial state

const initialState: SongsState = {
  songs: [],
  loading: false,
  error: null,
};

// Define the songs slice
const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    createSongSuccess(state, action: PayloadAction<Song>) {
      state.loading = false;
      state.songs.push(action.payload);
    },
    createSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess(state, action: PayloadAction<Song>) {
      state.loading = false;
      state.songs = state.songs.map((song) =>
        song.id === action.payload.id ? action.payload : song
      );
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.songs = state.songs.filter((song) => song.id !== action.payload);
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Define async action creator and saga for fetching songs
function* fetchSongsSaga() {
  try {
    const songs: Song[] = yield call(fetchSongsApi);
    yield put(fetchSongsSuccess(songs));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* createSongSaga(action: PayloadAction<Song>) {
  try {
    const newSong: Song = yield call(createSongApi, action.payload);
    yield put(createSongSuccess(newSong));
  } catch (error: any) {
    yield put(createSongFailure(error.message));
  }
}

function* updateSongSaga(action: PayloadAction<Song>) {
  try {
    const updatedSong: Song = yield call(updateSongApi, action.payload);
    yield put(updateSongSuccess(updatedSong));
  } catch (error: any) {
    yield put(updateSongFailure(error.message));
  }
}

function* deleteSongSaga(action: PayloadAction<string>) {
  try {
    yield call(deleteSongApi, action.payload);
    yield put(deleteSongSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteSongFailure(error.message));
  }
}

export function* watchFetchSongs() {
  yield takeLatest("songs/fetchSongsStart", fetchSongsSaga);
}

export function* watchCreateSong() {
  yield takeLatest("songs/createSongStart", createSongSaga);
}

export function* watchUpdateSong() {
  yield takeLatest("songs/updateSongStart", updateSongSaga);
}

export function* watchDeleteSong() {
  yield takeLatest("songs/deleteSongStart", deleteSongSaga);
}

// Export action creators and reducer
export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongStart,
  createSongSuccess,
  createSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
} = songsSlice.actions;

export const songsReducer = songsSlice.reducer;
