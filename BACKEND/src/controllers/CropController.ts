import { Request, Response } from "express";

import CropService from "../services/CropService";

class CropController {

  async create(request: Request, response: Response) {
    try {

      const {
        user_id,
        plant_id,
        device_code,
        nickname,
        alerts
      } = request.body ?? {};

      if (
        user_id === undefined ||
        plant_id === undefined ||
        !device_code ||
        !nickname
      ) {
        return response.status(400).json({
          message:
            "user_id, plant_id, device_code e nickname são obrigatórios"
        });
      }

      const crop = await CropService.create({
        user_id: Number(user_id),
        plant_id: Number(plant_id),
        device_code,
        nickname,
        alerts
      });

      return response.status(201).json(crop);

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


  async list(request: Request, response: Response) {
    try {

      const crops = await CropService.list();

      return response.status(200).json(crops);

    } catch {

      return response.status(500).json({
        message: "Erro interno do servidor"
      });
    }
  }


  async show(request: Request, response: Response) {
    try {

      const id = Number(request.params.id);

      if (Number.isNaN(id)) {
        return response.status(400).json({
          message: "ID inválido"
        });
      }

      const crop = await CropService.findById(id);

      return response.status(200).json(crop);

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


  async listByUser(request: Request, response: Response) {
    try {

      const userId = Number(request.params.userId);

      if (Number.isNaN(userId)) {
        return response.status(400).json({
          message: "ID do usuário inválido"
        });
      }

      const crops = await CropService.findByUser(userId);

      return response.status(200).json(crops);

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


  async update(request: Request, response: Response) {
    try {

      const id = Number(request.params.id);

      if (Number.isNaN(id)) {
        return response.status(400).json({
          message: "ID inválido"
        });
      }

      const crop = await CropService.update(
        id,
        request.body ?? {}
      );

      return response.status(200).json(crop);

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


  async delete(request: Request, response: Response) {
    try {

      const id = Number(request.params.id);

      if (Number.isNaN(id)) {
        return response.status(400).json({
          message: "ID inválido"
        });
      }

      await CropService.delete(id);

      return response.status(204).send();

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

export default new CropController();