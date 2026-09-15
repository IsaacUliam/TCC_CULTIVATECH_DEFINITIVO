import { Router } from "express";

import UserController from "../controllers/UserController";

const userRoutes = Router();

userRoutes.post("/", UserController.create);
userRoutes.get("/", UserController.list);
userRoutes.get("/:id", UserController.show);

export default userRoutes;