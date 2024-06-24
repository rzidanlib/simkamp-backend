import agamaService from "../../services/admin/agama-service.js";

const create = async (req, res, next) => {
  try {
    const result = await agamaService.create(req.body);
    res.status(200).json({
      message: "Sukses menambahkan data agama",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const agama = await agamaService.getAll();
    res
      .status(200)
      .json({ message: "Berhasil mendapatkan data agama", data: agama });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const agama = await agamaService.get(req.params.agamaId);
    res.status(200).json({ message: "Agama berhasil ditemukan", data: agama });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const agamaId = req.params.agamaId;
    const result = await agamaService.update(agamaId, req.body);
    res.status(200).json({ message: "Update agama berhasil", data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const agamaId = req.params.agamaId;
    const result = await agamaService.remove(agamaId);
    res.status(200).json({ message: "Agama Berhasil Di hapus", data: result });
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
