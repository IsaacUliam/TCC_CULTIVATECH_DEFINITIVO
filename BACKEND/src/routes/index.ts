import { Router } from "express";

import userRoutes from "./user.routes";
import plantRoutes from "./plant.routes";
import cropRoutes from "./crop.routes";
import sensorReadingRoutes from "./sensor-reading.routes";
import authRoutes from "./auth.routes";

import CropController from "../controllers/CropController";

const routes = Router();

routes.get("/", (request, response) => {
  return response.status(200).json({
    message: "API da Horta Conectada funcionando!"
  });
});

routes.get("/health", (request, response) => {
  return response.status(200).json({
    status: "online"
  });
});

routes.use("/users", userRoutes);

routes.use("/plants", plantRoutes);

routes.use("/crops", cropRoutes);

routes.use(
  "/sensor-readings",
  sensorReadingRoutes
);

routes.get(
  "/users/:userId/crops",
  CropController.listByUser
);

routes.use(
"/auth",
authRoutes
);

export default routes;