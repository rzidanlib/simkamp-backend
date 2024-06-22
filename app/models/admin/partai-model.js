import db from "../../config/database-config.js";

const create = async (data) => {
  const query = `INSERT INTO partai 
  (partai_label, partai_nama, partai_nomor, partai_logo) 
  VALUES ($1, $2, $3, $4) RETURNING *`;
  const { rows } = await db.query(query, [
    data.partai_label,
    data.partai_nama,
    data.partai_nomor,
    data.partai_logo,
  ]);
  return rows[0];
};

const get = async (partaiId) => {
  const query = `SELECT * FROM partai WHERE partai_id = $1`;
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
  let query = `UPDATE partai SET partai_label = $1, partai_nama = $2, partai_nomor = $3`;
  let params = [data.partai_label, data.partai_nama, data.partai_nomor];

  // If partai_logo is provided, add it to the query and parameters
  if (data.partai_logo) {
    query += `, partai_logo = $4 WHERE partai_id = $5 RETURNING *`;
    params.push(data.partai_logo, partaiId);
  } else {
    query += ` WHERE partai_id = $4 RETURNING *`;
    params.push(partaiId);
  }

  const { rows } = await db.query(query, params);
  return rows[0];
};

const remove = async (partaiId) => {
  const query = `DELETE FROM partai WHERE partai_id = $1`;
  await db.query(query, [partaiId]);
};

export default {
  create,
  get,
  getAll,
  update,
  remove,
};
