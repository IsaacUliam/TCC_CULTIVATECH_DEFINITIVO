import { Router } from "express";

import SensorReadingController from "../controllers/SensorReadingController";

const sensorReadingRoutes = Router();

sensorReadingRoutes.post(
  "/",
  SensorReadingController.create
);

sensorReadingRoutes.get(
  "/device/:deviceCode/latest",
  SensorReadingController.latestByDevice
);

export default sensorReadingRoutes;