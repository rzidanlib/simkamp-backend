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

const getUser = async (req, res, next) => {
  try {
    const currentUserId = req.userId;
    const user = await userService.get(currentUserId);

    res.status(200).json({ message: "Get current user", data: { user } });
  } catch (error) {
    next(error);
  }
};

export default { create, getUser };
