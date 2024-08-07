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

const getTotalPemilihRelawan = async (req, res, next) => {
  try {
    const relawanId = req.userId;
    const pemilih = await dashboardService.getTotalPemilihRelawan(relawanId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: pemilih,
    });
  } catch (error) {
    next(error);
  }
};

const getTotalPemilihKandidat = async (req, res, next) => {
  try {
    const kandidatId = req.userId;
    const pemilih = await dashboardService.getTotalPemilihKandidat(kandidatId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: pemilih,
    });
  } catch (error) {
    next(error);
  }
};

const getTotalPemilihAdmin = async (req, res, next) => {
  try {
    const adminId = req.userId;
    const pemilih = await dashboardService.getTotalPemilihAdmin(adminId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: pemilih,
    });
  } catch (error) {
    next(error);
  }
};

const getPemilihRelawan = async (req, res, next) => {
  try {
    const relawanId = req.userId;
    const pemilih = await dashboardService.getPemilihRelawan(relawanId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: pemilih,
    });
  } catch (error) {
    next(error);
  }
};

const getPemilihKandidat = async (req, res, next) => {
  try {
    const kandidatId = req.userId;
    const pemilih = await dashboardService.getPemilihKandidat(kandidatId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: pemilih,
    });
  } catch (error) {
    next(error);
  }
};

const getPemilihAdmin = async (req, res, next) => {
  try {
    const adminId = req.userId;
    const pemilih = await dashboardService.getPemilihAdmin(adminId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: pemilih,
    });
  } catch (error) {
    next(error);
  }
};

const getTotalLogistikRelawan = async (req, res, next) => {
  try {
    const relawanId = req.userId;
    const logistik = await dashboardService.getTotalLogistikRelawan(relawanId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: logistik,
    });
  } catch (error) {
    next(error);
  }
};

const getTotalLogistikKandidat = async (req, res, next) => {
  try {
    const kandidatId = req.userId;
    const logistik = await dashboardService.getTotalLogistikKandidat(
      kandidatId
    );
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: logistik,
    });
  } catch (error) {
    next(error);
  }
};

const getTotalLogistikAdmin = async (req, res, next) => {
  try {
    const adminId = req.userId;
    const logistik = await dashboardService.getTotalLogistikAdmin(adminId);
    res.status(200).json({
      message: "Berhasil mendapatkan data arus kas",
      data: logistik,
    });
  } catch (error) {
    next(error);
  }
};

const getDashboardAdmin = async (req, res, next) => {
  try {
    const users = await dashboardService.getUsers();
    const totalUsers = await dashboardService.getTotalUsers();
    const kandidat = await dashboardService.getKandidat();
    const totalKandidat = await dashboardService.getTotalKandidat();
    const relawan = await dashboardService.getRelawan();
    const totalRelawan = await dashboardService.getTotalRelawan();

    res.status(200).json({
      message: "Berhasil mendapatkan data dashboard admin",
      data: {
        users,
        totalUsers,
        kandidat,
        totalKandidat,
        relawan,
        totalRelawan,
      },
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
  getTotalPemilihRelawan,
  getTotalPemilihKandidat,
  getTotalPemilihAdmin,
  getPemilihRelawan,
  getPemilihKandidat,
  getPemilihAdmin,
  getTotalLogistikRelawan,
  getTotalLogistikKandidat,
  getTotalLogistikAdmin,
  getDashboardAdmin,
};
