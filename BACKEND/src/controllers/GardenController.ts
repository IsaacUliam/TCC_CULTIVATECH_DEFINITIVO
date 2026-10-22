import { Request, Response } from "express";
import GardenService from "../services/GardenService";
import { GardenServiceError } from "../models/Garden";

class GardenController {
  async showCurrent(request: Request, response: Response) {
    const userId = request.user?.id;

    if (!userId) {
      return response.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const garden = await GardenService.findByUser(userId);
      return response.status(200).json(garden);
    } catch {
      return response.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  async create(request: Request, response: Response) {
    const userId = request.user?.id;

    if (!userId) {
      return response.status(401).json({ message: "Usuário não autenticado." });
    }

    const { name } = request.body ?? {};
    if (typeof name !== "string" || !name.trim()) {
      return response.status(400).json({ message: "O nome da horta é obrigatório." });
    }

    try {
      const garden = await GardenService.create({ user_id: userId, name });
      return response.status(201).json(garden);
    } catch (error) {
      if (error instanceof GardenServiceError) {
        return response.status(error.statusCode).json({ message: error.message });
      }

      return response.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  async setMonitoring(request: Request, response: Response) {
    const userId = request.user?.id;

    if (!userId) {
      return response.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const garden = await GardenService.setMonitoring(
        userId,
        request.body?.enabled,
      );
      return response.status(200).json(garden);
    } catch (error) {
      if (error instanceof GardenServiceError) {
        return response.status(error.statusCode).json({ message: error.message });
      }

      return response.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

export default new GardenController();
