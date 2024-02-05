export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}
export interface SongWithoutId {
  title: string;
  artist: string;
  album: string;
  genre: string;
}
export interface SongsState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}
