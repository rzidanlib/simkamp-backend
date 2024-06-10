import db from "../config/database-config.js";

export const insertUser = async (userData) => {
  const {
    kode_user,
    username,
    email,
    password,
    nama_user,
    no_hp,
    partai,
    role,
  } = userData;
  const query = `
      INSERT INTO users (kode_user, username, email, password, nama_user, no_hp, partai, role)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
  const values = [
    kode_user,
    username,
    email,
    password,
    nama_user,
    no_hp,
    partai,
    role,
  ];
  const result = await db.query(query, values);
  return result.rows[0];
};

export const getTotalUser = async () => {
  const query = `SELECT COUNT(*) AS total_users from users`;
  const { rows } = await db.query(query);
  return rows[0].total_users;
};

export const getCurrentUser = async (id) => {
  const query = `
    SELECT kode_user, username, email, nama_user, no_hp, partai, role
    FROM users
    WHERE id = $1
  `;
  const values = [id];
  const { rows } = await db.query(query, values);
  return rows[0];
};
