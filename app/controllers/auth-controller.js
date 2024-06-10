import { ResponseError } from "../error/response-error.js";
import authService from "../services/auth-service.js";

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    if (!result) {
      throw new ResponseError(401, "Login failed"); // Atau pesan kesalahan yang sesuai
    }

    res.status(200).json({
      message: "Login successful",
      data: {
        user: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const token = req.get("Authorization").split(" ")[1];
    const expiry = new Date(Date.now() + 15 * 60 * 1000);
    const blacklistToken = await authService.logout(token, expiry);

    res.status(200).json({ message: "Logout successful", blacklistToken });
  } catch (error) {
    next(error);
  }
};

export default { login, logout };
