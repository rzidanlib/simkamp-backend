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

export const getAllUsers = async () => {
  const query = `SELECT * FROM users`;
  const { rows } = await db.query(query);
  return rows;
};

export const getUserById = async (id) => {
  const query = `SELECT * FROM users WHERE id = $1`;
  const values = [id];
  const { rows } = await db.query(query, values);
  return rows[0];
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

export const updateUser = async (id, data) => {
  const query = `
    UPDATE users
    SET
      username = $1,
      email = $2,
      nama_user = $3,
      no_hp = $4,
      password = $5
    WHERE id = $6
    RETURNING *;
  `;
  const values = [
    data.username,
    data.email,
    data.nama_user,
    data.no_hp,
    data.password,
    id,
  ];
  const result = await db.query(query, values);
  return result.rows[0];
};
