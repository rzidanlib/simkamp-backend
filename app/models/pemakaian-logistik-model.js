import db from "../config/database-config.js";

// Utility function for executing queries with error handling
const executeQuery = async (query, values = []) => {
  try {
    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

// Utility function for handling database transactions
const executeTransaction = async (actions) => {
  try {
    await db.query("BEGIN");
    const result = await actions();
    await db.query("COMMIT");
    return result;
  } catch (error) {
    await db.query("ROLLBACK");
    throw error;
  }
};

const queryBase = `
  SELECT pl.*, lg.logistik_nama_atribut, re.relawan_nama 
  FROM pemakaian_logistik pl
  JOIN logistik lg ON pl.pemakaian_logistik_id = lg.logistik_id
  JOIN relawan re ON pl.pemakaian_relawan_id = re.relawan_id
`;

const create = async (data) => {
  const query = `
    INSERT INTO pemakaian_logistik 
    (pemakaian_tanggal, pemakaian_jumlah, pemakaian_logistik_id, pemakaian_relawan_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  return executeTransaction(() => executeQuery(query, Object.values(data)));
};

const get = async (id) => {
  const query = `${queryBase} WHERE pemakaian_id = $1`;
  const [result] = await executeQuery(query, [id]);
  return result;
};

const getAll = async () => {
  return executeQuery(queryBase);
};

const getByRelawanId = async (relawanId) => {
  const query = `${queryBase} WHERE pemakaian_relawan_id = $1`;
  return executeQuery(query, [relawanId]);
};

const update = async (pemakaianId, data) => {
  const query = `
    UPDATE pemakaian_logistik
    SET pemakaian_tanggal = $1, pemakaian_jumlah = $2, pemakaian_logistik_id = $3
    WHERE pemakaian_id = $4
    RETURNING *;
  `;
  const values = [...Object.values(data), pemakaianId];
  return executeTransaction(() => executeQuery(query, values));
};

const remove = async (id) => {
  const query = `DELETE FROM pemakaian_logistik WHERE pemakaian_id = $1 RETURNING *`;
  return executeTransaction(() => executeQuery(query, [id]));
};

export default {
  create,
  get,
  getAll,
  getByRelawanId,
  update,
  remove,
};
