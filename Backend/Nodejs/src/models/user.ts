import { encrypt } from "../libs/object-hash";
import { formatDate } from "../utils/formatDate";
import { pool } from "./database/connection";
import { FavoriteSong, UpdateUser, User } from "./types";

export class UserModel {
  static createUser(
    user: User,
    file: Express.MulterS3.File,
    callback: Function,
  ) {
    try {
      const newUser: User = { ...user };
      newUser.avatar = file.location;
      // Encriptando
      const password = encrypt(newUser.password);
      console.log(password);
      // Guardar en DB
      pool.query("CALL Register(?,?,?,?,?,?)", [
        newUser.email,
        newUser.name,
        newUser.lastname,
        newUser.avatar,
        password,
        formatDate(newUser.birthDate),
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
  static async getUser({ email }: { email: string }, callback: Function) {
    try {
      pool.query(
        `SELECT * FROM Users WHERE email='${email}'`,
        (error, result, fields) => {
          if (error) throw error;
          callback(result[0], true);
        },
      );
    } catch (error) {
      callback(error, false);
    }
  }

  static editUser(
    newUser: UpdateUser,
    file: Express.MulterS3.File,
    callback: Function,
  ) {
    try {
      newUser.avatar = file?file.location:"";
      // Encriptando
      const password = encrypt(newUser.password);
      // Guardar en DB
      pool.query("CALL UpdateUser(?,?,?,?,?,?,?)", [
        newUser.email,
        newUser.newEmail,
        newUser.name,
        newUser.lastname,
        newUser.avatar,
        password,
        formatDate(newUser.birthDate),
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

  static addToFavorite(
    favorite: FavoriteSong,
    callback: (response: any, ok: Boolean) => void,
  ) {
    try {
      pool.query("CALL AddToFavorites(?,?)", [
        favorite.song,
        favorite.email,
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

  static getFavorites({ email }: { email: string }, callback: Function) {
    try {
      pool.query("CALL GetSongsInFavorites(?)", [
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
