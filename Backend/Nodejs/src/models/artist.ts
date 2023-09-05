import { pool } from "./database/connection";
import { Artist } from "./types";

export class ArtistModel {
  static async createArtist(artist: Artist, photo: Express.MulterS3.File) {
    const newAvatar: Artist = { ...artist };
    newAvatar.avatar = photo.location;
    // Guardar en DB
    console.log(newAvatar);
    return true;
  }
  static getArtist({ id }: { id: number }) {
    try {
      const res = pool.query(
        `SELECT * FROM Artist WHERE id_artist=${id}`,
        (error, result, fields) => {
          if (error) throw error;
          return result;
        },
      );
      return { res, ok: true };
    } catch (error) {
      console.log(error);
      return { error, ok: false };
    }
  }
  static editArtist({ data }: { data: any }) {
  }
  static deleteArtist({ id }: { id: number }) {
    try {
      const res = pool.query(
        `DELETE FROM Artist WHERE id_artist=${id}`,
        (error, result, fields) => {
          if (error) throw error;
          return result;
        },
      );
      return { res, ok: true };
    } catch (error) {
      console.log(error);
      return { error, ok: false };
    }
  }
}
