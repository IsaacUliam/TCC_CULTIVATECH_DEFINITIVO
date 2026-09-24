import { Request, Response } from "express";
import CropService from "../services/CropService";

class CropController {
  async create(request: Request, response: Response) {
    try {
      const userId = request.user?.id;

      if (!userId) {
        return response.status(401).json({ message: "Usuário não autenticado." });
      }

      const { plant_id, device_code, nickname, alerts } = request.body ?? {};

      if (plant_id === undefined || !device_code || !nickname) {
        return response.status(400).json({
          message: "plant_id, device_code e nickname são obrigatórios",
        });
      }

      const crop = await CropService.create({
        user_id: userId,
        plant_id: Number(plant_id),
        device_code,
        nickname,
        alerts,
      });

      return response.status(201).json(crop);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async water(request: Request, response: Response) {
  try {
    const userId = request.user?.id;
    const cropId = Number(request.params.id);

    if (!userId) {
      return response.status(401).json({ message: "Usuário não autenticado." });
    }

    if (Number.isNaN(cropId)) {
      return response.status(400).json({ message: "ID do cultivo inválido." });
    }

    const updatedCrop = await CropService.registerWatering(cropId, userId);

    return response.status(200).json({
      message: "Irrigação registrada com sucesso!",
      crop: updatedCrop
    });
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({ message: error.message });
    }

    return response.status(500).json({ message: "Erro interno do servidor." });
  }
}

  async list(request: Request, response: Response) {
    try {
      const userId = request.user?.id;

      if (!userId) {
        return response.status(401).json({ message: "Usuário não autenticado." });
      }

      const crops = await CropService.list(userId);

      return response.status(200).json(crops);
    } catch {
      return response.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async show(request: Request, response: Response) {
    try {
      const userId = request.user?.id;
      const id = Number(request.params.id);

      if (!userId) {
        return response.status(401).json({ message: "Usuário não autenticado." });
      }

      if (Number.isNaN(id)) {
        return response.status(400).json({ message: "ID inválido" });
      }

      const crop = await CropService.findById(id, userId);

      return response.status(200).json(crop);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message });
      }

      return response.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async listByUser(request: Request, response: Response) {
    try {
      const userId = Number(request.params.userId);

      if (Number.isNaN(userId)) {
        return response.status(400).json({ message: "ID do usuário inválido" });
      }

      const crops = await CropService.findByUser(userId);

      return response.status(200).json(crops);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message });
      }

      return response.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const userId = request.user?.id;
      const id = Number(request.params.id);

      if (!userId) {
        return response.status(401).json({ message: "Usuário não autenticado." });
      }

      if (Number.isNaN(id)) {
        return response.status(400).json({ message: "ID inválido" });
      }

      const crop = await CropService.update(id, userId, request.body ?? {});

      return response.status(200).json(crop);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const userId = request.user?.id;
      const id = Number(request.params.id);

      if (!userId) {
        return response.status(401).json({ message: "Usuário não autenticado." });
      }

      if (Number.isNaN(id)) {
        return response.status(400).json({ message: "ID inválido" });
      }

      await CropService.delete(id, userId);

      return response.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message });
      }

      return response.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default new CropController();