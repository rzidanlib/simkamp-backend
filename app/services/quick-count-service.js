import quickCountModel from "../models/quick-count-model.js";
import fs from "fs";
import path from "path";

import { validate } from "../validations/validation.js";
import { ResponseError } from "../error/response-error.js";
import {
  createQuickCountValidations,
  updateQuickCountValidations,
} from "../validations/quick-count-validations.js";

const create = async (relawanId, data) => {
  try {
    const quickCount = validate(createQuickCountValidations, data);

    quickCount.quick_count_relawan_id = relawanId;
    const createdQuickCount = await quickCountModel.create(quickCount);
    return createdQuickCount;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const get = async (id) => {
  try {
    const quickCount = await quickCountModel.get(id);
    if (!quickCount) {
      throw new ResponseError(404, "Quick Count not found");
    }
    return quickCount;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getAll = async () => {
  try {
    const quickCounts = await quickCountModel.getAll();
    return quickCounts;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getByRelawanId = async (relawanId) => {
  try {
    const quickCount = await quickCountModel.getByRelawanId(relawanId);
    return quickCount;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const update = async (id, data) => {
  try {
    const quickCount = validate(updateQuickCountValidations, data);

    const existingQuickCount = await quickCountModel.get(id);
    if (!existingQuickCount) {
      throw new ResponseError(404, "Quick Count not found");
    }

    if (quickCount.quick_count_foto && existingQuickCount.quick_count_foto) {
      const oldFilePathFoto = path.join(
        `public/${existingQuickCount.quick_count_foto}`
      );
      try {
        await fs.promises.access(oldFilePathFoto);
        await fs.promises.unlink(oldFilePathFoto);
      } catch (error) {
        console.error("Error deleting old photo file:", error.message);
      }
    }

    const updatedQuickCount = await quickCountModel.update(id, quickCount);
    return updatedQuickCount;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const remove = async (id) => {
  try {
    const existingQuickCount = await quickCountModel.get(id);
    if (!existingQuickCount) {
      throw new ResponseError(404, "Quick Count not found");
    }

    if (existingQuickCount.quick_count_foto) {
      const oldFilePathFoto = path.join(
        `public/${existingQuickCount.quick_count_foto}`
      );
      try {
        await fs.promises.access(oldFilePathFoto);
        await fs.promises.unlink(oldFilePathFoto);
      } catch (error) {
        console.error("Error deleting old photo file:", error.message);
      }
    }

    const deletedQuickCount = await quickCountModel.remove(id);
    return deletedQuickCount;
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
