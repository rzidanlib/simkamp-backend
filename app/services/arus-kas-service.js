import arusKasModel from "../models/arus-kas-model.js";
import fs from "fs";
import path from "path";

import { validate } from "../validations/validation.js";
import { ResponseError } from "../error/response-error.js";
import {
  createArusKasValidations,
  updateArusKasValidations,
} from "../validations/arus-kas-validations.js";

const create = async (relawanId, data) => {
  try {
    const arusKas = validate(createArusKasValidations, data);

    arusKas.aruskas_relawan_id = relawanId;
    const createdArusKas = await arusKasModel.create(arusKas);
    return createdArusKas;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const get = async (id) => {
  try {
    const arusKas = await arusKasModel.get(id);
    if (!arusKas) {
      throw new ResponseError(404, "Arus Kas not found");
    }
    return arusKas;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getAll = async () => {
  try {
    const arusKases = await arusKasModel.getAll();
    return arusKases;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getByRelawanId = async (relawanId) => {
  try {
    const arusKas = await arusKasModel.getByRelawanId(relawanId);
    return arusKas;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getArusKasByKandidatId = async (kandidatId) => {
  try {
    const arusKas = await arusKasModel.getArusKasByKandidatId(kandidatId);
    return arusKas;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getArusKasByAdminId = async (adminId) => {
  try {
    const arusKas = await arusKasModel.getArusKasByAdminId(adminId);
    return arusKas;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const update = async (id, data) => {
  try {
    const arusKas = validate(updateArusKasValidations, data);

    const existingArusKas = await arusKasModel.get(id);
    if (!existingArusKas) {
      throw new ResponseError(404, "Arus Kas not found");
    }

    if (
      arusKas.aruskas_foto_kuitansi &&
      existingArusKas.aruskas_foto_kuitansi
    ) {
      const oldFilePathFoto = path.join(
        `public/${existingArusKas.aruskas_foto_kuitansi}`
      );
      try {
        await fs.promises.access(oldFilePathFoto);
        await fs.promises.unlink(oldFilePathFoto);
      } catch (error) {
        console.error("Error deleting old photo file:", error.message);
      }
    }

    const updatedArusKas = await arusKasModel.update(id, arusKas);
    return updatedArusKas;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const remove = async (id) => {
  try {
    const existingArusKas = await arusKasModel.get(id);
    if (!existingArusKas) {
      throw new ResponseError(404, "Arus Kas not found");
    }

    if (existingArusKas.aruskas_foto_kuitansi) {
      const oldFilePathFoto = path.join(
        `public/${existingArusKas.aruskas_foto_kuitansi}`
      );
      try {
        await fs.promises.access(oldFilePathFoto);
        await fs.promises.unlink(oldFilePathFoto);
      } catch (error) {
        console.error("Error deleting old photo file:", error.message);
      }
    }

    const deletedArusKas = await arusKasModel.remove(id);
    return deletedArusKas;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

export default {
  create,
  get,
  getAll,
  getByRelawanId,
  getArusKasByKandidatId,
  getArusKasByAdminId,
  update,
  remove,
};
