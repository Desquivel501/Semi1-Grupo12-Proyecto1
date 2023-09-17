import { pool } from "./database/connection";

export class ReportModel {
  static addHistory(
    { email, song }: { email: string; song: string },
    callback: Function,
  ) {
    try {
      // Guardar en DB
      pool.query("CALL AddToHistory(?,?)", [
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
      callback(error, false);
    }
  }

  static topCanciones({ email }: { email: string }, callback: Function) {
    try {
      pool.query("CALL TopCanciones(?)", [
        email,
      ], (err, result) => {
        if (err) throw err;
        callback(result[0], true);
      });
    } catch (error) {
      callback(error, false);
    }
  }

  static topArtistas({ email }: { email: string }, callback: Function) {
    try {
      pool.query("CALL TopArtistas(?)", [
        email,
      ], (err, result) => {
        if (err) throw err;
        callback(result[0], true);
      });
    } catch (error) {
      callback(error, false);
    }
  }

  static topAlbumes({ email }: { email: string }, callback: Function) {
    try {
      pool.query("CALL TopAlbumes(?)", [
        email,
      ], (err, result) => {
        if (err) throw err;
        callback(result[0], true);
      });
    } catch (error) {
      callback(error, false);
    }
  }
}
