import db from "../../config/database-config.js";

const create = async (data) => {
  const query = `INSERT INTO jenis_pemilihan (jenis_pemilihan) VALUES ($1) RETURNING *`;
  const result = await db.query(query, [data.jenis_pemilihan]);
  return result.rows[0];
};

const get = async (id) => {
  const query = `SELECT * FROM jenis_pemilihan WHERE jenis_pemilihan_id = $1`;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

const getAll = async () => {
  const query = `SELECT * FROM jenis_pemilihan`;
  const { rows } = await db.query(query);
  return rows;
};

const update = async (jenisPemilihanId, data) => {
  const query = `
    UPDATE jenis_pemilihan
    SET jenis_pemilihan = $1
    WHERE jenis_pemilihan_id = $2
  `;
  const values = [data.jenis_pemilihan, jenisPemilihanId];
  const result = await db.query(query, values);
  return result.rows[0];
};

const remove = async (id) => {
  const query = `DELETE FROM jenis_pemilihan WHERE jenis_pemilihan_id = $1`;
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
