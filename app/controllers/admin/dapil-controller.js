import dapilService from "../../services/admin/dapil-service.js";

const create = async (req, res, next) => {
  try {
    const result = await dapilService.create(req.body);
    res.status(200).json({
      message: "Sukses menambahkan data dapil",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const dapil = await dapilService.getAll();
    res
      .status(200)
      .json({ message: "Berhasil mendapatkan data dapil", data: dapil });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const dapil = await dapilService.get(req.params.dapilId);
    res.status(200).json({ message: "dapil berhasil ditemukan", data: dapil });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const dapilId = req.params.dapilId;
    const result = await dapilService.update(dapilId, req.body);
    res.status(200).json({ message: "Update dapil berhasil", data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const dapilId = req.params.dapilId;
    const result = await dapilService.remove(dapilId);
    res.status(200).json({ message: "dapil Berhasil Di hapus", data: result });
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
