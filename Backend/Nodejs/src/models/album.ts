import { pool } from "./database/connection";
import { Album } from "./types";

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
        `SELECT a.name,a.image AS singer ,ar.name AS cover FROM Albums a
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

  static getSongs(
    { id }: { id: number },
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query(
        `SELECT  FROM Albums_details ad
        JOIN Songs s ON ad.id_song=s.id_song
        WHERE ad.id_album=?`,
        id,
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

  static editAlbum({ data }: { data: any }) {
  }
  static deleteAlbum({ id }: { id: number }) {
  }
}
