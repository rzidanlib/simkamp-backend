import partaiService from "../../services/admin/partai-service.js";
import { ResponseError } from "../../error/response-error.js";

const create = async (req, res, next) => {
  try {
    const { akronim, nama_partai, nomor } = req.body;
    if (!req.file) {
      throw new ResponseError(400, "File is required");
    }

    const data = {
      akronim,
      nama_partai,
      nomor,
      logo: `images/partai/${req.file.filename}`,
    };

    const result = await partaiService.create(data);
    res.status(200).json({
      message: "Berhasil menginputkan data partai baru",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const partai = await partaiService.getAll();
    res.status(200).json({ message: "Get all partai", data: partai });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const partai = await partaiService.get(req.params.partaiId);
    res.status(200).json({ message: "Get partai", data: partai });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { akronim, nama_partai, nomor } = req.body;
    const data = {
      akronim,
      nama_partai,
      nomor,
    };

    if (req.file) {
      data.logo = `images/partai/${req.file.filename}`;
    }

    const result = await partaiService.update(req.params.partaiId, data);
    res.status(200).json({ message: "Update partai", data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await partaiService.remove(req.params.partaiId);
    res.status(200).json({ message: "Partai Berhasil Di hapus" });
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
