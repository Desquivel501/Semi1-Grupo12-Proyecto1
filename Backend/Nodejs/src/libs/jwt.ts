import jwt from "jsonwebtoken";
const JWT_KEY = process.env.JWT_KEY as string;
export function newToken(data: any) {
  const token = jwt.sign(data, JWT_KEY, {
    algorithm: "HS256",
    expiresIn: "24h",
  });
  return token;
}
export function checkToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    return decoded;
  } catch (error) {
    return ""
  }
}
