import { Router } from "express";

import PlantController from "../controllers/PlantController";

const plantRoutes = Router();

plantRoutes.post("/", PlantController.create);
plantRoutes.get("/", PlantController.list);
plantRoutes.get("/:id", PlantController.show);
plantRoutes.put("/:id", PlantController.update);
plantRoutes.delete("/:id", PlantController.delete);

export default plantRoutes;