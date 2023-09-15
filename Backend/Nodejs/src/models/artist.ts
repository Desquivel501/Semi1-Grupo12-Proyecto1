import { formatDate } from "../utils/formatDate";
import { pool } from "./database/connection";
import { Artist } from "./types";

export class ArtistModel {
  static async createArtist(
    artist: Artist,
    photo: Express.MulterS3.File,
    callback: Function,
  ) {
    try {
      const newArtist: Artist = { ...artist };
      newArtist.avatar = photo.location;
      // Guardar en DB
      pool.query("CALL CreateArtist(?,?,?)", [
        newArtist.name,
        newArtist.avatar,
        formatDate(newArtist.birthDate),
      ], (err, result) => {
        if (err) throw err;
        if (result[0][0].TYPE == "ERROR") callback(result[0][0], false);
        else {
          callback(result[0][0], true);
        }
      });
    } catch (error) {
      callback(error, false);
    }
  }

  static getArtist({ id }: { id: number }, callback: Function) {
    try {
      pool.query(
        `SELECT a.id_artist AS id, a.name,a.image AS cover,a.birthdate  FROM Artists a WHERE a.id_artist=${id}`,
        (error, result, fields) => {
          if (error) throw error;
          callback(result[0], true);
        },
      );
    } catch (error) {
      console.log(error);
      callback(error, false);
    }
  }

  static getArtists(callback: Function) {
    try {
      pool.query(
        `SELECT a.id_artist AS id, a.name,a.image AS cover,a.birthdate  FROM Artists a`,
        (error, result) => {
          if (error) throw error;
          callback(result, true);
        },
      );
    } catch (error) {
      console.log(error);
      callback(error, false);
    }
  }

  static getSongs({ id }: { id: number }, callback: Function) {
    try {
      pool.query("CALL GetArtistSongs(?)", [
        id,
      ], (err, result) => {
        if (err) throw err;
        callback(result[0], true);
      });
    } catch (error) {
      callback(error, false);
    }
  }

  static getSongsNotInAlbum({ id }: { id: number }, callback: Function) {
    try {
      pool.query("CALL GetArtistSongsNotInAlbum(?)", [
        id,
      ], (err, result) => {
        if (err) throw err;
        callback(result[0], true);
      });
    } catch (error) {
      callback(error, false);
    }
  }

  static editArtist({ data }: { data: any }) {
  }

  static deleteArtist({ id }: { id: number }, callback: Function) {
    try {
      pool.query("CALL DeleteArtist(?)", [
        id,
      ], (err, result) => {
        if (err) throw err;
        if (result[0][0].TYPE == "ERROR") callback(result[0][0], false);
        else {
          callback(result[0][0], true);
        }
      });
    } catch (error) {
      callback(error, false);
    }
  }
}
