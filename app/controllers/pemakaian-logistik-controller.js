import pemakaianLogistikService from "../services/pemakaian-logistik-service.js";

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const relawanId = req.userId;

    const result = await pemakaianLogistikService.create(relawanId, data);
    res.status(200).json({
      message: "Berhasil menambahkan data pemakaian logistik",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const pemakaianLogistiks = await pemakaianLogistikService.getAll();
    res.status(200).json({
      message: "Berhasil mendapatkan semua data pemakaian logistik",
      data: pemakaianLogistiks,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const pemakaianLogistik = await pemakaianLogistikService.get(req.params.id);
    res.status(200).json({
      message: "Berhasil mendapatkan data pemakaian logistik",
      data: pemakaianLogistik,
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

    const pemakaianLogistik = await pemakaianLogistikService.getByRelawanId(
      relawanId
    );
    res.status(200).json({
      message:
        "Berhasil mendapatkan data pemakaian logistik berdasarkan ID relawan",
      data: pemakaianLogistik,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const pemakaianLogistikId = req.params.id;
    const pemakaianLogistik = await pemakaianLogistikService.update(
      pemakaianLogistikId,
      req.body
    );
    res.status(200).json({
      message: "Berhasil mengupdate data pemakaian logistik",
      data: pemakaianLogistik,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const pemakaianLogistikId = req.params.id;
    const pemakaianLogistik = await pemakaianLogistikService.remove(
      pemakaianLogistikId
    );
    res.status(200).json({
      message: "Berhasil menghapus data pemakaian logistik",
      data: pemakaianLogistik,
    });
  } catch (error) {
    next(error);
  }
};

export default { create, getAll, get, getByRelawanId, update, remove };
