import db from "../config/database-config.js";

const executeQuery = async (query, values = []) => {
  try {
    const { rows } = await db.query(query, values);
    return rows[0] || null;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

const queryGetAllDataLogistik = `
  SELECT lg.*, re.relawan_nama 
  FROM logistik lg
  JOIN relawan re ON lg.logistik_relawan_id = re.relawan_id
`;

const create = async (data) => {
  const query = `
    INSERT INTO logistik 
    (logistik_nama_atribut, logistik_satuan_unit, logistik_stok, logistik_total_harga, logistik_relawan_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [
    data.logistik_nama_atribut,
    data.logistik_satuan_unit,
    data.logistik_stok,
    data.logistik_total_harga,
    data.logistik_relawan_id,
  ];
  return executeQuery(query, values);
};

const get = async (id) => {
  const query = `${queryGetAllDataLogistik} WHERE logistik_id = $1`;
  return executeQuery(query, [id]);
};

const getAll = async () => {
  const query = queryGetAllDataLogistik;
  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching all logistik:", error);
    throw error;
  }
};

const getByRelawanId = async (relawanId) => {
  const query = `${queryGetAllDataLogistik} WHERE logistik_relawan_id = $1`;
  try {
    const { rows } = await db.query(query, [relawanId]);
    return rows;
  } catch (error) {
    console.error("Error fetching logistik by relawan id:", error);
    throw error;
  }
};

const update = async (logistikId, data) => {
  const query = `
    UPDATE logistik
    SET logistik_nama_atribut = $1, logistik_satuan_unit = $2, logistik_stok = $3, logistik_total_harga = $4
    WHERE logistik_id = $5
    RETURNING *;
  `;
  const values = [
    data.logistik_nama_atribut,
    data.logistik_satuan_unit,
    data.logistik_stok,
    data.logistik_total_harga,
    logistikId,
  ];
  return executeQuery(query, values);
};

const remove = async (id) => {
  const query = `DELETE FROM logistik WHERE logistik_id = $1 RETURNING *`;
  return executeQuery(query, [id]);
};

export default {
  create,
  get,
  getAll,
  getByRelawanId,
  update,
  remove,
};
