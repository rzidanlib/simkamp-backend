import miscService from "../services/misc-service.js";

const get = async (req, res, next) => {
  try {
    const nav = await miscService.get();

    // kembalikan dalam bentuk array
    res.status(200).json({
      message: "Data navigasi",
      data: nav,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await miscService.create(req.body);
    res.status(200).json({
      message: "Sukses",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default { get, create };
