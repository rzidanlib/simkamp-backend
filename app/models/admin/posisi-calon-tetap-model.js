import db from "../../config/database-config.js";

const create = async (data) => {
  const query = `INSERT INTO posisi_calon_tetap (posisi_calon_tetap) VALUES ($1) RETURNING *`;
  const result = await db.query(query, [data.posisi_calon_tetap]);
  return result.rows[0];
};

const get = async (id) => {
  const query = `SELECT * FROM posisi_calon_tetap WHERE posisi_calon_tetap_id = $1`;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

const getAll = async () => {
  const query = `SELECT * FROM posisi_calon_tetap`;
  const { rows } = await db.query(query);
  return rows;
};

const update = async (id, data) => {
  const query = `
    UPDATE posisi_calon_tetap
    SET posisi_calon_tetap = $1
    WHERE posisi_calon_tetap_id = $2
  `;
  const values = [data.posisi_calon_tetap, id];
  const result = await db.query(query, values);
  return result.rows[0];
};

const remove = async (id) => {
  const query = `DELETE FROM posisi_calon_tetap WHERE posisi_calon_tetap_id = $1`;
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
