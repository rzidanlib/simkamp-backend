import { ResponseError } from "../error/response-error.js";
import dashboardModel from "../models/dashboard-model.js";

// ArusKas
const getArusKasRelawan = async (relawanId) => {
  try {
    const arusKas = await dashboardModel.getArusKasRelawan(relawanId);
    if (arusKas === undefined) {
      return {
        description: "Kosong",
        currentvalue: 0,
        newvalue: 0,
      };
    } else {
      return arusKas;
    }
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getArusKasKandidat = async (kandidatId) => {
  try {
    const arusKas = await dashboardModel.getArusKasKandidat(kandidatId);
    if (arusKas === undefined) {
      return {
        description: "Kosong",
        currentvalue: 0,
        newvalue: 0,
      };
    } else {
      return arusKas;
    }
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getArusKasAdmin = async (adminId) => {
  try {
    const arusKas = await dashboardModel.getArusKasAdmin(adminId);
    if (arusKas === undefined) {
      return {
        description: "Kosong",
        currentvalue: 0,
        newvalue: 0,
      };
    } else {
      return arusKas;
    }
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

// Relawan
const getTotalRelawanKandidat = async (kandidatId) => {
  try {
    const totalRelawan = await dashboardModel.getTotalRelawanKandidat(
      kandidatId
    );
    if (totalRelawan === undefined) {
      return {
        currentvalue: 0,
      };
    } else {
      return totalRelawan;
    }
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getTotalRelawanAdmin = async (adminId) => {
  try {
    const totalRelawan = await dashboardModel.getTotalRelawanAdmin(adminId);
    if (totalRelawan === undefined) {
      return {
        currentvalue: 0,
      };
    } else {
      return totalRelawan;
    }
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
    if (totalPemilih === undefined) {
      return {
        currentvalue: 0,
      };
    } else {
      return totalPemilih;
    }
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getTotalPemilihKandidat = async (kandidatId) => {
  try {
    const totalPemilih = await dashboardModel.getTotalPemilihKandidat(
      kandidatId
    );
    if (totalPemilih === undefined) {
      return {
        currentvalue: 0,
      };
    } else {
      return totalPemilih;
    }
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getTotalPemilihAdmin = async (adminId) => {
  try {
    const totalPemilih = await dashboardModel.getTotalPemilihAdmin(adminId);
    if (totalPemilih === undefined) {
      return {
        currentvalue: 0,
      };
    } else {
      return totalPemilih;
    }
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
    if (logistik === undefined) {
      return {
        currentvalue: 0,
        newvalue: "Kosong",
      };
    } else {
      return logistik;
    }
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getTotalLogistikKandidat = async (kandidatId) => {
  try {
    const logistik = await dashboardModel.getTotalLogistikKandidat(kandidatId);
    if (logistik === undefined) {
      return {
        currentvalue: 0,
        newvalue: "Kosong",
      };
    } else {
      return logistik;
    }
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getTotalLogistikAdmin = async (adminId) => {
  try {
    const logistik = await dashboardModel.getTotalLogistikAdmin(adminId);
    if (logistik === undefined) {
      return {
        currentvalue: 0,
        newvalue: "Kosong",
      };
    } else {
      return logistik;
    }
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

// Dashboard Administrator
const getTotalUsers = async () => {
  try {
    const users = await dashboardModel.getTotalUsers();
    if (users === undefined) {
      return {
        currentvalue: 0,
      };
    } else {
      return users;
    }
  } catch {
    throw new ResponseError(500, error.message);
  }
};

const getUsers = async () => {
  try {
    const users = await dashboardModel.getUsers();
    return users;
  } catch {
    throw new ResponseError(500, error.message);
  }
};

const getTotalKandidat = async () => {
  try {
    const kandidat = await dashboardModel.getTotalKandidat();
    if (kandidat === undefined) {
      return {
        currentValue: 0,
      };
    } else {
      return kandidat;
    }
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getKandidat = async (adminId) => {
  try {
    const kandidat = await dashboardModel.getKandidat(adminId);
    return kandidat;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getTotalRelawan = async () => {
  try {
    const relawan = await dashboardModel.getTotalRelawan();
    if (relawan === undefined) {
      return {
        currentValue: 0,
      };
    } else {
      return relawan;
    }
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getRelawan = async (adminId) => {
  try {
    const relawan = await dashboardModel.getRelawan(adminId);
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
  getTotalPemilihRelawan,
  getTotalPemilihKandidat,
  getTotalPemilihAdmin,
  getPemilihRelawan,
  getPemilihKandidat,
  getPemilihAdmin,
  getTotalLogistikRelawan,
  getTotalLogistikKandidat,
  getTotalLogistikAdmin,
  getTotalUsers,
  getUsers,
  getTotalKandidat,
  getKandidat,
  getTotalRelawan,
  getRelawan,
};
