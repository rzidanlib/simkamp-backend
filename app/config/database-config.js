import pg from "pg";
import config from "./config.js";

const { Pool } = pg;

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const db = new Pool({
  user: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
});

export default db;
