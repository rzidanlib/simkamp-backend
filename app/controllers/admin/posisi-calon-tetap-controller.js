import posisiCalonTetapService from "../../services/admin/posisi--calon-tetap-service.js";

const create = async (req, res, next) => {
  try {
    const result = await posisiCalonTetapService.create(req.body);
    res.status(200).json({
      message: "Sukses menambahkan data posisi calon tetap",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const jenisPemilihan = await posisiCalonTetapService.getAll();
    res.status(200).json({
      message: "Berhasil mendapatkan data posisi calon tetap",
      data: jenisPemilihan,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const jenisPemilihan = await posisiCalonTetapService.get(req.params.id);
    res.status(200).json({
      message: "Posisi calon tetap berhasil ditemukan",
      data: jenisPemilihan,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await posisiCalonTetapService.update(id, req.body);
    res
      .status(200)
      .json({ message: "Update posisi calon tetap berhasil", data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await posisiCalonTetapService.remove(id);
    res
      .status(200)
      .json({ message: "Posisi calon tetap Berhasil Di hapus", data: result });
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
