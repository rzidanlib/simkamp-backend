import db from "../config/database-config.js";
import { ResponseError } from "../error/response-error.js";

const create = async (data) => {
  const query = `
    INSERT INTO roles (role_name, description)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const result = await db.query(query, [data.role_name, data.description]);
  return result.rows[0];
};

const get = async (roleId) => {
  const query = `
    SELECT * FROM roles
    WHERE id = $1
  `;
  const result = await db.query(query, [roleId]);
  return result.rows[0];
};

const getAllRoles = async () => {
  const query = `
    SELECT * FROM roles
  `;
  const result = await db.query(query);
  return result.rows;
};

const update = async (roleId, data) => {
  const query = `
    UPDATE roles
    SET role_name = $1, description = $2
    WHERE id = $3
    RETURNING *;
  `;
  const result = await db.query(query, [
    data.role_name,
    data.description,
    roleId,
  ]);
  return result.rows[0];
};

const remove = async (roleId) => {
  const selectQuery = `
    SELECT role_name FROM roles
    WHERE id = $1
  `;
  const role = await db.query(selectQuery, [roleId]);

  if (!role.rows[0]) {
    throw new ResponseError(404, "Role not found");
  }

  const deleteQuery = `
    DELETE FROM roles
    WHERE id = $1
  `;
  await db.query(deleteQuery, [roleId]);

  return role.rows[0];
};

export default {
  create,
  get,
  getAllRoles,
  update,
  remove,
};
