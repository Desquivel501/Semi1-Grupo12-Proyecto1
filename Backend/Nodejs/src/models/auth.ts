import { encrypt } from "../libs/object-hash";
import { pool } from "./database/connection";
import { Credentials } from "./types";

export class AuthModel {
  static login(credentials: Credentials, callback: Function) {
    try {
      const password = encrypt(credentials.password) 
      console.log(password)
      pool.query(
        "CALL Login(?,?)",
        [credentials.email, password],
        (err, result) => {
          if (err) throw err;
          if (result[0][0].TYPE == "ERROR") callback(result[0][0], false);
          else {
            callback(result[0][0], true);
          }
        },
      );
    } catch (error) {
      console.log(error)
      callback(error, false);
    }
  }
  static logout({ id }: { id: number }) {
  }
}
