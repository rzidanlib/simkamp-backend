import db from "../../config/database-config.js";

const create = async (data) => {
  const query = `
      INSERT INTO users 
      (email, password, role_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
  const values = [data.email, data.password, data.role_id];
  const result = await db.query(query, values);
  return result.rows[0];
};

const get = async (id) => {
  const query = `SELECT * FROM users WHERE id = $1`;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

const getByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [email];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const getAll = async () => {
  const query = `SELECT 
  id, email, role_id
  FROM users`;
  const { rows } = await db.query(query);
  return rows;
};

const update = async (userId, data) => {
  const query = `
    UPDATE users
    SET email = $1, password = $2
    WHERE id = $3
    RETURNING *;
  `;
  const values = [data.email, data.password, userId];
  const result = await db.query(query, values);
  return result.rows[0];
};

const remove = async (id) => {
  const query = `DELETE FROM users WHERE id = $1 RETURNING *`;
  const values = [id];
  const result = await db.query(query, values);
  return result.rows[0];
};

export default {
  create,
  get,
  getByEmail,
  getAll,
  update,
  remove,
};
