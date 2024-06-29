import logistikModel from "../models/logistik-model.js";

import { validate } from "../validations/validation.js";
import { ResponseError } from "../error/response-error.js";
import {
  createLogistikValidations,
  updateLogistikValidations,
} from "../validations/logistik-validations.js";

const create = async (relawanId, data) => {
  try {
    const logistik = validate(createLogistikValidations, data);

    logistik.logistik_relawan_id = relawanId;
    const createdLogistik = await logistikModel.create(logistik);
    return createdLogistik;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const get = async (id) => {
  try {
    const logistik = await logistikModel.get(id);
    if (!logistik) {
      throw new ResponseError(404, "Logistik not found");
    }
    return logistik;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getAll = async () => {
  try {
    const logistiks = await logistikModel.getAll();
    return logistiks;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getByRelawanId = async (relawanId) => {
  try {
    const logistik = await logistikModel.getByRelawanId(relawanId);
    return logistik;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getByKandidatId = async (kandidatId) => {
  try {
    const logistik = await logistikModel.getByKandidatId(kandidatId);
    return logistik;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getByAdminId = async (adminId) => {
  try {
    const logistik = await logistikModel.getByAdminId(adminId);
    return logistik;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const update = async (id, data) => {
  try {
    const logistik = validate(updateLogistikValidations, data);

    const existingLogistik = await logistikModel.get(id);
    if (!existingLogistik) {
      throw new ResponseError(404, "Logistik not found");
    }

    const updatedLogistik = await logistikModel.update(id, logistik);
    return updatedLogistik;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const remove = async (id) => {
  try {
    const existingLogistik = await logistikModel.get(id);
    if (!existingLogistik) {
      throw new ResponseError(404, "Logistik not found");
    }

    const deletedLogistik = await logistikModel.remove(id);
    return deletedLogistik;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

export default {
  create,
  get,
  getAll,
  getByRelawanId,
  getByKandidatId,
  getByAdminId,
  update,
  remove,
};
