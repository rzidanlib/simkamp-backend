import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import kandidatModel from "../../models/admin/kandidat-model.js";

import { validate } from "../../validations/validation.js";
import { ResponseError } from "../../error/response-error.js";
import {
  createKandidatValidations,
  updateKandidatValidations,
} from "../../validations/admin/kandidat-validations.js";

const checkKandidatIsExist = async (email) => {
  const existingKandidat = await kandidatModel.getByEmail(email);
  if (existingKandidat) {
    throw new ResponseError(403, "Kandidat sudah ada");
  }
};

const create = async (adminId, request) => {
  try {
    const kandidat = validate(createKandidatValidations, request);

    if (kandidat.kandidat_email) {
      await checkKandidatIsExist(kandidat.kandidat_email);
    }

    kandidat.kandidat_password = await bcrypt.hash(
      kandidat.kandidat_password,
      10
    );
    kandidat.kandidat_admin_id = adminId;
    const createKandidat = await kandidatModel.create(kandidat);

    return createKandidat;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const get = async (kandidatId) => {
  try {
    const kandidat = await kandidatModel.get(kandidatId);
    if (!kandidat) {
      throw new ResponseError(404, "Kandidat not found");
    }
    return kandidat;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getAll = async () => {
  try {
    const kandidats = await kandidatModel.getAll();
    if (!kandidats) {
      throw new ResponseError(404, "Kandidat not found");
    }

    return kandidats;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getByAdminId = async (adminId) => {
  try {
    const kandidats = await kandidatModel.getByAdminId(adminId);
    if (!kandidats) {
      throw new ResponseError(404, "Kandidat not found");
    }
    return kandidats;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const update = async (kandidatId, data) => {
  try {
    const kandidat = await kandidatModel.get(kandidatId);

    if (!kandidat) {
      throw new ResponseError(404, "Kandidat not found");
    }

    const validateKandidat = validate(updateKandidatValidations, data);

    if (validateKandidat.kandidat_email !== kandidat.kandidat_email) {
      await checkKandidatIsExist(validateKandidat.kandidat_email);
    }

    if (validateKandidat.kandidat_password) {
      validateKandidat.kandidat_password = await bcrypt.hash(
        validateKandidat.kandidat_password,
        10
      );
    } else {
      validateKandidat.kandidat_password = kandidat.kandidat_password;
    }

    if (validateKandidat.kandidat_foto !== kandidat.kandidat_foto) {
      await fs.unlinkSync(path.join(`public/${kandidat.kandidat_foto}`));
    }

    const updatedKandidat = await kandidatModel.update(
      kandidatId,
      validateKandidat
    );
    return updatedKandidat;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const remove = async (kandidatId) => {
  try {
    const kandidat = await kandidatModel.get(kandidatId);

    if (!kandidat) {
      throw new ResponseError(404, "Kandidat not found");
    }
    await fs.unlinkSync(path.join(`public/${kandidat.kandidat_foto}`));

    const deletedKandidat = await kandidatModel.remove(kandidatId);
    return deletedKandidat;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

export default {
  create,
  get,
  getAll,
  getByAdminId,
  update,
  remove,
};
