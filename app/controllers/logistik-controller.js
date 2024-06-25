import { ResponseError } from "../error/response-error.js";
import logistikService from "../services/logistik-service.js";

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const relawanId = req.userId;

    const result = await logistikService.create(relawanId, data);
    res.status(200).json({
      message: "Berhasil menambahkan data logistik",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const logistiks = await logistikService.getAll();
    res.status(200).json({
      message: "Berhasil mendapatkan semua data logistik",
      data: logistiks,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const logistik = await logistikService.get(req.params.id);
    res.status(200).json({
      message: "Berhasil mendapatkan data logistik",
      data: logistik,
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

    const logistik = await logistikService.getByRelawanId(relawanId);
    res.status(200).json({
      message: "Berhasil mendapatkan data logistik",
      data: logistik,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const logistikId = req.params.id;
    const logistik = await logistikService.update(logistikId, req.body);
    res.status(200).json({
      message: "Berhasil mengupdate data logistik",
      data: logistik,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const logistikId = req.params.id;
    const logistik = await logistikService.remove(logistikId);
    res.status(200).json({
      message: "Berhasil menghapus data logistik",
      data: logistik,
    });
  } catch (error) {
    next(error);
  }
};

export default { create, getAll, get, getByRelawanId, update, remove };
