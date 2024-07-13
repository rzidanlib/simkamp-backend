import db from "../../config/database-config.js";

const create = async (data) => {
  const query = `
	INSERT INTO admin_partai (user_id, nama_lengkap, nomor_telepon, alamat, partai_id, posisi, dapil_id, foto_profil)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
	RETURNING *;
  `;
  const values = [
    data.user_id,
    data.nama_lengkap,
    data.nomor_telepon,
    data.alamat,
    data.partai_id,
    data.posisi,
    data.dapil_id,
    data.foto_profil,
  ];
  const res = await db.query(query, values);
  return res.rows[0];
};

const get = async (adminId) => {
  const query = `
	SELECT * FROM admin_partai WHERE id = $1;
  `;
  const res = await db.query(query, [adminId]);
  return res.rows[0];
};

const getAll = async () => {
  const query = `
  SELECT * FROM admin_partai;
  `;
  const res = await db.query(query);
  return res.rows;
};

const update = async (adminId, data) => {
  const query = `
	UPDATE admin_partai
	SET nama_lengkap = $2, nomor_telepon = $3, alamat = $4, partai_id = $5, posisi = $6, dapil_id = $7, foto_profil = $8
	WHERE id = $1
	RETURNING *;
  `;
  const values = [
    adminId,
    data.nama_lengkap,
    data.nomor_telepon,
    data.alamat,
    data.partai_id,
    data.posisi,
    data.dapil_id,
    data.foto_profil,
  ];
  const res = await db.query(query, values);
  return res.rows[0];
};

const remove = async (adminId) => {
  const query = `
	DELETE FROM admin_partai WHERE id = $1;
  `;
  await db.query(query, [adminId]);
};

export default { create, get, getAll, update, remove };
