import db from "../../config/database-config.js";

const create = async (data) => {
  const query = `INSERT INTO dapil (dapil_nama, dapil_provinsi) VALUES ($1, $2) RETURNING *`;
  const values = [data.dapil_nama, data.dapil_provinsi];
  const result = await db.query(query, values);
  return result.rows[0];
};

const get = async (id) => {
  const query = `SELECT * FROM dapil WHERE dapil_id = $1`;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

const getAll = async () => {
  const query = `SELECT * FROM dapil`;
  const { rows } = await db.query(query);
  return rows;
};

const update = async (dapilId, data) => {
  const query = `
    UPDATE dapil
    SET dapil_nama = $1, dapil_provinsi = $2
    WHERE dapil_id = $3
  `;
  const values = [data.dapil_nama, data.dapil_provinsi, dapilId];
  const result = await db.query(query, values);
  return result.rows[0];
};

const remove = async (id) => {
  const query = `DELETE FROM dapil WHERE dapil_id = $1`;
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
