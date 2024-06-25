import { ResponseError } from "../error/response-error.js";
import calonPemilihService from "../services/calon-pemilih-service.js";

const create = async (req, res, next) => {
  try {
    if (
      !req.files["calon_pemilih_foto"] ||
      !req.files["calon_pemilih_foto_ktp"]
    ) {
      throw new ResponseError(400, "Both files are required");
    }
    req.body.calon_pemilih_foto = `images/${req.files["calon_pemilih_foto"][0].filename}`;
    req.body.calon_pemilih_foto_ktp = `images/${req.files["calon_pemilih_foto_ktp"][0].filename}`;

    const data = req.body;
    const relawanId = req.userId;

    const result = await calonPemilihService.create(relawanId, data);
    res.status(200).json({
      message: "Berhasil menambahkan data calon pemilih",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const calonPemilihs = await calonPemilihService.getAll();
    res.status(200).json({
      message: "Berhasil mendapatkan semua data calon pemilih",
      data: calonPemilihs,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const calonPemilih = await calonPemilihService.get(req.params.id);
    res.status(200).json({
      message: "Berhasil mendapatkan data calon pemilih",
      data: calonPemilih,
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

    const calonPemilih = await calonPemilihService.getByRelawanId(relawanId);
    res.status(200).json({
      message: "Berhasil mendapatkan data calon pemilih",
      data: calonPemilih,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const calonPemilihId = req.params.id;
    if (req.files && req.files["calon_pemilih_foto"]) {
      req.body.calon_pemilih_foto = `images/${req.files["calon_pemilih_foto"][0].filename}`;
    }
    if (req.files && req.files["calon_pemilih_foto_ktp"]) {
      req.body.calon_pemilih_foto_ktp = `images/${req.files["calon_pemilih_foto_ktp"][0].filename}`;
    }

    const calonPemilih = await calonPemilihService.update(
      calonPemilihId,
      req.body
    );
    res.status(200).json({
      message: "Berhasil mengupdate data calon pemilih",
      data: calonPemilih,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const calonPemilihId = req.params.id;
    const calonPemilih = await calonPemilihService.remove(calonPemilihId);
    res.status(200).json({
      message: "Berhasil menghapus data calon pemilih",
      data: calonPemilih,
    });
  } catch (error) {
    next(error);
  }
};

export default { create, getAll, get, getByRelawanId, update, remove };
