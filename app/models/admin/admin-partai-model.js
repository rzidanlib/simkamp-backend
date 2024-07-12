import db from "../../config/database-config";

const create = async (userData) => {
  const query = `
	INSERT INTO users(user_id, nama_lengkap, nomor_telepon, alamat, partai_id, posisi, dapil_id, foto_profil, status_akun)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
	RETURNING *;
  `;
  const values = [
    userData.user_id,
    userData.nama_lengkap,
    userData.nomor_telepon,
    userData.alamat,
    userData.partai_id,
    userData.posisi,
    userData.dapil_id,
    userData.foto_profil,
    userData.status_akun,
  ];
  const res = await db.query(query, values);
  return res.rows[0];
};

const get = async (userId) => {
  const query = `
	SELECT * FROM users WHERE user_id = $1;
  `;
  const res = await db.query(query, [userId]);
  return res.rows[0];
};

const getAll = async () => {
  const query = `
  SELECT * FROM users;
  `;
  const res = await db.query(query);
  return res.rows;
};

const update = async (userId, userData) => {
  const query = `
	UPDATE users
	SET nama_lengkap = $2, nomor_telepon = $3, alamat = $4, partai_id = $5, posisi = $6, dapil_id = $7, foto_profil = $8, status_akun = $9
	WHERE user_id = $1
	RETURNING *;
  `;
  const values = [
    userId,
    userData.nama_lengkap,
    userData.nomor_telepon,
    userData.alamat,
    userData.partai_id,
    userData.posisi,
    userData.dapil_id,
    userData.foto_profil,
    userData.status_akun,
  ];
  const res = await db.query(query, values);
  return res.rows[0];
};

const remove = async (userId) => {
  const query = `
	DELETE FROM users WHERE user_id = $1;
  `;
  await db.query(query, [userId]);
};

export default { create, get, getAll, update, remove };
