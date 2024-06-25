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

const queryGetAllDataArusKas = `
  SELECT ak.*, re.relawan_nama 
  FROM arus_kas ak
  JOIN relawan re ON ak.aruskas_relawan_id = re.relawan_id
`;

const create = async (data) => {
  const query = `
    INSERT INTO arus_kas 
    (aruskas_kategori, aruskas_foto_kuitansi, aruskas_detail, aruskas_catatan, aruskas_jumlah, aruskas_relawan_id, aruskas_tanggal)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [
    data.aruskas_kategori,
    data.aruskas_foto_kuitansi,
    data.aruskas_detail,
    data.aruskas_catatan,
    data.aruskas_jumlah,
    data.aruskas_relawan_id,
    data.aruskas_tanggal,
  ];
  return executeQuery(query, values);
};

const get = async (id) => {
  const query = `${queryGetAllDataArusKas} WHERE aruskas_id = $1`;
  return executeQuery(query, [id]);
};

const getAll = async () => {
  const query = queryGetAllDataArusKas;
  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching all arus kas:", error);
    throw error;
  }
};

const getByRelawanId = async (relawanId) => {
  const query = `${queryGetAllDataArusKas} WHERE aruskas_relawan_id = $1`;
  try {
    const { rows } = await db.query(query, [relawanId]);
    return rows;
  } catch (error) {
    console.error("Error fetching all arus kas:", error);
    throw error;
  }
};

const update = async (aruskasId, data) => {
  const query = `
    UPDATE arus_kas
    SET aruskas_kategori = $1, aruskas_foto_kuitansi = $2, aruskas_detail = $3, aruskas_catatan = $4, aruskas_jumlah = $5, aruskas_tanggal = $6
    WHERE aruskas_id = $7
    RETURNING *;
  `;
  const values = [
    data.aruskas_kategori,
    data.aruskas_foto_kuitansi,
    data.aruskas_detail,
    data.aruskas_catatan,
    data.aruskas_jumlah,
    data.aruskas_tanggal,
    aruskasId,
  ];
  return executeQuery(query, values);
};

const remove = async (id) => {
  const query = `DELETE FROM arus_kas WHERE aruskas_id = $1 RETURNING *`;
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
