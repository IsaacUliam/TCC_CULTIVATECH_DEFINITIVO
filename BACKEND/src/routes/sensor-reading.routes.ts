import { Router } from "express";
import SensorReadingController from "../controllers/SensorReadingController";
import { authMiddleware } from "../middlewares/authMiddleware";

const sensorReadingRoutes = Router();

// Rota para salvar novas leituras (vinda do app/dispositivo)
sensorReadingRoutes.post(
  "/",
  SensorReadingController.create
);

// Rota para buscar o histórico de leituras de um cultivo (protegida)
sensorReadingRoutes.get(
  "/crop/:cropId",
  authMiddleware,
  SensorReadingController.listByCrop
);

// Rota para buscar a última leitura de um cultivo (protegida)
sensorReadingRoutes.get(
  "/crop/:cropId/latest",
  authMiddleware,
  SensorReadingController.latestByCrop
);

export default sensorReadingRoutes;