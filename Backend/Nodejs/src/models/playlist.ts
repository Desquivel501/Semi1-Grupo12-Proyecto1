import { pool } from "./database/connection";
import { Playlist, UpdatePlaylist } from "./types";

export class PlaylistModel {
  static createPlaylist(
    playlist: Playlist,
    cover: Express.MulterS3.File,
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      const newPlaylist = { ...playlist };
      newPlaylist.cover = cover.location;
      console.log(newPlaylist);
      pool.query("CALL CreatePlaylist(?,?,?,?)", [
        newPlaylist.name,
        newPlaylist.description,
        newPlaylist.cover,
        newPlaylist.email,
      ], (err, result) => {
        if (err) throw err;
        if (result[0][0].TYPE == "ERROR") callback(result[0][0], false);
        else {
          callback(result[0][0], true);
        }
      });
    } catch (error) {
      console.log(error);
      callback(error, false);
    }
  }

  static getUserPlaylist(
    { email }: { email: string },
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query("CALL GetUserPlaylists(?)", [
        email,
      ], (err, result) => {
        if (err) throw err;
        callback(result[0], true);
      });
    } catch (error) {
      console.log(error);
      callback(error, false);
    }
  }

  static getPlaylist(
    { id }: { id: string },
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query(
        `SELECT id_playlist AS id, name, description, image AS cover, email
        FROM PR1.Playlists
        WHERE id_playlist=?`,
        id,
        (err, result) => {
          if (err) throw err;
          callback(result[0], true);
        },
      );
    } catch (error) {
      console.log(error);
      callback(error, false);
    }
  }

  static getSongs(
    { id }: { id: string },
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query("CALL GetPlaylistSongs(?)", [
        id,
      ], (err, result) => {
        if (err) throw err;
        callback(result[0], true);
      });
    } catch (error) {
      console.log(error);
      callback(error, false);
    }
  }


  static getSongsNotInPlaylist(
    { id }: { id: string },
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query("CALL GetSongsNotInPlaylist(?)", [
        id,
      ], (err, result) => {
        if (err) throw err;
        callback(result[0], true);
      });
    } catch (error) {
      console.log(error);
      callback(error, false);
    }
  }




  static addSong(
    playlist: number,
    song: number,
    email: string,
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query("CALL AddSongPlaylist(?,?,?)", [
        playlist,
        song,
        email,
      ], (err, result) => {
        if (err) throw err;
        if (result[0][0].TYPE == "ERROR") callback(result[0][0], false);
        else {
          callback(result[0][0], true);
        }
      });
    } catch (error) {
      console.log(error);
      callback(error, false);
    }
  }

  static removeSong(
    playlist: number,
    song: number,
    email: string,
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query("CALL RemoveSongPlaylist(?,?,?)", [
        playlist,
        song,
        email,
      ], (err, result) => {
        if (err) throw err;
        if (result[0][0].TYPE == "ERROR") callback(result[0][0], false);
        else {
          callback(result[0][0], true);
        }
      });
    } catch (error) {
      console.log(error);
      callback(error, false);
    }
  }

  static editPlaylist(
    newPlaylist: UpdatePlaylist,
    file: Express.MulterS3.File,
    callback: Function,
  ) {
    try {
      newPlaylist.cover = file ? file.location : "";
      console.log(newPlaylist)
      // Guardar en DB
      pool.query("CALL UpdatePlaylist(?,?,?,?,?)", [
        newPlaylist.id,
        newPlaylist.name,
        newPlaylist.description,
        newPlaylist.cover,
        newPlaylist.email,
      ], (err, result) => {
        if (err) throw err;
        if (result[0][0].TYPE == "ERROR") callback(result[0][0], false);
        else {
          callback(result[0][0], true);
        }
      });
    } catch (error) {
    }
  }

  static deletePlaylist(
    { id, email }: { id: number; email: string },
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query("CALL RemovePlaylist(?,?)", [
        id,
        email,
      ], (err, result) => {
        if (err) throw err;
        if (result[0][0].TYPE == "ERROR") callback(result[0][0], false);
        else {
          callback(result[0][0], true);
        }
      });
    } catch (error) {
      console.log(error);
      callback(error, false);
    }
  }
}
