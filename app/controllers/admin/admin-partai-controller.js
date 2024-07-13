import { ResponseError } from "../../error/response-error.js";
import adminPartaiService from "../../services/admin/admin-partai-service.js";

const create = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ResponseError(400, "File is required");
    }

    req.body.foto_profil = `images/foto_profil/${req.file.filename}`;
    const data = req.body;
    const currentUser = {
      id: req.userId,
      role: req.userRole,
    };

    const result = await adminPartaiService.create(currentUser, data);

    res.status(200).json({
      message: "Berhasil menambahkan data admin partai",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const adminPartai = await adminPartaiService.getAll();
    res.status(200).json({
      message: "Berhasil mendapatkan semua data admin partai",
      data: adminPartai,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const adminPartai = await adminPartaiService.get(req.params.id);
    res.status(200).json({
      message: "Berhasil mendapatkan data admin partai",
      data: adminPartai,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const adminPartaiId = req.params.id;
    if (req.file) {
      req.body.foto_profil = `images/foto_profil/${req.file.filename}`;
    }
    const data = req.body;

    const adminPartai = await adminPartaiService.update(adminPartaiId, data);
    res
      .status(200)
      .json({ message: "Berhasil mengupdate admin partai", data: adminPartai });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const adminPartaiId = req.params.id;
    const adminPartai = await adminPartaiService.remove(adminPartaiId);
    res
      .status(200)
      .json({ message: "Berhasil menghapus admin partai", data: adminPartai });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  get,
  getAll,
  update,
  remove,
};
