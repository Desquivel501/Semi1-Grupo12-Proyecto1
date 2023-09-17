import { pool } from "./database/connection";
import { Song, SongFiles, UpdateSong } from "./types";

export class SongModel {
  static createSong(
    song: Song,
    files: SongFiles,
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      const newSong = { ...song };
      newSong.cover = files.cover[0].location;
      newSong.source = files.source[0].location;
      pool.query("CALL CreateSong(?,?,?,?,?)", [
        newSong.name,
        newSong.cover,
        newSong.duration,
        newSong.artist,
        newSong.source,
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

  static getSong(
    { id, email }: { id: number; email: string },
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query(
        `CALL GetSong(?,?)`,
        [id, email],
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

  static getSongs(callback: (response: any, ok: Boolean) => void) {
    try {
      pool.query(
        `CALL GetAllSongs()`,
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

  static editSong(
    newSong: UpdateSong,
    files: SongFiles,
    callback: Function,
  ) {
    try {
      newSong.cover = files.cover === undefined ? "" : files.cover[0].location;
      newSong.source = files.source === undefined
        ? ""
        : files.source[0].location;

      // Encriptando
      // Guardar en DB
      pool.query("CALL UpdateSong(?,?,?,?,?,?)", [
        newSong.id,
        newSong.name,
        newSong.cover,
        newSong.duration,
        newSong.artist,
        newSong.source,
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

  static deleteSong(
    { id }: { id: number },
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query("CALL DeleteSong(?)", [
        id,
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
