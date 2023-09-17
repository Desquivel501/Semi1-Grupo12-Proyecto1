export type User = {
  name: string;
  lastname: string;
  avatar: string;
  email: string;
  password: string;
  birthDate: string;
};

export type Artist = {
  name: string;
  avatar: string;
  birthDate: string;
};

export type Song = {
  name: string;
  cover: string;
  duration: number;
  artist: number;
  source: string;
};
export type FavoriteSong = {
  song: number;
  email: string;
};

export type Playlist = {
  name: string;
  description: string;
  cover: string;
  email: string;
};
export type Album = {
  artist: number;
} & Playlist;
export type Credentials = {
  email: string;
  password: string;
};
export type SongFiles = {
  cover: Express.MulterS3.File[];
  source: Express.MulterS3.File[];
};
export type UpdateUser = {
  newEmail: string;
} & User;
export type UpdateArtist = {
  id: number;
} & Artist;
export type UpdateSong = {
  id: number;
} & Song;
export type UpdateAlbum = {
  id: number;
} & Album;
export type UpdatePlaylist = {
  id: number;
} & Playlist;
