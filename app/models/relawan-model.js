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

const queryGetAllDataRelawan = `
  SELECT r.*, k.kandidat_nama, k.kandidat_id, rl.role
    FROM relawan r
    JOIN kandidat k ON r.relawan_kandidat_id = k.kandidat_id
    JOIN roles rl ON r.relawan_role_id = rl.role_id
`;

const create = async (data) => {
  const query = `
    INSERT INTO relawan 
    (relawan_nama, relawan_email, relawan_password, relawan_no_telp, relawan_usia, relawan_jenis_kelamin, relawan_foto, relawan_provinsi_kode, relawan_kab_kota_kode, relawan_status, relawan_kandidat_id, relawan_role_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *;
  `;
  const values = [
    data.relawan_nama,
    data.relawan_email,
    data.relawan_password,
    data.relawan_no_telp,
    data.relawan_usia,
    data.relawan_jenis_kelamin,
    data.relawan_foto,
    data.relawan_provinsi_kode,
    data.relawan_kab_kota_kode,
    data.relawan_status,
    data.relawan_kandidat_id,
    data.relawan_role_id,
  ];
  return executeQuery(query, values);
};

const get = async (id) => {
  const query = `${queryGetAllDataRelawan} WHERE relawan_id = $1`;
  return executeQuery(query, [id]);
};

const getByEmail = async (email) => {
  const query = `SELECT * FROM relawan WHERE relawan_email = $1`;
  return executeQuery(query, [email]);
};

const getByKandidatId = async (kandidatId) => {
  const query = `${queryGetAllDataRelawan} WHERE relawan_kandidat_id = $1`;
  try {
    const { rows } = await db.query(query, [kandidatId]);
    return rows;
  } catch (error) {
    console.error("Error fetching all relawan:", error);
    throw error;
  }
};

const getByAdminId = async (adminId) => {
  const query = `
  SELECT r.*
    FROM relawan r
    JOIN kandidat k ON r.relawan_kandidat_id = k.kandidat_id
    JOIN users u ON k.kandidat_admin_id = u.user_id
    WHERE u.user_id = $1`;
  try {
    const { rows } = await db.query(query, [adminId]);
    return rows;
  } catch (error) {
    console.error("Error fetching all relawan:", error);
    throw error;
  }
};

const getAll = async () => {
  const query = queryGetAllDataRelawan;
  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching all relawan:", error);
    throw error;
  }
};

const update = async (relawanId, data) => {
  const query = `
    UPDATE relawan
    SET relawan_nama = $1, relawan_email = $2, relawan_password = $3, relawan_no_telp = $4, relawan_usia = $5, relawan_jenis_kelamin = $6, relawan_foto = $7, relawan_provinsi_kode = $8, relawan_kab_kota_kode = $9, relawan_status = $10, relawan_role_id = $11
    WHERE relawan_id = $12
    RETURNING *;
  `;
  const values = [
    data.relawan_nama,
    data.relawan_email,
    data.relawan_password,
    data.relawan_no_telp,
    data.relawan_usia,
    data.relawan_jenis_kelamin,
    data.relawan_foto,
    data.relawan_provinsi_kode,
    data.relawan_kab_kota_kode,
    data.relawan_status,
    data.relawan_role_id,
    relawanId,
  ];
  return executeQuery(query, values);
};

const remove = async (id) => {
  const query = `DELETE FROM relawan WHERE relawan_id = $1 RETURNING *`;
  return executeQuery(query, [id]);
};

export default {
  create,
  get,
  getByEmail,
  getByAdminId,
  getByKandidatId,
  getAll,
  update,
  remove,
};
