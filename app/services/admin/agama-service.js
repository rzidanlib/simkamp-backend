import agamaModel from "../../models/admin/agama-model.js";
import { validate } from "../../validations/validation.js";
import { ResponseError } from "../../error/response-error.js";
import {
  createAgamaValidation,
  updateAgamaValidation,
} from "../../validations/admin/agama-validations.js";

const create = async (request) => {
  try {
    const data = validate(createAgamaValidation, request);
    const createAgama = await agamaModel.create(data);

    return createAgama;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const get = async (agamaId) => {
  try {
    const agama = await agamaModel.get(agamaId);
    if (!agama) {
      throw new ResponseError(404, "Agama tidak ditemukan");
    }
    return agama;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getAll = async () => {
  try {
    const agamas = await agamaModel.getAll();
    if (!agamas) {
      throw new ResponseError(404, "Data Agama tidak ada");
    }
    return agamas;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const update = async (agamaId, data) => {
  try {
    const agama = await agamaModel.get(agamaId);
    if (!agama) {
      throw new ResponseError(404, "Agama tidak ditemukan");
    }

    const updateAgama = validate(updateAgamaValidation, data);
    const result = await agamaModel.update(agamaId, updateAgama);

    return result;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const remove = async (agamaId) => {
  try {
    const agama = await agamaModel.get(agamaId);
    if (!agama) {
      throw new ResponseError(404, "Agama tidak ditemukan");
    }

    await agamaModel.remove(agamaId);
    return agama;
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
