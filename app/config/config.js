import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.APP_PORT,
  secretKey: process.env.JWT_SECRET,

  // DB CONFIG
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_dialect: "postgres",
};

export default config;
