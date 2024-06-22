import partaiModel from "../../models/admin/partai-model.js";
import path from "path";
import fs from "fs";

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
      throw new ResponseError(500, "Failed to create partai");
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
      throw new ResponseError(404, "Partai not found");
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
      throw new ResponseError(404, "No partai found");
    }
    return partai;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const update = async (partaiId, data) => {
  try {
    const partai = validate(updatePartaiValidation, data);
    const updatedPartai = await partaiModel.update(partaiId, partai);
    if (!updatedPartai) {
      throw new ResponseError(500, "Failed to update partai");
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
      throw new ResponseError(404, "Partai not found");
    }
    await fs.unlinkSync(path.join(`public/${partai.partai_logo}`));
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
