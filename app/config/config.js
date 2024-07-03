import dotenv from "dotenv";
dotenv.config({ path: `${process.cwd()}/.env.development` });
// dotenv.config();

const config = {
  development: {
    // DB CONFIG
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",

    // JWT Config
    secretKey: process.env.JWT_SECRET,
  },
  production: {
    // DB CONFIG
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",

    // JWT Config
    secretKey: process.env.JWT_SECRET,
  },
};

export default config;
