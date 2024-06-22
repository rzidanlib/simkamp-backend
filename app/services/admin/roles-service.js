import { validate } from "../../validations/validation.js";
import { ResponseError } from "../../error/response-error.js";
import rolesModel from "../../models/admin/roles-model.js";
import {
  createRoleValidation,
  updateRoleValidation,
} from "../../validations/admin/roles-validations.js";

const create = async (data) => {
  try {
    const role = validate(createRoleValidation, data);
    const newRole = await rolesModel.create(role);
    if (!newRole) {
      throw new ResponseError(500, "Failed to create role");
    }
    return newRole;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const get = async (roleId) => {
  try {
    const role = await rolesModel.get(roleId);
    if (!role) {
      throw new ResponseError(404, "Role not found");
    }
    return role;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getAll = async () => {
  try {
    const roles = await rolesModel.getAll();
    if (!roles) {
      throw new ResponseError(404, "No roles found");
    }
    return roles;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const update = async (roleId, data) => {
  try {
    const role = validate(updateRoleValidation, data);
    const updatedRole = await rolesModel.update(roleId, role);
    if (!updatedRole) {
      throw new ResponseError(500, "Failed to update role");
    }
    return updatedRole;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const remove = async (roleId) => {
  try {
    const result = await rolesModel.remove(roleId);
    if (!result) {
      throw new ResponseError(500, "Failed to remove role");
    }
    return result;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

export default {
  create,
  get,
  getAll,
  update,
  remove,
};
