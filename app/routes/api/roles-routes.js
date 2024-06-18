import express from "express";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import rolesController from "../../controllers/roles-controller.js";

const rolesRouter = new express.Router();
rolesRouter.use(authMiddleware);

rolesRouter.post("/roles/create", rolesController.create);
rolesRouter.get("/roles/get-role/:roleId", rolesController.getRole);
rolesRouter.get("/roles/get-all-roles", rolesController.getAllRoles);
rolesRouter.post("/roles/update-role", rolesController.updateRole);
rolesRouter.delete("/roles/remove-role/:roleId", rolesController.removeRole);

export { rolesRouter };
