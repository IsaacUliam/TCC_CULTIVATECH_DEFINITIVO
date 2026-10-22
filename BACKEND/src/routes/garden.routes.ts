import { Router } from "express";
import GardenController from "../controllers/GardenController";
import { authMiddleware } from "../middlewares/authMiddleware";

const gardenRoutes = Router();

gardenRoutes.use(authMiddleware);

gardenRoutes.get("/", GardenController.showCurrent);
gardenRoutes.post("/", GardenController.create);
gardenRoutes.patch("/monitoring", GardenController.setMonitoring);

export default gardenRoutes;
