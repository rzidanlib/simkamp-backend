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

export default {
  getArusKasRelawan,
  getArusKasKandidat,
  getArusKasAdmin,
  getTotalRelawanKandidat,
  getTotalRelawanAdmin,
  getRelawanKandidat,
  getRelawanAdmin,
};
