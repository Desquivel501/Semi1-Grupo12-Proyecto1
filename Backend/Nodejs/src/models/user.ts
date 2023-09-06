import { formatDate } from "../utils/formatDate";
import { pool } from "./database/connection";
import { User } from "./types";

export class UserModel {
  static createUser(
    user: User,
    file: Express.MulterS3.File,
    callback: Function,
  ) {
    try {
      const newUser: User = { ...user };
      newUser.avatar = file.location;
      // Guardar en DB
      pool.query("CALL Register(?,?,?,?,?,?)", [
        newUser.email,
        newUser.name,
        newUser.lastname,
        newUser.avatar,
        newUser.password,
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

  static editUser({ data }: { data: any }) {
  }
}
