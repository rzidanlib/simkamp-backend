import db from "../config/database-config.js";

export const getUserByUsernameOrEmail = async (value) => {
  const query = "SELECT * FROM users WHERE username = $1 OR email = $1";
  const values = [value];
  const { rows } = await db.query(query, values);
  return rows[0];
};

export const insertBlacklistToken = async (token, expiry) => {
  const query = "INSERT INTO token_blacklist (token, expiry) VALUES ($1, $2)";
  const values = [token, expiry];
  await db.query(query, values);
};

export const getBlacklistToken = async (token) => {
  const query = `SELECT * FROM token_blacklist WHERE token = $1`;
  const values = [token];
  const result = await db.query(query, values);
  return result.rows[0];
};
