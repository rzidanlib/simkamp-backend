import userService from "../../services/admin/user-service.js";

const create = async (req, res, next) => {
  try {
    const result = await userService.create(req.body);
    res.status(200).json({
      message: "Berhasil menambahkan user baru",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res
      .status(200)
      .json({ message: "Data semua user berhasil didapatkan", data: users });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const user = await userService.get(req.params.userId);
    res.status(200).json({ message: "User berhasil didapatkan", data: user });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await userService.update(userId, req.body);

    res.status(200).json({ message: "Update user berhasil", data: user });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await userService.remove(userId);
    res.status(200).json({ message: "User Berhasil Di hapus", data: user });
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
