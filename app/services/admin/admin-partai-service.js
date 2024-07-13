import path from "path";
import fs from "fs";

import adminPartaiModel from "../../models/admin/admin-partai-model.js";

import { validate } from "../../validations/validation.js";
import { ResponseError } from "../../error/response-error.js";
import {
  createAdminPartaiValidations,
  updateAdminPartaiValidations,
} from "../../validations/admin/admin-partai-validations.js";

const create = async (currentUser, data) => {
  const { id, role } = currentUser;
  try {
    if (role !== "Admin Partai") {
      throw new ResponseError(403, "Role tidak diizinkan");
    }

    const validateAdminPartai = validate(createAdminPartaiValidations, data);
    validateAdminPartai.user_id = id;
    validateAdminPartai.status_akun = "aktif";

    const createdAdminPartai = await adminPartaiModel.create(
      validateAdminPartai
    );
    return createdAdminPartai;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const get = async (adminPartaiId) => {
  try {
    const adminPartai = await adminPartaiModel.get(adminPartaiId);
    if (!adminPartai) {
      throw new ResponseError(404, "Admin Partai tidak ditemukan");
    }
    return adminPartai;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getAll = async () => {
  try {
    const adminPartai = await adminPartaiModel.getAll();
    if (!adminPartai) {
      throw new ResponseError(404, "Data Admin Partai tidak tersedia");
    }
    return adminPartai;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const update = async (adminPartaiId, data) => {
  try {
    const adminPartai = await adminPartaiModel.get(adminPartaiId);
    if (!adminPartai) {
      throw new ResponseError(404, "Admin Partai tidak ditemukan");
    }
    const validateAdminPartai = validate(updateAdminPartaiValidations, data);

    if (validateAdminPartai.foto_profil !== adminPartai.foto_profil) {
      const oldFilePathFoto = path.join(`public/${adminPartai.foto_profil}`);
      try {
        await fs.promises.access(oldFilePathFoto);
        await fs.promises.unlink(oldFilePathFoto);
      } catch (error) {
        console.error("Error gagal menghapus logo partai:", error.message);
      }
    }

    const updatedAdminPartai = await adminPartaiModel.update(
      adminPartaiId,
      validateAdminPartai
    );
    return updatedAdminPartai;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const remove = async (adminPartaiId) => {
  try {
    const adminPartai = await adminPartaiModel.get(adminPartaiId);
    if (!adminPartai) {
      throw new ResponseError(404, "Admin Partai tidak ditemukan");
    }
    const deletedAdminPartai = await adminPartaiModel.remove(adminPartaiId);
    return deletedAdminPartai;
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
