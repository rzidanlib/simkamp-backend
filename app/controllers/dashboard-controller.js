import dashboardService from "../services/dashboard-service.js";

// ArusKas
const getArusKasRelawan = async (req, res, next) => {
  try {
    let relawanId = "";
    if (req.userId) {
      relawanId = req.userId;
    } else {
      relawanId = req.params.id;
    }

    const aruskas = await dashboardService.getArusKasRelawan(relawanId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: aruskas,
    });
  } catch (error) {
    next(error);
  }
};

const getArusKasKandidat = async (req, res, next) => {
  try {
    const kandidatId = req.userId;
    const aruskas = await dashboardService.getArusKasKandidat(kandidatId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: aruskas,
    });
  } catch (error) {
    next(error);
  }
};

const getArusKasAdmin = async (req, res, next) => {
  try {
    const adminId = req.userId;
    const aruskas = await dashboardService.getArusKasAdmin(adminId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: aruskas,
    });
  } catch (error) {
    next(error);
  }
};

// Relawan
const getTotalRelawanKandidat = async (req, res, next) => {
  try {
    const kandidatId = req.userId;
    const relawan = await dashboardService.getTotalRelawanKandidat(kandidatId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: relawan,
    });
  } catch (error) {
    next(error);
  }
};

const getTotalRelawanAdmin = async (req, res, next) => {
  try {
    const adminId = req.userId;
    const relawan = await dashboardService.getTotalRelawanAdmin(adminId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: relawan,
    });
  } catch (error) {
    next(error);
  }
};

const getRelawanKandidat = async (req, res, next) => {
  try {
    const kandidatId = req.userId;
    const relawan = await dashboardService.getRelawanKandidat(kandidatId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: relawan,
    });
  } catch (error) {
    next(error);
  }
};

const getRelawanAdmin = async (req, res, next) => {
  try {
    const adminId = req.userId;
    const relawan = await dashboardService.getRelawanAdmin(adminId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: relawan,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getArusKasRelawan,
  getArusKasKandidat,
  getArusKasAdmin,
  getTotalRelawanKandidat,
  getTotalRelawanAdmin,
  getRelawanKandidat,
  getRelawanAdmin,
};
