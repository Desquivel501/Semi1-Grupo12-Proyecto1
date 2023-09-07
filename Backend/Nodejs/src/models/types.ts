export type User = {
  name: string;
  lastname: string;
  avatar: string;
  email: string;
  password: string;
  birthDate: string;
  rol?: "user" | "admin";
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

export type Playlist = {
  name: string;
  description: string;
  cover: string;
  songs: Song[];
};
export type Album = {
  artist: number;
} & Playlist;
export type Credentials = {
  email: string;
  password: string;
};
export type SongFiles = {
  cover: Express.MulterS3.File[]
  source: Express.MulterS3.File[]
};
