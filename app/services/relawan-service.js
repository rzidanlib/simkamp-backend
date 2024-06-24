import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import relawanModel from "../models/relawan-model.js";

import { validate } from "../validations/validation.js";
import { ResponseError } from "../error/response-error.js";
import {
  createRelawanValidations,
  updateRelawanValidations,
} from "../validations/relawan-validations.js";

const checkRelawanIsExist = async (email) => {
  const existingRelawan = await relawanModel.getByEmail(email);
  if (existingRelawan) {
    throw new ResponseError(403, "Relawan sudah ada");
  }
};

const create = async (kandidatId, request) => {
  try {
    const relawan = validate(createRelawanValidations, request);

    if (relawan.relawan_email) {
      await checkRelawanIsExist(relawan.relawan_email);
    }

    relawan.relawan_password = await bcrypt.hash(relawan.relawan_password, 10);
    relawan.relawan_kandidat_id = kandidatId;
    const createRelawan = await relawanModel.create(relawan);

    return createRelawan;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const get = async (relawanId) => {
  try {
    const relawan = await relawanModel.get(relawanId);
    if (!relawan) {
      throw new ResponseError(404, "Relawan not found");
    }
    return relawan;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getAll = async () => {
  try {
    const relawans = await relawanModel.getAll();
    if (!relawans) {
      throw new ResponseError(404, "Relawan not found");
    }

    return relawans;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getByKandidatId = async (kandidatId) => {
  try {
    const relawan = await relawanModel.getByKandidatId(kandidatId);
    if (!relawan) {
      throw new ResponseError(404, "Relawan not found");
    }
    return relawan;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const update = async (relawanId, data) => {
  try {
    const relawan = await relawanModel.get(relawanId);

    if (!relawan) {
      throw new ResponseError(404, "Relawan not found");
    }

    const validateRelawan = validate(updateRelawanValidations, data);

    if (validateRelawan.relawan_email !== relawan.relawan_email) {
      await checkRelawanIsExist(validateRelawan.relawan_email);
    }

    if (validateRelawan.relawan_password) {
      validateRelawan.relawan_password = await bcrypt.hash(
        validateRelawan.relawan_password,
        10
      );
    } else {
      validateRelawan.relawan_password = relawan.relawan_password;
    }

    if (validateRelawan.relawan_foto !== relawan.relawan_foto) {
      await fs.unlinkSync(path.join(`public/${relawan.relawan_foto}`));
    }

    const updatedRelawan = await relawanModel.update(
      relawanId,
      validateRelawan
    );
    return updatedRelawan;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const remove = async (relawanId) => {
  try {
    const relawan = await relawanModel.get(relawanId);

    if (!relawan) {
      throw new ResponseError(404, "Relawan not found");
    }

    await fs.unlinkSync(path.join(`public/${relawan.relawan_foto}`));

    const deletedRelawan = await relawanModel.remove(relawanId);
    return deletedRelawan;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

export default {
  create,
  get,
  getAll,
  getByKandidatId,
  update,
  remove,
};
