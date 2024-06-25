import pemakaianLogistikModel from "../models/pemakaian-logistik-model.js";

import { validate } from "../validations/validation.js";
import { ResponseError } from "../error/response-error.js";
import {
  createPemakaianLogistikValidations,
  updatePemakaianLogistikValidations,
} from "../validations/pemakaian-logistik-validations.js";

const create = async (relawanId, data) => {
  try {
    const pemakaianLogistik = validate(
      createPemakaianLogistikValidations,
      data
    );

    pemakaianLogistik.pemakaian_relawan_id = relawanId;
    const createdPemakaianLogistik = await pemakaianLogistikModel.create(
      pemakaianLogistik
    );
    return createdPemakaianLogistik;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const get = async (id) => {
  try {
    const pemakaianLogistik = await pemakaianLogistikModel.get(id);
    if (!pemakaianLogistik) {
      throw new ResponseError(404, "Pemakaian Logistik not found");
    }
    return pemakaianLogistik;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getAll = async () => {
  try {
    const pemakaianLogistiks = await pemakaianLogistikModel.getAll();
    return pemakaianLogistiks;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getByRelawanId = async (relawanId) => {
  try {
    const pemakaianLogistik = await pemakaianLogistikModel.getByRelawanId(
      relawanId
    );
    return pemakaianLogistik;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const update = async (id, data) => {
  try {
    const pemakaianLogistik = validate(
      updatePemakaianLogistikValidations,
      data
    );

    const existingPemakaianLogistik = await pemakaianLogistikModel.get(id);
    if (!existingPemakaianLogistik) {
      throw new ResponseError(404, "Pemakaian Logistik not found");
    }

    const updatedPemakaianLogistik = await pemakaianLogistikModel.update(
      id,
      pemakaianLogistik
    );
    return updatedPemakaianLogistik;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const remove = async (id) => {
  try {
    const existingPemakaianLogistik = await pemakaianLogistikModel.get(id);
    if (!existingPemakaianLogistik) {
      throw new ResponseError(404, "Pemakaian Logistik not found");
    }

    const deletedPemakaianLogistik = await pemakaianLogistikModel.remove(id);
    return deletedPemakaianLogistik;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

export default {
  create,
  get,
  getAll,
  getByRelawanId,
  update,
  remove,
};
