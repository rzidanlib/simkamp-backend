import express from "express";
import miscController from "../../controllers/misc-controller.js";

const miscRouter = new express.Router();

miscRouter.get("/misc/get-navigations", miscController.get);
miscRouter.post("/misc/create-navigations", miscController.create);

export { miscRouter };
