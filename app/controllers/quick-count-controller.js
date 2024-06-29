import { ResponseError } from "../error/response-error.js";
import quickCountService from "../services/quick-count-service.js";

const create = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ResponseError(400, "File is required");
    }
    req.body.quick_count_foto = `images/${req.file.filename}`;

    const data = req.body;
    const relawanId = req.userId;

    const result = await quickCountService.create(relawanId, data);
    res.status(200).json({
      message: "Berhasil menambahkan data quick count",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const quickCounts = await quickCountService.getAll();
    res.status(200).json({
      message: "Berhasil mendapatkan semua data quick count",
      data: quickCounts,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const quickCount = await quickCountService.get(req.params.id);
    res.status(200).json({
      message: "Berhasil mendapatkan data quick count",
      data: quickCount,
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

    const quickCount = await quickCountService.getByRelawanId(relawanId);
    res.status(200).json({
      message: "Berhasil mendapatkan data quick count",
      data: quickCount,
    });
  } catch (error) {
    next(error);
  }
};

const getByKandidatId = async (req, res, next) => {
  try {
    const quickCount = await quickCountService.getByKandidatId(req.userId);
    res.status(200).json({
      message: "Berhasil mendapatkan data quick count",
      data: quickCount,
    });
  } catch (error) {
    next(error);
  }
};

const getByAdminId = async (req, res, next) => {
  try {
    const quickCount = await quickCountService.getByAdminId(req.userId);
    res.status(200).json({
      message: "Berhasil mendapatkan data quick count",
      data: quickCount,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const quickCountId = req.params.id;
    if (req.file) {
      req.body.quick_count_foto = `images/${req.file.filename}`;
    }

    const quickCount = await quickCountService.update(quickCountId, req.body);
    res.status(200).json({
      message: "Berhasil mengupdate data quick count",
      data: quickCount,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const quickCountId = req.params.id;
    const quickCount = await quickCountService.remove(quickCountId);
    res.status(200).json({
      message: "Berhasil menghapus data quick count",
      data: quickCount,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  getAll,
  get,
  getByKandidatId,
  getByAdminId,
  getByRelawanId,
  update,
  remove,
};
