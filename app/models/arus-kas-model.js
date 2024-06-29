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

const getArusKasByKandidatId = async (kandidatId) => {
  const query = `
    SELECT ak.*
    FROM arus_kas ak
    JOIN relawan r ON ak.aruskas_relawan_id = r.relawan_id
    JOIN kandidat k ON r.relawan_kandidat_id = k.kandidat_id
    WHERE k.kandidat_id = $1
  `;
  try {
    const { rows } = await db.query(query, [kandidatId]);
    return rows;
  } catch (error) {
    console.error("Error fetching aruskas by kandidatId:", error);
    throw error;
  }
};

const getArusKasByAdminId = async (adminId) => {
  const query = `
    SELECT ak.*
    FROM arus_kas ak
    JOIN relawan r ON ak.aruskas_relawan_id = r.relawan_id
    JOIN kandidat k ON r.relawan_kandidat_id = k.kandidat_id
    JOIN users u ON k.kandidat_admin_id = u.user_id
    WHERE u.user_id = $1
  `;
  try {
    const { rows } = await db.query(query, [adminId]);
    return rows;
  } catch (error) {
    console.error("Error fetching aruskas by adminId:", error);
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
  getArusKasByKandidatId,
  getArusKasByAdminId,
  update,
  remove,
};
