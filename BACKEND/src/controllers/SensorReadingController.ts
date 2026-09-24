import { Request, Response } from "express";
import SensorReadingService from "../services/SensorReadingService";

class SensorReadingController {
  async create(request: Request, response: Response) {
    try {
      const { device_code, humidity, ph, salinity } = request.body ?? {};

      if (!device_code || humidity === undefined || ph === undefined || salinity === undefined) {
        return response.status(400).json({
          message: "device_code, humidity, ph e salinity são obrigatórios.",
        });
      }

      const reading = await SensorReadingService.create({
        device_code,
        humidity: Number(humidity),
        ph: Number(ph),
        salinity: Number(salinity),
      });

      return response.status(201).json(reading);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  async listByCrop(request: Request, response: Response) {
    try {
      const userId = request.user?.id;
      const cropId = Number(request.params.cropId);

      if (!userId) {
        return response.status(401).json({ message: "Usuário não autenticado." });
      }

      if (Number.isNaN(cropId)) {
        return response.status(400).json({ message: "ID do cultivo inválido." });
      }

      const readings = await SensorReadingService.listByCrop(cropId, userId);

      return response.status(200).json(readings);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message });
      }

      return response.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  async latestByCrop(request: Request, response: Response) {
    try {
      const userId = request.user?.id;
      const cropId = Number(request.params.cropId);

      if (!userId) {
        return response.status(401).json({ message: "Usuário não autenticado." });
      }

      if (Number.isNaN(cropId)) {
        return response.status(400).json({ message: "ID do cultivo inválido." });
      }

      const reading = await SensorReadingService.latestByCrop(cropId, userId);

      return response.status(200).json(reading);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message });
      }

      return response.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

export default new SensorReadingController();