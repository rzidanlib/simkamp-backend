import db from "../../config/database-config.js";

const create = async (data) => {
  const query = `INSERT INTO agama (agama) VALUES ($1) RETURNING *`;
  const values = [data.agama];
  const result = await db.query(query, values);
  return result.rows[0];
};

const get = async (id) => {
  const query = `SELECT * FROM agama WHERE agama_id = $1`;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

const getAll = async () => {
  const query = `SELECT * FROM agama`;
  const { rows } = await db.query(query);
  return rows;
};

const update = async (agamaId, data) => {
  const query = `
    UPDATE agama
    SET agama = $1
    WHERE agama_id = $2
  `;
  const values = [data.agama, agamaId];
  const result = await db.query(query, values);
  return result.rows[0];
};

const remove = async (id) => {
  const query = `DELETE FROM agama WHERE agama_id = $1`;
  const result = await db.query(query, [id]);
  return result.rows[0];
};

export default {
  create,
  get,
  getAll,
  update,
  remove,
};
