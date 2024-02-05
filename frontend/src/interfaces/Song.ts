export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}
export interface Statistics {
  totalSongs: number;
  uniqueArtists: number;
  uniqueAlbums: number;
  uniqueGenres: number;
}
export interface SongWithoutId {
  title: string;
  artist: string;
  album: string;
  genre: string;
}
export interface SongsState {
  songs: Song[];
  filteredSongs: Song[];
  statData: Statistics;
  loading: boolean;
  error: string | null;
}
