import db from "../../config/database-config.js";
import { ResponseError } from "../../error/response-error.js";

const create = async (data) => {
  const query = `
    INSERT INTO roles (role, description, role_name)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const result = await db.query(query, [data.role, data.role_deskripsi]);
  return result.rows[0];
};

const getRole = async ({ roleId, roleName }) => {
  let query = `
    SELECT * FROM roles
    WHERE
  `;
  const queryParams = [];

  if (roleId) {
    query += `id = $1`;
    queryParams.push(roleId);
  } else if (roleName) {
    query += `role_name = $1`;
    queryParams.push(roleName);
  } else {
    throw new Error("Role id atau role name harus tersedia");
  }

  const result = await db.query(query, queryParams);
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
    SET role = $1, description = $2, role_name = $3
    WHERE role_id = $4
    RETURNING *;
  `;
  const values = [data.role, data.role_deskripsi, data.role_name, roleId];
  const result = await db.query(query, values);
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
  getRole,
  getAll,
  update,
  remove,
};
