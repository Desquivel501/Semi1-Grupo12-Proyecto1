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
  duration: string;
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
  artist: string;
} & Playlist;
