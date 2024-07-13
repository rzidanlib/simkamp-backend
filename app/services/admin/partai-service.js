import path from "path";
import fs from "fs";

import partaiModel from "../../models/admin/partai-model.js";

import { validate } from "../../validations/validation.js";
import {
  createPartaiValidation,
  updatePartaiValidation,
} from "../../validations/admin/partai-validations.js";
import { ResponseError } from "../../error/response-error.js";

const create = async (data) => {
  try {
    const partai = validate(createPartaiValidation, data);

    const newPartai = await partaiModel.create(partai);
    if (!newPartai) {
      throw new ResponseError(500, "Gagal membuat data partai");
    }
    return newPartai;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const get = async (partaiId) => {
  try {
    const partai = await partaiModel.get(partaiId);
    if (!partai) {
      throw new ResponseError(404, "Partai tidak ditemukan");
    }
    return partai;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getAll = async () => {
  try {
    const partai = await partaiModel.getAll();
    if (!partai) {
      throw new ResponseError(404, "Tidak ada data partai");
    }
    return partai;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const update = async (partaiId, data) => {
  try {
    const validatePartai = validate(updatePartaiValidation, data);
    const existingPartai = await partaiModel.get(partaiId);
    if (!existingPartai) {
      throw new ResponseError(404, "Partai tidak ditemukan");
    }

    if (validatePartai.logo !== existingPartai.logo) {
      const oldFilePathFoto = path.join(`public/${existingPartai.logo}`);
      try {
        await fs.promises.access(oldFilePathFoto);
        await fs.promises.unlink(oldFilePathFoto);
      } catch (error) {
        console.error("Error gagal menghapus logo partai:", error.message);
      }
    }

    const updatedPartai = await partaiModel.update(partaiId, validatePartai);
    if (!updatedPartai) {
      throw new ResponseError(500, "Gagal memperbaharui partai");
    }

    return updatedPartai;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const remove = async (partaiId) => {
  try {
    const partai = await partaiModel.get(partaiId);
    if (!partai) {
      throw new ResponseError(404, "Partai tidak ditemukan");
    }

    if (partai.logo) {
      const oldFilePathFoto = path.join(`public/${partai.logo}`);
      try {
        await fs.promises.access(oldFilePathFoto);
        await fs.promises.unlink(oldFilePathFoto);
      } catch (error) {
        console.error("Error gagal menghapus logo partai:", error.message);
      }
    }

    await partaiModel.remove(partaiId);

    return partai;
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
