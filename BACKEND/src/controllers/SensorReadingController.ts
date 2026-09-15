import { Request, Response } from "express";

import SensorReadingService from "../services/SensorReadingService";

class SensorReadingController {
  async create(request: Request, response: Response) {
    try {
      const {
        device_code,
        humidity,
        ph,
        salinity
      } = request.body ?? {};

      if (
        !device_code ||
        humidity === undefined ||
        ph === undefined ||
        salinity === undefined
      ) {
        return response.status(400).json({
          message:
            "device_code, humidity, ph e salinity são obrigatórios"
        });
      }

      const humidityValue = Number(humidity);
      const phValue = Number(ph);
      const salinityValue = Number(salinity);

      if (
        Number.isNaN(humidityValue) ||
        Number.isNaN(phValue) ||
        Number.isNaN(salinityValue)
      ) {
        return response.status(400).json({
          message: "Os valores dos sensores devem ser números"
        });
      }

      if (humidityValue < 0 || humidityValue > 100) {
        return response.status(400).json({
          message: "A umidade deve estar entre 0 e 100"
        });
      }

      if (phValue < 0 || phValue > 14) {
        return response.status(400).json({
          message: "O pH deve estar entre 0 e 14"
        });
      }

      if (salinityValue < 0) {
        return response.status(400).json({
          message: "A salinidade não pode ser negativa"
        });
      }

      const reading = await SensorReadingService.create({
        device_code,
        humidity: humidityValue,
        ph: phValue,
        salinity: salinityValue
      });

      return response.status(201).json(reading);

    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({
          message: error.message
        });
      }

      return response.status(500).json({
        message: "Erro interno do servidor"
      });
    }
  }

  async listByCrop(request: Request, response: Response) {
    try {
      const cropId = Number(request.params.cropId);

      if (Number.isNaN(cropId)) {
        return response.status(400).json({
          message: "ID do cultivo inválido"
        });
      }

      const readings =
        await SensorReadingService.listByCrop(cropId);

      return response.status(200).json(readings);

    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({
          message: error.message
        });
      }

      return response.status(500).json({
        message: "Erro interno do servidor"
      });
    }
  }

  async latestByCrop(request: Request, response: Response) {
    try {
      const cropId = Number(request.params.cropId);

      if (Number.isNaN(cropId)) {
        return response.status(400).json({
          message: "ID do cultivo inválido"
        });
      }

      const reading =
        await SensorReadingService.latestByCrop(cropId);

      return response.status(200).json(reading);

    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({
          message: error.message
        });
      }

      return response.status(500).json({
        message: "Erro interno do servidor"
      });
    }
  }

  async latestByDevice(request: Request, response: Response) {
    try {
      const deviceCode = request.params.deviceCode;

      if (typeof deviceCode !== "string" || !deviceCode) {
        return response.status(400).json({
          message: "Código do dispositivo inválido"
        });
      }

      const reading =
        await SensorReadingService.latestByDevice(deviceCode);

      return response.status(200).json(reading);

    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({
          message: error.message
        });
      }

      return response.status(500).json({
        message: "Erro interno do servidor"
      });
    }
  }
}

export default new SensorReadingController();