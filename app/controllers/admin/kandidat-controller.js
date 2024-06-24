import { ResponseError } from "../../error/response-error.js";
import kandidatService from "../../services/admin/kandidat-service.js";

const create = async (req, res, next) => {
  try {
    // console.log(req.userId);
    if (!req.file) {
      throw new ResponseError(400, "File is required");
    }

    req.body.kandidat_foto = `images/${req.file.filename}`;
    const data = req.body;
    const adminId = req.userId;

    const result = await kandidatService.create(adminId, data);

    res.status(200).json({
      message: "Berhasil menambahkan data kandidat",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const kandidats = await kandidatService.getAll();
    res.status(200).json({
      message: "Berhasil mendapatkan semua data kandidat",
      data: kandidats,
    });
  } catch (error) {
    next(error);
  }
};

const getByAdminId = async (req, res, next) => {
  try {
    const kandidats = await kandidatService.getByAdminId(req.userId);
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
    const kandidat = await kandidatService.get(req.params.id);
    res
      .status(200)
      .json({ message: "Berhasil mendapatkan data kandidat", data: kandidat });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const kandidatId = req.params.id;
    if (req.file) {
      req.body.kandidat_foto = `images/${req.file.filename}`;
    }
    const kandidat = await kandidatService.update(kandidatId, req.body);
    res
      .status(200)
      .json({ message: "Berhasil mengupdate kandidat", data: kandidat });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const kandidatId = req.params.id;
    const kandidat = await kandidatService.remove(kandidatId);
    res
      .status(200)
      .json({ message: "Berhasil menghapus kandidat", data: kandidat });
  } catch (error) {
    next(error);
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
