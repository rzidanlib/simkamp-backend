import db from "../config/database-config.js";

// const getUserAdmin = async (value) => {
//   const column = !isNaN(value) ? "user_id" : "user_email";
//   const validColumns = ["user_id", "user_email"];

//   // Validate the column name
//   if (!validColumns.includes(column)) {
//     throw new Error("Invalid column name");
//   }

//   // Construct the query with conditional JOIN for 'partai'
//   let query = `
//     SELECT u.*, r.role,
//       CASE
//         WHEN r.role <> 'administrator' THEN p.partai_label
//         ELSE NULL
//       END AS partai_label
//     FROM users u
//     JOIN roles r ON u.user_role_id = r.role_id
//     LEFT JOIN partai p ON u.user_partai_id = p.partai_id AND r.role <> 'administrator'
//     WHERE u.${column} = $1
//   `;

//   const values = [value];

//   try {
//     const { rows } = await db.query(query, values);
//     return rows[0]; // Return the first user found
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     throw error; // Rethrow or handle as needed
//   }
// };

// const getKandidat = async (value) => {
//   const column = !isNaN(value) ? "kandidat_id" : "kandidat_email";
//   const validColumns = ["kandidat_id", "kandidat_email"];
//   if (!validColumns.includes(column)) {
//     throw new Error("Invalid column name");
//   }

//   let query = `
//     SELECT k.*`;

//   if (column === "kandidat_email") {
//     query += `,
//       r.role
//     FROM kandidat k
//     LEFT JOIN roles r ON k.kandidat_role_id = r.role_id `;
//   } else {
//     query += `,
//       ag.agama, p.partai_label, a.user_nama, d.dapil_nama, jp.jenis_pemilihan, pct.posisi_calon_tetap, r.role
//     FROM kandidat k
//     LEFT JOIN agama ag ON k.kandidat_agama_id = ag.agama_id
//     LEFT JOIN dapil d ON k.kandidat_dapil_id = d.dapil_id
//     LEFT JOIN partai p ON k.kandidat_partai_id = p.partai_id
//     LEFT JOIN users a ON k.kandidat_admin_id = a.user_id
//     LEFT JOIN jenis_pemilihan jp ON k.kandidat_jenis_pemilihan_id = jp.jenis_pemilihan_id
//     LEFT JOIN posisi_calon_tetap pct ON k.kandidat_posisi_calon_tetap_id = pct.posisi_calon_tetap_id
//     LEFT JOIN roles r ON k.kandidat_role_id = r.role_id `;
//   }

//   // Append the WHERE clause based on the column
//   query += `WHERE k.${column} = $1`;

//   const values = [value];

//   try {
//     const { rows } = await db.query(query, values);
//     return rows[0]; // Return the first user found
//   } catch (error) {
//     console.error("Error fetching kandidat:", error);
//     throw error; // Rethrow or handle as needed
//   }
// };

// const getRelawan = async (value) => {
//   const column = !isNaN(value) ? "relawan_id" : "relawan_email";
//   const validColumns = ["relawan_id", "relawan_email"];
//   if (!validColumns.includes(column)) {
//     throw new Error("Invalid column name");
//   }

//   let query = `
//     SELECT re.*`;

//   if (column === "relawan_email") {
//     query += `,
//       r.role
//     FROM relawan re
//     LEFT JOIN roles r ON re.relawan_role_id = r.role_id `;
//   } else {
//     query += `,
//       k.kandidat_nama, r.role
//     FROM relawan re
//     LEFT JOIN kandidat k ON re.relawan_kandidat_id = k.kandidat_id
//     LEFT JOIN roles r ON re.relawan_role_id = r.role_id `;
//   }

//   // Append the WHERE clause based on the column
//   query += `WHERE re.${column} = $1`;

//   const values = [value];

//   try {
//     const { rows } = await db.query(query, values);
//     return rows[0]; // Return the first user found
//   } catch (error) {
//     console.error("Error fetching relawan:", error);
//     throw error; // Rethrow or handle as needed
//   }
// };

const getUser = async (value) => {
  const query = `
    SELECT * FROM users
    WHERE email = $1
  `;
  const result = await db.query(query, [value]);
  return result.rows[0];
};

const insertBlacklistToken = async (token, expiry) => {
  const query = "INSERT INTO token_blacklist (token, expiry) VALUES ($1, $2)";
  const values = [token, expiry];
  await db.query(query, values);
};

const getBlacklistToken = async (token) => {
  const query = `SELECT * FROM token_blacklist WHERE token = $1`;
  const values = [token];
  const result = await db.query(query, values);
  return result.rows[0];
};

export default {
  getUser,
  insertBlacklistToken,
  getBlacklistToken,
};
