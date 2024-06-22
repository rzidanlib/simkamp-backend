import db from "../../config/database-config.js";
import { ResponseError } from "../../error/response-error.js";

const create = async (data) => {
  const query = `
    INSERT INTO roles (role, role_deskripsi)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const result = await db.query(query, [data.role, data.role_deskripsi]);
  return result.rows[0];
};

const get = async (roleId) => {
  const query = `
    SELECT * FROM roles
    WHERE role_id = $1
  `;
  const result = await db.query(query, [roleId]);
  return result.rows[0];
};

const getAll = async () => {
  const query = `
    SELECT * FROM roles
  `;
  const { rows } = await db.query(query);
  return rows;
};

const update = async (roleId, data) => {
  const query = `
    UPDATE roles
    SET role = $1, role_deskripsi = $2
    WHERE role_id = $3
    RETURNING *;
  `;
  const result = await db.query(query, [
    data.role,
    data.role_deskripsi,
    roleId,
  ]);
  return result.rows[0];
};

const remove = async (roleId) => {
  const selectQuery = `
    SELECT role FROM roles
    WHERE role_id = $1
  `;
  const role = await db.query(selectQuery, [roleId]);

  if (!role.rows[0]) {
    throw new ResponseError(404, "Role not found");
  }

  const deleteQuery = `
    DELETE FROM roles
    WHERE role_id = $1
  `;
  await db.query(deleteQuery, [roleId]);

  return role.rows[0];
};

export default {
  create,
  get,
  getAll,
  update,
  remove,
};
