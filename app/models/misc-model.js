import db from "../config/database-config.js";

export const getNavigations = async () => {
  const result = await db.query("SELECT * FROM navigation");
  return result.rows;
};

export const insertNavigations = async (data) => {
  const { title, path, icon, parent_id } = data;
  const query = `
    INSERT INTO navigation (title, path, icon, parent_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [title, path, icon, parent_id];
  const result = await db.query(query, values);
  return result.rows[0];
};
