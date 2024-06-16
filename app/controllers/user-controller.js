import userService from "../services/user-service.js";

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

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUser();
    res.status(200).json({ message: "Get all users", data: users });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const currentUserId = req.userId;
    const user = await userService.get(currentUserId);

    res.status(200).json({ message: "Get current user", data: { user } });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.userId);
    res.status(200).json({ message: "Get user by id", data: { user } });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const currentUserId = req.userId;
    const user = await userService.update(currentUserId, req.body);

    res.status(200).json({ message: "Update user", data: { user } });
  } catch (error) {
    next(error);
  }
};

export default { create, getUser, getAllUsers, getUserById, updateUser };
