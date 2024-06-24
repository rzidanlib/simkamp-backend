import userService from "../../services/admin/user-service.js";

const create = async (req, res, next) => {
  try {
    const result = await userService.create(req.body);
    res.status(200).json({
      message: "Sukses",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.status(200).json({ message: "Get all users", data: users });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const user = await userService.get(req.params.userId);
    res.status(200).json({ message: "Get user by id", data: user });
  } catch (error) {
    next(error);
  }
};

const updateCurrent = async (req, res, next) => {
  try {
    const currentUserId = req.userId;
    const user = await userService.updateCurrent(currentUserId, req.body);

    res.status(200).json({ message: "Update user", data: user });
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
  updateCurrent,
  remove,
};
