import { ResponseError } from "../error/response-error.js";
import relawanService from "../services/relawan-service.js";

const create = async (req, res, next) => {
  try {
    // console.log(req.userId);

    if (!req.file) {
      throw new ResponseError(400, "File is required");
    }
    req.body.relawan_foto = `images/${req.file.filename}`;
    const data = req.body;
    const kandidatId = req.userId;

    const result = await relawanService.create(kandidatId, data);
    res.status(200).json({
      message: "Berhasil menambahkan data relawan",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const relawans = await relawanService.getAll();
    res.status(200).json({
      message: "Berhasil mendapatkan semua data relawan",
      data: relawans,
    });
  } catch (error) {
    next(error);
  }
};

const getByAdminId = async (req, res, next) => {
  try {
    const relawans = await relawanService.getByAdminId(req.userId);
    res.status(200).json({
      message: "Berhasil mendapatkan semua data relawan",
      data: relawans,
    });
  } catch (error) {
    next(error);
  }
};

const getByKandidatId = async (req, res, next) => {
  try {
    let kandidatId = "";
    if (req.userId) {
      kandidatId = req.userId;
    } else {
      kandidatId = req.params.id;
    }

    const kandidats = await relawanService.getByKandidatId(kandidatId);
    res.status(200).json({
      message: "Berhasil mendapatkan semua data kandidat",
      data: kandidats,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const relawan = await relawanService.get(req.params.id);
    res.status(200).json({
      message: "Berhasil mendapatkan data relawan",
      data: relawan,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    // console.log(req.body);

    const relawanId = req.params.id;
    if (req.file) {
      req.body.relawan_foto = `images/${req.file.filename}`;
    }

    const relawan = await relawanService.update(relawanId, req.body);
    res.status(200).json({
      message: "Berhasil mengupdate data relawan",
      data: relawan,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const relawanId = req.params.id;
    const relawan = await relawanService.remove(relawanId);
    res.status(200).json({
      message: "Berhasil menghapus data relawan",
      data: relawan,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  getAll,
  getByAdminId,
  getByKandidatId,
  get,
  update,
  remove,
};
