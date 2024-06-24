import posisiCalonTetapModel from "../../models/admin/posisi-calon-tetap-model.js";
import { validate } from "../../validations/validation.js";
import { ResponseError } from "../../error/response-error.js";
import {
  createPosisiCalonValidations,
  updateJPosisiCalonValidations,
} from "../../validations/admin/posisi-calon-tetap-validations.js";

const create = async (request) => {
  try {
    const data = validate(createPosisiCalonValidations, request);
    const createPosisiCalon = await posisiCalonTetapModel.create(data);

    return createPosisiCalon;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const get = async (id) => {
  try {
    const posisiCalon = await posisiCalonTetapModel.get(id);
    if (!posisiCalon) {
      throw new ResponseError(404, "Jenis Pemilihan tidak ditemukan");
    }
    return posisiCalon;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getAll = async () => {
  try {
    const posisiCalon = await posisiCalonTetapModel.getAll();
    if (!posisiCalon) {
      throw new ResponseError(404, "Data Jenis Pemilihan tidak ada");
    }
    return posisiCalon;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const update = async (id, data) => {
  try {
    const posisiCalon = await posisiCalonTetapModel.get(id);
    if (!posisiCalon) {
      throw new ResponseError(404, "Jenis Pemilihan tidak ditemukan");
    }

    const updatePosisiCalon = validate(updateJPosisiCalonValidations, data);
    const result = await posisiCalonTetapModel.update(id, updatePosisiCalon);

    return result;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const remove = async (id) => {
  try {
    const posisiCalon = await posisiCalonTetapModel.get(id);
    if (!posisiCalon) {
      throw new ResponseError(404, "Jenis Pemilihan tidak ditemukan");
    }

    await posisiCalonTetapModel.remove(id);
    return posisiCalon;
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
