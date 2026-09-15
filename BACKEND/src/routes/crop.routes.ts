import { Router } from "express";

import CropController from "../controllers/CropController";
import SensorReadingController from "../controllers/SensorReadingController";
import HortaAnalysisController from "../controllers/HortaAnalysisController";

const cropRoutes = Router();

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

cropRoutes.delete("/:id", CropController.delete);

export default cropRoutes;