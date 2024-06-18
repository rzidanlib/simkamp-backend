import rolesService from "../services/roles-service.js";

const create = async (req, res, next) => {
  try {
    const result = await rolesService.create(req.body);
    res.status(200).json({
      message: "Sukses",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllRoles = async (req, res, next) => {
  try {
    const roles = await rolesService.getAllRoles();
    res.status(200).json({ message: "Get all roles", data: roles });
  } catch (error) {
    next(error);
  }
};

const getRole = async (req, res, next) => {
  try {
    const roleId = req.params.roleId;
    const role = await rolesService.get(roleId);

    res.status(200).json({ message: "Get role", data: { role } });
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const roleId = req.params.roleId;
    const role = await rolesService.update(roleId, req.body);

    res.status(200).json({ message: "Update role", data: { role } });
  } catch (error) {
    next(error);
  }
};

const removeRole = async (req, res, next) => {
  try {
    const roleId = req.params.roleId;
    const result = await rolesService.remove(roleId);

    res.status(200).json({ message: "Role deleted", data: result });
  } catch (error) {
    next(error);
  }
};

export default { create, getAllRoles, getRole, updateRole, removeRole };
