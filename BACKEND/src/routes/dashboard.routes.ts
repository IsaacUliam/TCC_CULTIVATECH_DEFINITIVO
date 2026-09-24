import { Router } from "express";
import DashboardController from "../controllers/DashboardController";
import { authMiddleware } from "../middlewares/authMiddleware";

const dashboardRoutes = Router();

dashboardRoutes.get(
  "/crops/:cropId/dashboard",
  authMiddleware,
  DashboardController.show
);

export default dashboardRoutes;