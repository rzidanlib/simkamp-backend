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

const queryGetAllDataCalonPemilih = `
  SELECT cp.*, r.relawan_nama
    FROM calon_pemilih cp
    JOIN relawan r ON cp.calon_pemilih_relawan_id = r.relawan_id
`;

const create = async (data) => {
  const query = `
    INSERT INTO calon_pemilih 
    (calon_pemilih_nama, calon_pemilih_no_telp, calon_pemilih_foto, calon_pemilih_foto_ktp, calon_pemilih_provinsi, calon_pemilih_kab_kota, calon_pemilih_kecamatan, calon_pemilih_kelurahan, calon_pemilih_status, calon_pemilih_relawan_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
  `;
  const values = [
    data.calon_pemilih_nama,
    data.calon_pemilih_no_telp,
    data.calon_pemilih_foto,
    data.calon_pemilih_foto_ktp,
    data.calon_pemilih_provinsi,
    data.calon_pemilih_kab_kota,
    data.calon_pemilih_kecamatan,
    data.calon_pemilih_kelurahan,
    data.calon_pemilih_status,
    data.calon_pemilih_relawan_id,
  ];
  return executeQuery(query, values);
};

const get = async (id) => {
  const query = `${queryGetAllDataCalonPemilih} WHERE calon_pemilih_id = $1`;
  return executeQuery(query, [id]);
};

const getByRelawanId = async (relawanId) => {
  const query = `${queryGetAllDataCalonPemilih} WHERE calon_pemilih_relawan_id = $1`;
  try {
    const { rows } = await db.query(query, [relawanId]);
    return rows;
  } catch (error) {
    console.error("Error fetching all calon pemilih:", error);
    throw error;
  }
};

const getAll = async () => {
  const query = queryGetAllDataCalonPemilih;
  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching all calon pemilih:", error);
    throw error;
  }
};

const update = async (calonPemilihId, data) => {
  const query = `
    UPDATE calon_pemilih
    SET calon_pemilih_nama = $1, calon_pemilih_no_telp = $2, calon_pemilih_foto = $3, calon_pemilih_foto_ktp = $4, calon_pemilih_provinsi = $5, calon_pemilih_kab_kota = $6, calon_pemilih_kecamatan = $7, calon_pemilih_kelurahan = $8, calon_pemilih_status = $9
    WHERE calon_pemilih_id = $10
    RETURNING *;
  `;
  const values = [
    data.calon_pemilih_nama,
    data.calon_pemilih_no_telp,
    data.calon_pemilih_foto,
    data.calon_pemilih_foto_ktp,
    data.calon_pemilih_provinsi,
    data.calon_pemilih_kab_kota,
    data.calon_pemilih_kecamatan,
    data.calon_pemilih_kelurahan,
    data.calon_pemilih_status,
    calonPemilihId,
  ];
  return executeQuery(query, values);
};

const remove = async (id) => {
  const query = `DELETE FROM calon_pemilih WHERE calon_pemilih_id = $1 RETURNING *`;
  return executeQuery(query, [id]);
};

export default {
  create,
  get,
  getByRelawanId,
  getAll,
  update,
  remove,
};
