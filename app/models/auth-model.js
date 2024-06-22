import db from "../config/database-config.js";

const getUserAdmin = async (value) => {
  const column = !isNaN(value) ? "users.user_id" : "users.user_email";
  const query = `
    SELECT * FROM users 
    ${!isNaN(value) ? "" : "JOIN roles ON users.user_role_id = roles.role_id"}
    WHERE ${column} = $1
  `;
  const values = [value];

  try {
    const { rows } = await db.query(query, values);
    return rows[0]; // Return the first user found
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Rethrow or handle as needed
  }
};

const getKandidat = async (value) => {
  const query = "SELECT * FROM kandidat WHERE OR kandidat_email = $1";
  const values = [value];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const getRelawan = async (value) => {
  const query = "SELECT * FROM relawan WHERE OR relawan_email = $1";
  const values = [value];
  const { rows } = await db.query(query, values);
  return rows[0];
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
  getUserAdmin,
  getKandidat,
  getRelawan,
  insertBlacklistToken,
  getBlacklistToken,
};
