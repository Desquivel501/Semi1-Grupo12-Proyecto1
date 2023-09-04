import { createPool } from "mysql";
import "dotenv/config"


export const pool = createPool({
  connectionLimit: 50,
  host: "example.org",
  user: "",
  password: "secret",
  database: "my_db",
});
