import jenisPemilihanService from "../../services/admin/jenis-pemilihan-service.js";

const create = async (req, res, next) => {
  try {
    const result = await jenisPemilihanService.create(req.body);
    res.status(200).json({
      message: "Sukses menambahkan data jenis pemilihan",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const jenisPemilihan = await jenisPemilihanService.getAll();
    res.status(200).json({
      message: "Berhasil mendapatkan data jenis pemilihan",
      data: jenisPemilihan,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const jenisPemilihan = await jenisPemilihanService.get(
      req.params.jenisPemilihanId
    );
    res.status(200).json({
      message: "Jenis Pemilihan berhasil ditemukan",
      data: jenisPemilihan,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const jenisPemilihanId = req.params.jenisPemilihanId;
    const result = await jenisPemilihanService.update(
      jenisPemilihanId,
      req.body
    );
    res
      .status(200)
      .json({ message: "Update Jenis Pemilihan berhasil", data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const jenisPemilihanId = req.params.jenisPemilihanId;
    const result = await jenisPemilihanService.remove(jenisPemilihanId);
    res
      .status(200)
      .json({ message: "Jenis Pemilihan Berhasil Di hapus", data: result });
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
