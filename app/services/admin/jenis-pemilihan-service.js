import jenisPemilihanModel from "../../models/admin/jenis-pemilihan-model.js";
import { validate } from "../../validations/validation.js";
import { ResponseError } from "../../error/response-error.js";
import {
  createJenisPemilihanValidations,
  updateJenisPemilihanValidations,
} from "../../validations/admin/jenis-pemilihan-validations.js";

const create = async (request) => {
  try {
    const data = validate(createJenisPemilihanValidations, request);
    const createJenisPemilihan = await jenisPemilihanModel.create(data);

    return createJenisPemilihan;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const get = async (jenisPemilihanId) => {
  try {
    const jenisPemilihan = await jenisPemilihanModel.get(jenisPemilihanId);
    if (!jenisPemilihan) {
      throw new ResponseError(404, "Jenis Pemilihan tidak ditemukan");
    }
    return jenisPemilihan;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getAll = async () => {
  try {
    const jenisPemilihan = await jenisPemilihanModel.getAll();
    if (!jenisPemilihan) {
      throw new ResponseError(404, "Data Jenis Pemilihan tidak ada");
    }
    return jenisPemilihan;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const update = async (jenisPemilihanId, data) => {
  try {
    const jenisPemilihan = await jenisPemilihanModel.get(jenisPemilihanId);
    if (!jenisPemilihan) {
      throw new ResponseError(404, "Jenis Pemilihan tidak ditemukan");
    }

    const updateJenisPemilihan = validate(
      updateJenisPemilihanValidations,
      data
    );
    const result = await jenisPemilihanModel.update(
      jenisPemilihanId,
      updateJenisPemilihan
    );

    return result;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const remove = async (jenisPemilihanId) => {
  try {
    const jenisPemilihan = await jenisPemilihanModel.get(jenisPemilihanId);
    if (!jenisPemilihan) {
      throw new ResponseError(404, "Jenis Pemilihan tidak ditemukan");
    }

    await jenisPemilihanModel.remove(jenisPemilihanId);
    return jenisPemilihan;
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
