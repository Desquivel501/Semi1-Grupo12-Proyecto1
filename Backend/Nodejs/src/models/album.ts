import { pool } from "./database/connection";
import { Album, UpdateAlbum } from "./types";

export class AlbumModel {
  static createAlbum(
    album: Album,
    file: Express.MulterS3.File,
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      const newAlbum = { ...album };
      newAlbum.cover = file.location;
      pool.query("CALL CreateAlbum(?,?,?,?)", [
        newAlbum.name,
        newAlbum.description,
        newAlbum.cover,
        newAlbum.artist,
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

  static getAlbum(
    { id }: { id: number },
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query(
        `SELECT a.id_album AS id, a.name,a.image AS cover ,ar.name AS singer FROM Albums a
        JOIN Artists ar ON a.id_artist=ar.id_artist
        WHERE a.id_album=?`,
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

  static getAlbums(
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query(
        `SELECT a.id_album AS id, a.name,a.image AS cover ,ar.name AS singer FROM Albums a
        JOIN Artists ar ON a.id_artist=ar.id_artist`,
        (err, result) => {
          if (err) throw err;
          callback(result, true);
        },
      );
    } catch (error) {
      console.log(error);
      callback(error, false);
    }
  }

  static getSongs(
    { id }: { id: number },
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query(
        `CALL GetAlbumSongs(?)`,
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

  static addSong(
    id_album: number,
    id_song: number,
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query("CALL AddSongAlbum(?,?)", [
        id_song,
        id_album,
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
    id_album: number,
    id_song: number,
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query("CALL RemoveSongAlbum(?,?)", [
        id_song,
        id_album,
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

  static editAlbum(
    newAlbum : UpdateAlbum,
    file: Express.MulterS3.File,
    callback: Function,
  ) {
    try {
      newAlbum.cover = file ? file.location : "";
      // Encriptando
      // Guardar en DB
      pool.query("CALL UpdateAlbum(?,?,?,?,?)", [
        newAlbum.id,
        newAlbum.name,
        newAlbum.description,
        newAlbum.cover,
        newAlbum.artist,
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

  static deleteAlbum(
    { id }: { id: number },
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query("CALL DeleteAlbum(?)", [
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
