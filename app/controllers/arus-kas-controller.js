import { ResponseError } from "../error/response-error.js";
import arusKasService from "../services/arus-kas-service.js";

const create = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ResponseError(400, "File are required");
    }
    req.body.aruskas_foto_kuitansi = `images/${req.file.filename}`;

    const data = req.body;
    const relawanId = req.userId;

    const result = await arusKasService.create(relawanId, data);
    res.status(200).json({
      message: "Berhasil menambahkan data arus kas",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const aruskas = await arusKasService.getAll();
    res.status(200).json({
      message: "Berhasil mendapatkan semua data arus kas",
      data: aruskas,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const aruskas = await arusKasService.get(req.params.id);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: aruskas,
    });
  } catch (error) {
    next(error);
  }
};

const getByRelawanId = async (req, res, next) => {
  try {
    let relawanId = "";
    if (req.userId) {
      relawanId = req.userId;
    } else {
      relawanId = req.params.id;
    }

    const aruskas = await arusKasService.getByRelawanId(relawanId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: aruskas,
    });
  } catch (error) {
    next(error);
  }
};

const getArusKasByKandidatId = async (req, res, next) => {
  try {
    const kandidatId = req.userId;
    const aruskas = await arusKasService.getArusKasByKandidatId(kandidatId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: aruskas,
    });
  } catch (error) {
    next(error);
  }
};

const getArusKasByAdminId = async (req, res, next) => {
  try {
    const adminId = req.userId;
    const aruskas = await arusKasService.getArusKasByAdminId(adminId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: aruskas,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const aruskasId = req.params.id;
    if (req.file) {
      req.body.aruskas_foto_kuitansi = `images/${req.file.filename}`;
    }

    const aruskas = await arusKasService.update(aruskasId, req.body);
    res.status(200).json({
      message: "Berhasil mengupdate data arus kas",
      data: aruskas,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const aruskasId = req.params.id;
    const aruskas = await arusKasService.remove(aruskasId);
    res.status(200).json({
      message: "Berhasil menghapus data arus kas",
      data: aruskas,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  getAll,
  get,
  getArusKasByKandidatId,
  getArusKasByAdminId,
  getByRelawanId,
  update,
  remove,
};
