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
    k.kandidat_id, 
    COUNT(r.relawan_id) AS currentValue
    FROM 
        relawan r
    JOIN 
        kandidat k ON r.relawan_kandidat_id = k.kandidat_id
    WHERE k.kandidat_id = $1
    GROUP BY 
        k.kandidat_id;
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
    u.user_id, 
    COUNT(r.relawan_id) AS currentValue
    FROM 
        relawan r
    JOIN 
        kandidat k ON r.relawan_kandidat_id = k.kandidat_id
    JOIN 
        users u ON k.kandidat_admin_id = u.user_id
    WHERE u.user_id = $1
    GROUP BY 
        u.user_id;
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

// Calon Pemilih
const getTotalPemilihRelawan = async (relawanId) => {
  const query = `
    SELECT 
      r.relawan_id, 
      COUNT(cp.calon_pemilih_id) AS currentValue
    FROM 
        calon_pemilih cp
    JOIN 
        relawan r ON cp.calon_pemilih_relawan_id = r.relawan_id
    WHERE r.relawan_id = $1
    GROUP BY 
        r.relawan_id;
  `;
  const values = [relawanId];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error fetching pemilih relawan:", error);
    throw error;
  }
};

const getTotalPemilihKandidat = async (kandidatId) => {
  const query = `
    SELECT 
    k.kandidat_id, 
    COUNT(cp.calon_pemilih_id) AS currentValue
    FROM 
        calon_pemilih cp
    JOIN 
        relawan r ON cp.calon_pemilih_relawan_id = r.relawan_id
    JOIN 
        kandidat k ON r.relawan_kandidat_id = k.kandidat_id
    WHERE k.kandidat_id = $1
    GROUP BY 
        k.kandidat_id;
  `;
  const values = [kandidatId];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error fetching pemilih kandidat:", error);
    throw error;
  }
};

const getTotalPemilihAdmin = async (adminId) => {
  const query = `
    SELECT 
    u.user_id, 
    COUNT(cp.calon_pemilih_id) AS currentValue
    FROM 
        calon_pemilih cp
    JOIN 
        relawan r ON cp.calon_pemilih_relawan_id = r.relawan_id
    JOIN 
        kandidat k ON r.relawan_kandidat_id = k.kandidat_id
    JOIN 
        users u ON k.kandidat_admin_id = u.user_id
    WHERE u.user_id = $1
    GROUP BY 
        u.user_id;
  `;
  const values = [adminId];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error fetching pemilih admin:", error);
    throw error;
  }
};

const getPemilihRelawan = async (relawanId) => {
  const query = `
    SELECT 
      cp.calon_pemilih_foto as img,
      cp.calon_pemilih_nama as name,
      cp.calon_pemilih_status as status
    FROM 
        calon_pemilih cp
    JOIN 
        relawan r ON cp.calon_pemilih_relawan_id = r.relawan_id
    WHERE 
        r.relawan_id = $1
    ORDER BY 
        cp.calon_pemilih_id DESC
    LIMIT 5;
  `;
  const values = [relawanId];

  try {
    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    console.error("Error fetching pemilih relawan:", error);
    throw error;
  }
};

const getPemilihKandidat = async (kandidatId) => {
  const query = `
    SELECT 
      cp.calon_pemilih_foto as img,
      cp.calon_pemilih_nama as name,
      cp.calon_pemilih_status as status
    FROM 
        calon_pemilih cp
    JOIN 
        relawan r ON cp.calon_pemilih_relawan_id = r.relawan_id
    JOIN 
        kandidat k ON r.relawan_kandidat_id = k.kandidat_id
    WHERE 
        k.kandidat_id = $1
    ORDER BY 
        cp.calon_pemilih_id DESC
    LIMIT 5;
  `;
  const values = [kandidatId];

  try {
    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    console.error("Error fetching pemilih kandidat:", error);
    throw error;
  }
};

const getPemilihAdmin = async (adminId) => {
  const query = `
    SELECT 
      cp.calon_pemilih_foto as img,
      cp.calon_pemilih_nama as name,
      cp.calon_pemilih_status as status
    FROM 
        calon_pemilih cp
    JOIN 
        relawan r ON cp.calon_pemilih_relawan_id = r.relawan_id
    JOIN 
        kandidat k ON r.relawan_kandidat_id = k.kandidat_id
    JOIN 
        users u ON k.kandidat_admin_id = u.user_id
    WHERE 
        u.user_id = $1
    ORDER BY 
        cp.calon_pemilih_id DESC
    LIMIT 5;
  `;
  const values = [adminId];

  try {
    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    console.error("Error fetching pemilih admin:", error);
    throw error;
  }
};

const getTotalLogistikRelawan = async (relawanId) => {
  const query = `
  SELECT 
    COUNT(l.logistik_id) AS currentValue,
    (SELECT ll.logistik_nama_atribut
     FROM logistik ll
     WHERE ll.logistik_relawan_id = r.relawan_id
     ORDER BY ll.logistik_id DESC
     LIMIT 1) AS newValue
  FROM 
      logistik l
  JOIN 
      relawan r ON l.logistik_relawan_id = r.relawan_id
  WHERE r.relawan_id = $1
  GROUP BY 
      r.relawan_id;
  `;
  const values = [relawanId];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error fetching logistik admin:", error);
    throw error;
  }
};

const getTotalLogistikKandidat = async (kandidatId) => {
  const query = `
  SELECT 
    COUNT(l.logistik_id) AS currentValue,
    (SELECT ll.logistik_nama_atribut
     FROM logistik ll
     JOIN relawan rk ON ll.logistik_relawan_id = rk.relawan_id
        JOIN kandidat kk ON rk.relawan_kandidat_id = kk.kandidat_id
        WHERE kk.kandidat_id = $1
        ORDER BY ll.logistik_id DESC 
     LIMIT 1) AS newValue
  FROM 
      logistik l
  JOIN 
      relawan r ON l.logistik_relawan_id = r.relawan_id
  JOIN 
      kandidat kr ON r.relawan_kandidat_id  = kr.kandidat_id 
  WHERE 
      kr.kandidat_id = $1
  GROUP BY 
      kr.kandidat_id;
  `;
  const values = [kandidatId];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error fetching logistik admin:", error);
    throw error;
  }
};

const getTotalLogistikAdmin = async (adminId) => {
  const query = `
  SELECT 
    COUNT(l.logistik_id) AS currentValue,
    (SELECT ll.logistik_nama_atribut
     FROM logistik ll
     JOIN relawan rk ON ll.logistik_relawan_id = rk.relawan_id
     JOIN kandidat kk ON rk.relawan_kandidat_id = kk.kandidat_id
     JOIN users uu ON kk.kandidat_admin_id = uu.user_id 
     WHERE uu.user_id = $1
     ORDER BY ll.logistik_id DESC 
     LIMIT 1) AS newValue
  FROM 
      logistik l
  JOIN 
      relawan r ON l.logistik_relawan_id = r.relawan_id
  JOIN 
      kandidat kr ON r.relawan_kandidat_id  = kr.kandidat_id 
  JOIN 
      users u ON kr.kandidat_admin_id = u.user_id
  WHERE 
      u.user_id = $1
  GROUP BY 
      u.user_id;
  `;
  const values = [adminId];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error fetching logistik admin:", error);
    throw error;
  }
};

// Daashboard Administrator Data
const getTotalUsers = async () => {
  const query = `
    SELECT COUNT(user_id) AS currentValue FROM users WHERE user_partai_id IS NOT NULL;
  `;

  try {
    const { rows } = await db.query(query);
    return rows[0];
  }
  catch (error) {
    console.error("Error fetching total users:", error);
    throw error;
  }
}

const getTotalKandidat = async () => {
  const query = `
    SELECT COUNT(kandidat_id) AS currentValue FROM kandidat;
  `;

  try {
    const { rows } = await db.query(query);
    return rows[0];
  }
  catch (error) {
    console.error("Error fetching total kandidat:", error);
    throw error;
  }
}

const getTotalRelawan = async () => {
  const query = `
    SELECT COUNT(relawan_id) AS currentValue FROM relawan;
  `;
  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.error("Error fetching total relawan:", error);
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
  getTotalPemilihRelawan,
  getTotalPemilihKandidat,
  getTotalPemilihAdmin,
  getPemilihRelawan,
  getPemilihKandidat,
  getPemilihAdmin,
  getTotalLogistikRelawan,
  getTotalLogistikKandidat,
  getTotalLogistikAdmin,
};
