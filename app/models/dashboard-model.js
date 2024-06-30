import db from "../config/database-config.js";

const getArusKasRelawan = async (relawanId) => {
  const query = `
    SELECT 
      a.aruskas_kategori as description ,
      SUM(a.aruskas_jumlah) AS currentValue,
      (SELECT aruskas_jumlah 
        FROM arus_kas 
        WHERE aruskas_relawan_id = $1
        ORDER BY aruskas_id DESC 
        LIMIT 1) AS newValue
    FROM arus_kas a
    JOIN relawan r ON a.aruskas_relawan_id = r.relawan_id
    WHERE r.relawan_id = $1
    GROUP BY a.aruskas_kategori, r.relawan_id;
  `;
  const values = [relawanId];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error fetching arus kas:", error);
    throw error;
  }
};

const getArusKasKandidat = async (kandidatId) => {
  const query = `
    SELECT 
      a.aruskas_kategori as description,
      SUM(a.aruskas_jumlah) AS currentValue,
      (SELECT aruskas_jumlah 
        FROM arus_kas ak 
        JOIN relawan rk ON ak.aruskas_relawan_id = rk.relawan_id
        JOIN kandidat kk ON rk.relawan_kandidat_id = kk.kandidat_id
        WHERE kk.kandidat_id = $1
        ORDER BY ak.aruskas_id DESC 
        LIMIT 1) AS newValue
    FROM arus_kas a
    JOIN relawan r ON a.aruskas_relawan_id = r.relawan_id
    JOIN kandidat k ON r.relawan_kandidat_id = k.kandidat_id
    WHERE k.kandidat_id = $1
    GROUP BY a.aruskas_kategori;
  `;
  const values = [kandidatId];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error fetching arus kas:", error);
    throw error;
  }
};

const getArusKasAdmin = async (adminId) => {
  const query = `
    SELECT 
      a.aruskas_kategori as description,
      SUM(a.aruskas_jumlah) AS currentValue,
      (SELECT aruskas_jumlah 
        FROM arus_kas ak 
        JOIN relawan rk ON ak.aruskas_relawan_id = rk.relawan_id
        JOIN kandidat kk ON rk.relawan_kandidat_id = kk.kandidat_id
        JOIN users uu ON kk.kandidat_admin_id = uu.user_id 
        WHERE uu.user_id = $1
        ORDER BY ak.aruskas_id DESC 
        LIMIT 1) AS newValue
    FROM arus_kas a
    JOIN relawan r ON a.aruskas_relawan_id = r.relawan_id
    JOIN kandidat k ON r.relawan_kandidat_id = k.kandidat_id
    JOIN users u ON k.kandidat_admin_id = u.user_id 
    WHERE u.user_id = $1
    GROUP BY a.aruskas_kategori;
  `;
  const values = [adminId];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error fetching arus kas:", error);
    throw error;
  }
};

const getTotalRelawanKandidat = async (kandidatId) => {
  const query = `
    SELECT 
    COUNT(r.relawan_id) AS currentvalue
    FROM relawan r
    JOIN kandidat k ON r.relawan_kandidat_id = k.kandidat_id
    WHERE k.kandidat_id = $1
  `;
  const values = [kandidatId];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error fetching relawan kandidat:", error);
    throw error;
  }
};

const getTotalRelawanAdmin = async (adminId) => {
  const query = `
    SELECT 
    COUNT(r.relawan_id) AS currentvalue
    FROM relawan r
    JOIN kandidat k ON r.relawan_kandidat_id = k.kandidat_id
    JOIN users u ON k.kandidat_admin_id = u.user_id
    WHERE u.user_id = $1
  `;
  const values = [adminId];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error fetching relawan admin:", error);
    throw error;
  }
};

const getRelawanKandidat = async (kandidatId) => {
  const query = `
   SELECT 
    r.relawan_foto as img,
    r.relawan_nama as name,
    r.relawan_status as status
  FROM 
      relawan r
  JOIN 
      kandidat k ON r.relawan_kandidat_id = k.kandidat_id
  WHERE 
      k.kandidat_id = $1
  ORDER BY 
      r.relawan_id DESC
  LIMIT 5;
  `;
  const values = [kandidatId];

  try {
    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    console.error("Error fetching relawan kandidat:", error);
    throw error;
  }
};

const getRelawanAdmin = async (adminId) => {
  const query = `
   SELECT 
    r.relawan_foto as img,
    r.relawan_nama as name,
    r.relawan_status as status
  FROM 
      relawan r
  JOIN 
      kandidat k ON r.relawan_kandidat_id = k.kandidat_id
  JOIN 
      users u ON k.kandidat_admin_id = u.user_id
  WHERE 
      u.user_id = $1
  ORDER BY 
      r.relawan_id DESC
  LIMIT 5;
  `;
  const values = [adminId];

  try {
    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    console.error("Error fetching relawan admin:", error);
    throw error;
  }
};

export default {
  getArusKasRelawan,
  getArusKasKandidat,
  getArusKasAdmin,
  getTotalRelawanKandidat,
  getTotalRelawanAdmin,
  getRelawanKandidat,
  getRelawanAdmin,
};
