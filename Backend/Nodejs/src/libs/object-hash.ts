import { createHash } from "crypto";

export function encrypt(value: string) {
  let shasum = createHash("sha1");
  shasum.update(value);
  let hashed_string = shasum.digest("hex");
  return hashed_string;
}
