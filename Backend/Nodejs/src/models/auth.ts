import { pool } from "./database/connection";
import { Credentials } from "./types";

export class AuthModel {
  static async login(credentials: Credentials) {
    try {
      const response = pool.query("", (err, result) => {
        if (err) throw err;
        return result;
      });
      return { ok: true, response };
    } catch (error) {
      console.log(error);
      return { ok: false, error };
    }
  }
  static logout({ id }: { id: number }) {
  }
}
