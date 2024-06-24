import db from "../../config/database-config.js";

const create = async (data) => {
  const query = `
      INSERT INTO users 
      (user_nama, user_email, user_password, user_no_telp, user_partai_id, user_role_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
  const values = [
    data.user_nama,
    data.user_email,
    data.user_password,
    data.user_no_telp,
    data.user_partai_id,
    data.user_role_id,
  ];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getById = async (id) => {
  const query = `SELECT * FROM users WHERE user_id = $1`;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

const getByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE user_email = $1`;
  const values = [email];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const getAll = async () => {
  const query = `SELECT 
  user_id, user_nama, user_email, user_no_telp, user_partai_id, user_role_id
  FROM users`;
  const { rows } = await db.query(query);
  return rows;
};

const updateCurrent = async (userId, data) => {
  const query = `
    UPDATE users
    SET user_nama = $1, user_email = $2, user_password = $3, user_no_telp = $4
    WHERE user_id = $5
  `;
  const values = [
    data.user_nama,
    data.user_email,
    data.user_password,
    data.user_no_telp,
    userId,
  ];
  const result = await db.query(query, values);
  return result.rows[0];
};

const remove = async (id) => {
  const query = `DELETE FROM users WHERE user_id = $1 RETURNING *`;
  const values = [id];
  const result = await db.query(query, values);
  return result.rows[0];
};

export default {
  create,
  getById,
  getByEmail,
  getAll,
  updateCurrent,
  remove,
};
