import { User } from "./types";

export class UserModel {
  static async createUser(user: User, file: Express.MulterS3.File) {
    const newUser: User = { ...user };
    newUser.avatar = file.location;
    // Guardar en DB
    console.log(newUser);
    return true;
  }
  static async getUser({ email }: { email: string }) {
    try {
      /*const res = pool.query(
        `SELECT * FROM User WHERE Email=${email}`,
        (error, result, fields) => {
          if (error) throw error;
          return result;
        },
      );*/
      return { res: "", ok: true };
    } catch (error) {
      console.log(error);
      return { error, ok: false };
    }
  }

  static editUser({ data }: { data: any }) {
  }
}
