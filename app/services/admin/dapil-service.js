import dapilModel from "../../models/admin/dapil-model.js";
import { validate } from "../../validations/validation.js";
import { ResponseError } from "../../error/response-error.js";
import {
  createDapilValidations,
  updateDapilValidations,
} from "../../validations/admin/dapil-validations.js";

const create = async (request) => {
  try {
    const data = validate(createDapilValidations, request);
    const createDapil = await dapilModel.create(data);

    return createDapil;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const get = async (dapilId) => {
  try {
    const dapil = await dapilModel.get(dapilId);
    if (!dapil) {
      throw new ResponseError(404, "Data Dapil tidak ditemukan");
    }
    return dapil;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getAll = async () => {
  try {
    const dapils = await dapilModel.getAll();
    if (!dapils) {
      throw new ResponseError(404, "Data dapil tidak ada");
    }
    return dapils;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const update = async (dapilId, data) => {
  try {
    const dapil = await dapilModel.get(dapilId);
    if (!dapil) {
      throw new ResponseError(404, "Data dapil tidak ditemukan");
    }

    const updatedapil = validate(updateDapilValidations, data);
    const result = await dapilModel.update(dapilId, updatedapil);

    return result;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const remove = async (dapilId) => {
  try {
    const dapil = await dapilModel.get(dapilId);
    if (!dapil) {
      throw new ResponseError(404, "dapil tidak ditemukan");
    }

    await dapilModel.remove(dapilId);
    return dapil;
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
