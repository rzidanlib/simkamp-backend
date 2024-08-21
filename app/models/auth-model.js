import db from "../config/database-config.js";

const getUser = async (userEmail) => {
  const query = `
    SELECT * FROM users
    WHERE email = $1
  `;
  const result = await db.query(query, [userEmail]);
  return result.rows[0];
};

const insertBlacklistToken = async (token, expiry) => {
  const query = "INSERT INTO token_blacklist (token, expiry) VALUES ($1, $2)";
  const values = [token, expiry];
  await db.query(query, values);
};

const getBlacklistToken = async (token) => {
  const query = `SELECT * FROM token_blacklist WHERE token = $1`;
  const values = [token];
  const result = await db.query(query, values);
  return result.rows[0];
};

export default {
  getUser,
  insertBlacklistToken,
  getBlacklistToken,
};
