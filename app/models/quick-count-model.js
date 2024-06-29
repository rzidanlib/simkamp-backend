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

const queryGetAllDataQuickCount = `
  SELECT qc.*, re.relawan_nama 
  FROM quick_count qc
  JOIN relawan re ON qc.quick_count_relawan_id = re.relawan_id
`;

const create = async (data) => {
  const query = `
    INSERT INTO quick_count 
    (quick_count_provinsi, quick_count_kab_kota, quick_count_kecamatan, quick_count_kelurahan, quick_count_jumlah_suara, quick_count_relawan_id, quick_count_foto, quick_count_tps)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [
    data.quick_count_provinsi,
    data.quick_count_kab_kota,
    data.quick_count_kecamatan,
    data.quick_count_kelurahan,
    data.quick_count_jumlah_suara,
    data.quick_count_relawan_id,
    data.quick_count_foto,
    data.quick_count_tps,
  ];
  return executeQuery(query, values);
};

const get = async (id) => {
  const query = `${queryGetAllDataQuickCount} WHERE quick_count_id = $1`;
  return executeQuery(query, [id]);
};

const getAll = async () => {
  const query = queryGetAllDataQuickCount;
  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching all quick counts:", error);
    throw error;
  }
};

const getByRelawanId = async (relawanId) => {
  const query = `${queryGetAllDataQuickCount} WHERE quick_count_relawan_id = $1`;
  try {
    const { rows } = await db.query(query, [relawanId]);
    return rows;
  } catch (error) {
    console.error("Error fetching quick counts by relawan id:", error);
    throw error;
  }
};

const getByKandidatId = async (kandidatId) => {
  const query = `
    SELECT qc.*
    FROM quick_count qc
    JOIN relawan r ON qc.quick_count_relawan_id = r.relawan_id
    JOIN kandidat k ON r.relawan_kandidat_id = k.kandidat_id
    WHERE k.kandidat_id = $1
  `;
  try {
    const { rows } = await db.query(query, [kandidatId]);
    return rows;
  } catch (error) {
    console.error("Error fetching quick counts by kandidat id:", error);
    throw error;
  }
};

const getByAdminId = async (adminId) => {
  const query = `
    SELECT qc.*
    FROM quick_count qc
    JOIN relawan r ON qc.quick_count_relawan_id = r.relawan_id
    JOIN kandidat k ON r.relawan_kandidat_id = k.kandidat_id
    JOIN users u ON k.kandidat_admin_id = u.user_id
    WHERE u.user_id = $1
  `;
  try {
    const { rows } = await db.query(query, [adminId]);
    return rows;
  } catch (error) {
    console.error("Error fetching quick counts by admin id:", error);
    throw error;
  }
};

const update = async (quickCountId, data) => {
  const query = `
    UPDATE quick_count
    SET quick_count_provinsi = $1, quick_count_kab_kota = $2, quick_count_kecamatan = $3, quick_count_kelurahan = $4, quick_count_jumlah_suara = $5, quick_count_foto = $6, quick_count_tps = $7
    WHERE quick_count_id = $8
    RETURNING *;
  `;
  const values = [
    data.quick_count_provinsi,
    data.quick_count_kab_kota,
    data.quick_count_kecamatan,
    data.quick_count_kelurahan,
    data.quick_count_jumlah_suara,
    data.quick_count_foto,
    data.quick_count_tps,
    quickCountId,
  ];
  return executeQuery(query, values);
};

const remove = async (id) => {
  const query = `DELETE FROM quick_count WHERE quick_count_id = $1 RETURNING *`;
  return executeQuery(query, [id]);
};

export default {
  create,
  get,
  getAll,
  getByAdminId,
  getByKandidatId,
  getByRelawanId,
  update,
  remove,
};
