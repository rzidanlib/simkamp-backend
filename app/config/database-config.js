import pg from "pg";
import config from "./config.js";

const { Pool } = pg;

const db = new Pool({
  user: config.db_username,
  password: config.db_password,
  host: config.db_host,
  port: config.db_port,
  database: config.db_name,
});

export default db;
