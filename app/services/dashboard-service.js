import dashboardModel from "../models/dashboard-model.js";

// ArusKas
const getArusKasRelawan = async (relawanId) => {
  try {
    const arusKas = await dashboardModel.getArusKasRelawan(relawanId);
    return arusKas;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getArusKasKandidat = async (kandidatId) => {
  try {
    const arusKas = await dashboardModel.getArusKasKandidat(kandidatId);
    return arusKas;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getArusKasAdmin = async (adminId) => {
  try {
    const arusKas = await dashboardModel.getArusKasAdmin(adminId);
    return arusKas;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

// Relawan
const getTotalRelawanKandidat = async (kandidatId) => {
  try {
    const arusKas = await dashboardModel.getTotalRelawanKandidat(kandidatId);
    return arusKas;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getTotalRelawanAdmin = async (adminId) => {
  try {
    const arusKas = await dashboardModel.getTotalRelawanAdmin(adminId);
    return arusKas;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getRelawanKandidat = async (kandidatId) => {
  try {
    const relawan = await dashboardModel.getRelawanKandidat(kandidatId);
    return relawan;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getRelawanAdmin = async (adminId) => {
  try {
    const relawan = await dashboardModel.getRelawanAdmin(adminId);
    return relawan;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getTotalPemilihRelawan = async (relawanId) => {
  try {
    const totalPemilih = await dashboardModel.getTotalPemilihRelawan(relawanId);
    return totalPemilih;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getTotalPemilihKandidat = async (kandidatId) => {
  try {
    const totalPemilih = await dashboardModel.getTotalPemilihKandidat(
      kandidatId
    );
    return totalPemilih;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getTotalPemilihAdmin = async (adminId) => {
  try {
    const totalPemilih = await dashboardModel.getTotalPemilihAdmin(adminId);
    return totalPemilih;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getPemilihRelawan = async (relawanId) => {
  try {
    const pemilih = await dashboardModel.getPemilihRelawan(relawanId);
    return pemilih;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getPemilihKandidat = async (kandidatId) => {
  try {
    const pemilih = await dashboardModel.getPemilihKandidat(kandidatId);
    return pemilih;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getPemilihAdmin = async (adminId) => {
  try {
    const pemilih = await dashboardModel.getPemilihAdmin(adminId);
    return pemilih;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getTotalLogistikRelawan = async (relawanId) => {
  try {
    const logistik = await dashboardModel.getTotalLogistikRelawan(relawanId);
    return logistik;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getTotalLogistikKandidat = async (kandidatId) => {
  try {
    const logistik = await dashboardModel.getTotalLogistikKandidat(kandidatId);
    return logistik;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getTotalLogistikAdmin = async (adminId) => {
  try {
    const logistik = await dashboardModel.getTotalLogistikAdmin(adminId);
    return logistik;
  } catch (error) {
    throw new ResponseError(500, error.message);
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
};
