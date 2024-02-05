import { all } from "redux-saga/effects";
import { watchFetchSongs } from "../features/songSlice";

// Root Saga function
export default function* rootSaga() {
  yield all([
    watchFetchSongs(),
    // Add other sagas here if needed
  ]);
}
