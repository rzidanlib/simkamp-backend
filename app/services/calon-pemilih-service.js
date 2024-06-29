import calonPemilihModel from "../models/calon-pemilih-model.js";
import fs from "fs";
import path from "path";

import { validate } from "../validations/validation.js";
import { ResponseError } from "../error/response-error.js";
import {
  createCalonPemilihValidations,
  updateCalonPemilihValidations,
} from "../validations/calon-pemilih-validations.js";

const create = async (relawanId, data) => {
  try {
    const calonPemilih = validate(createCalonPemilihValidations, data);

    calonPemilih.calon_pemilih_relawan_id = relawanId;
    const createdCalonPemilih = await calonPemilihModel.create(calonPemilih);

    return createdCalonPemilih;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

// Function to get a single Calon Pemilih by ID
const get = async (id) => {
  try {
    const calonPemilih = await calonPemilihModel.get(id);
    if (!calonPemilih) {
      throw new ResponseError(404, "Calon Pemilih not found");
    }
    return calonPemilih;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

// Function to get all Calon Pemilih
const getAll = async () => {
  try {
    const calonPemilihs = await calonPemilihModel.getAll();
    return calonPemilihs;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getByRelawanId = async (relawanId) => {
  try {
    const calonPemilih = await calonPemilihModel.getByRelawanId(relawanId);
    return calonPemilih;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getByKandidatId = async (kandidatId) => {
  try {
    const calonPemilih = await calonPemilihModel.getByKandidatId(kandidatId);
    return calonPemilih;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getByAdminId = async (adminId) => {
  try {
    const calonPemilih = await calonPemilihModel.getByAdminId(adminId);
    return calonPemilih;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const update = async (id, data) => {
  try {
    const calonPemilih = validate(updateCalonPemilihValidations, data);

    const existingCalonPemilih = await calonPemilihModel.get(id);
    if (!existingCalonPemilih) {
      throw new ResponseError(404, "Calon Pemilih not found");
    }

    if (
      calonPemilih.calon_pemilih_foto &&
      existingCalonPemilih.calon_pemilih_foto
    ) {
      const oldFilePathFoto = path.join(
        `public/${existingCalonPemilih.calon_pemilih_foto}`
      );
      try {
        await fs.promises.access(oldFilePathFoto);
        await fs.promises.unlink(oldFilePathFoto);
      } catch (error) {
        console.error("Error deleting old photo file:", error.message);
      }
    }

    if (
      calonPemilih.calon_pemilih_foto_ktp &&
      existingCalonPemilih.calon_pemilih_foto_ktp
    ) {
      const oldFilePathKtp = path.join(
        `public/${existingCalonPemilih.calon_pemilih_foto_ktp}`
      );
      try {
        await fs.promises.access(oldFilePathKtp);
        await fs.promises.unlink(oldFilePathKtp);
      } catch (error) {
        console.error("Error deleting old KTP file:", error.message);
      }
    }

    const updatedCalonPemilih = await calonPemilihModel.update(
      id,
      calonPemilih
    );
    return updatedCalonPemilih;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const remove = async (id) => {
  try {
    // Check if Calon Pemilih exists
    const existingCalonPemilih = await calonPemilihModel.get(id);
    if (!existingCalonPemilih) {
      throw new ResponseError(404, "Calon Pemilih not found");
    }

    // Delete associated photos if they exist
    if (existingCalonPemilih.calon_pemilih_foto) {
      const fotoPath = path.join(
        "public",
        existingCalonPemilih.calon_pemilih_foto
      );
      try {
        await fs.promises.unlink(fotoPath);
      } catch (error) {
        console.error(`Error deleting photo file: ${fotoPath}`, error.message);
      }
    }

    if (existingCalonPemilih.calon_pemilih_foto_ktp) {
      const fotoKtpPath = path.join(
        "public",
        existingCalonPemilih.calon_pemilih_foto_ktp
      );
      try {
        await fs.promises.unlink(fotoKtpPath);
      } catch (error) {
        console.error(`Error deleting KTP file: ${fotoKtpPath}`, error.message);
      }
    }

    // Remove Calon Pemilih using the model
    const deletedCalonPemilih = await calonPemilihModel.remove(id);
    return deletedCalonPemilih;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

// Export the service functions
export default {
  create,
  get,
  getAll,
  getByKandidatId,
  getByAdminId,
  getByRelawanId,
  update,
  remove,
};
