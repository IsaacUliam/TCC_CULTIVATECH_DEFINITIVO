import { Router } from "express";

import CropController from "../controllers/CropController";
import SensorReadingController from "../controllers/SensorReadingController";
import HortaAnalysisController from "../controllers/HortaAnalysisController";
import { authMiddleware } from "../middlewares/authMiddleware";

const cropRoutes = Router();

// Aplica a autenticação JWT para todas as rotas deste arquivo
cropRoutes.use(authMiddleware);

cropRoutes.post("/", CropController.create);

cropRoutes.get("/", CropController.list);

cropRoutes.get("/:cropId/readings/latest",
  SensorReadingController.latestByCrop
);

cropRoutes.get("/:cropId/readings",
  SensorReadingController.listByCrop
);

cropRoutes.get(
  "/:cropId/analysis",
  HortaAnalysisController.show
);

cropRoutes.get("/:id", CropController.show);

cropRoutes.put("/:id", CropController.update);

cropRoutes.patch("/:id/water", CropController.water);

cropRoutes.delete("/:id", CropController.delete);

export default cropRoutes;