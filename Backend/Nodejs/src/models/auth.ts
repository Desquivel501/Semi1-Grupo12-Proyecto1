import { pool } from "./database/connection";
import { Credentials } from "./types";

export class AuthModel {
  static login(credentials: Credentials, callback: Function) {
    try {
      pool.query(
        "CALL Login(?,?)",
        [credentials.email, credentials.password],
        (err, result) => {
          if (err) throw err;
          if (result[0][0].TYPE == "ERROR") callback(result[0][0], false);
          else {
            callback(result[0][0], true);
          }
        },
      );
    } catch (error) {
      callback(error, false);
    }
  }
  static logout({ id }: { id: number }) {
  }
}
