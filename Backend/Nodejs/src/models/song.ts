import { pool } from "./database/connection";
import { Song, SongFiles } from "./types";

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
    { id }: { id: number },
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query(
        `SELECT s.name as name,a.name as singer,s.image as cover, s.file as musicSrc FROM Songs s  
          JOIN Song_artists sa ON s.id_song=sa.id_song
          JOIN Artists a ON sa.id_artist=a.id_artist
          WHERE s.id_song=?`,
        [id],
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

  static getSongs(callback: (response: any, ok: Boolean) => void) {
    try {
      pool.query(
        `SELECT s.name as name,a.name as singer,s.image as cover, s.file as musicSrc FROM Songs s  
          JOIN Song_artists sa ON s.id_song=sa.id_song
          JOIN Artists a ON sa.id_artist=a.id_artist`,
        (error, result, fields) => {
          if (error) throw error;
          callback(result, true);
        },
      );
    } catch (error) {
      console.log(error);
      callback(error, false);
    }
  }

  static editSong({ data }: { data: any }) {
  }
  static deleteSong({ id }: { id: number }) {
  }
  static addToFavorite({ userId, id }: { userId: number; id: number }) {
  }
}
