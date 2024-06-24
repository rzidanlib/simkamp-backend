import db from "../../config/database-config.js";

const executeQuery = async (query, values = []) => {
  try {
    const { rows } = await db.query(query, values);
    return rows[0] || null;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

const queryGetAllDataKandidat = `
  SELECT k.*, ag.agama, p.partai_label, a.user_nama, d.dapil_nama, jp.jenis_pemilihan, pct.posisi_calon_tetap, r.role
    FROM kandidat k
    JOIN agama ag ON k.kandidat_agama_id = ag.agama_id
    JOIN dapil d ON k.kandidat_dapil_id = d.dapil_id
    JOIN partai p ON k.kandidat_partai_id = p.partai_id
    JOIN users a ON k.kandidat_admin_id = a.user_id
    JOIN jenis_pemilihan jp ON k.kandidat_jenis_pemilihan_id = jp.jenis_pemilihan_id
    JOIN posisi_calon_tetap pct ON k.kandidat_posisi_calon_tetap_id = pct.posisi_calon_tetap_id
    JOIN roles r ON k.kandidat_role_id = r.role_id
`;

const create = async (data) => {
  const query = `
    INSERT INTO kandidat 
    (kandidat_nama, kandidat_email, kandidat_password, kandidat_no_telp, kandidat_agama_id, kandidat_foto, kandidat_usia, kandidat_partai_id, kandidat_alamat, kandidat_admin_id, kandidat_dapil_id, kandidat_jenis_pemilihan_id, kandidat_posisi_calon_tetap_id, kandidat_jenis_kelamin, kandidat_role_id, kandidat_nomor_urut)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    RETURNING *;
  `;
  const values = [
    data.kandidat_nama,
    data.kandidat_email,
    data.kandidat_password,
    data.kandidat_no_telp,
    data.kandidat_agama_id,
    data.kandidat_foto,
    data.kandidat_usia,
    data.kandidat_partai_id,
    data.kandidat_alamat,
    data.kandidat_admin_id,
    data.kandidat_dapil_id,
    data.kandidat_jenis_pemilihan_id,
    data.kandidat_posisi_calon_tetap_id,
    data.kandidat_jenis_kelamin,
    data.kandidat_role_id,
    data.kandidat_nomor_urut,
  ];
  return executeQuery(query, values);
};

const get = async (id) => {
  const query = `${queryGetAllDataKandidat} WHERE kandidat_id = $1`;
  return executeQuery(query, [id]);
};

const getByEmail = async (email) => {
  const query = `SELECT * FROM kandidat WHERE kandidat_email = $1`;
  return executeQuery(query, [email]);
};

const getByAdminId = async (adminId) => {
  const query = `${queryGetAllDataKandidat} WHERE kandidat_admin_id = $1`;
  try {
    const { rows } = await db.query(query, [adminId]);
    return rows;
  } catch (error) {
    console.error("Error fetching all candidates:", error);
    throw error;
  }
};

const getAll = async () => {
  const query = queryGetAllDataKandidat;
  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching all candidates:", error);
    throw error;
  }
};

const update = async (kandidatId, data) => {
  const query = `
    UPDATE kandidat
    SET kandidat_nama = $1, kandidat_email = $2, kandidat_password = $3, kandidat_no_telp = $4, kandidat_agama_id = $5, kandidat_foto = $6, kandidat_usia = $7, kandidat_partai_id = $8, kandidat_alamat = $9, kandidat_dapil_id = $10, kandidat_jenis_pemilihan_id = $11, kandidat_posisi_calon_tetap_id = $12, kandidat_jenis_kelamin = $13, kandidat_role_id = $14, kandidat_nomor_urut = $15
    WHERE kandidat_id = $16
    RETURNING *;
  `;
  const values = [
    data.kandidat_nama,
    data.kandidat_email,
    data.kandidat_password,
    data.kandidat_no_telp,
    data.kandidat_agama_id,
    data.kandidat_foto,
    data.kandidat_usia,
    data.kandidat_partai_id,
    data.kandidat_alamat,
    data.kandidat_dapil_id,
    data.kandidat_jenis_pemilihan_id,
    data.kandidat_posisi_calon_tetap_id,
    data.kandidat_jenis_kelamin,
    data.kandidat_role_id,
    data.kandidat_nomor_urut,
    kandidatId,
  ];
  return executeQuery(query, values);
};

const remove = async (id) => {
  const query = `DELETE FROM kandidat WHERE kandidat_id = $1 RETURNING *`;
  return executeQuery(query, [id]);
};

export default {
  create,
  get,
  getByEmail,
  getByAdminId,
  getAll,
  update,
  remove,
};
