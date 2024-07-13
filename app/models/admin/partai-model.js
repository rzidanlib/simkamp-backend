import db from "../../config/database-config.js";

const create = async (data) => {
  const query = `INSERT INTO partai 
  (akronim, nama_partai, nomor, logo) 
  VALUES ($1, $2, $3, $4) RETURNING *`;
  const { rows } = await db.query(query, [
    data.akronim,
    data.nama_partai,
    data.nomor,
    data.logo,
  ]);
  return rows[0];
};

const get = async (partaiId) => {
  const query = `SELECT * FROM partai WHERE id = $1`;
  const { rows } = await db.query(query, [partaiId]);
  return rows[0];
};

const getAll = async () => {
  const query = `SELECT * FROM partai`;
  const { rows } = await db.query(query);
  return rows;
};

const update = async (partaiId, data) => {
  // Build the base query and parameters excluding partai_logo
  let query = `UPDATE partai SET akronim = $1, nama_partai = $2, nomor = $3`;
  let params = [data.akronim, data.nama_partai, data.nomor];

  // If partai_logo is provided, add it to the query and parameters
  if (data.logo) {
    query += `, logo = $4 WHERE id = $5 RETURNING *`;
    params.push(data.logo, partaiId);
  } else {
    query += ` WHERE id = $4 RETURNING *`;
    params.push(partaiId);
  }

  const { rows } = await db.query(query, params);
  return rows[0];
};

const remove = async (partaiId) => {
  const query = `DELETE FROM partai WHERE id = $1`;
  await db.query(query, [partaiId]);
};

export default {
  create,
  get,
  getAll,
  update,
  remove,
};
