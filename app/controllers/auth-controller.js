import { ResponseError } from "../error/response-error.js";
import authService from "../services/auth-service.js";

const register = async (req, res, next) => {
  const user = await authService.register(req.body);
  try {
    res.status(201).json({ message: "User berhasil didaftarkan", data: user });
  } catch (error) {
    next(error);
  }
};

const maxAge = 24 * 60 * 60 * 1000; // 1 hari dalam milidetik
const expirationDate = new Date(Date.now() + maxAge);

const login = async (req, res, next) => {
  const result = await authService.login(req.body);

  try {
    res.cookie("auth_token", result.token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      expires: expirationDate,
    });
    res.status(200).json({
      status: "success",
      message: "Login success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("auth_token");
    res.status(200).json({ message: "Logout berhasil" });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  const user = await authService.getCurrent(req.userId);

  try {
    res
      .status(200)
      .json({ message: "Berhasil mendapatkan user saat ini", data: user });
  } catch (error) {
    next(error);
  }
};

export default { login, logout, register, getCurrent };
