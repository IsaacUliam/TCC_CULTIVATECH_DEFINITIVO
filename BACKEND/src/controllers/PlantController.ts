import { Request, Response } from "express";

import PlantService from "../services/PlantService";

class PlantController {
  async create(request: Request, response: Response) {
    try {
      const {
        popular_name,
        ideal_humidity,
        ideal_ph_min,
        ideal_ph_max,
        ideal_salinity_min,
        ideal_salinity_max,
        care_tips
      } = request.body ?? {};

      if (
        !popular_name ||
        ideal_humidity === undefined ||
        ideal_ph_min === undefined ||
        ideal_ph_max === undefined ||
        ideal_salinity_min === undefined ||
        ideal_salinity_max === undefined
      ) {
        return response.status(400).json({
          message: "Preencha todos os campos obrigatórios"
        });
      }

      if (ideal_ph_min > ideal_ph_max) {
        return response.status(400).json({
          message: "O pH mínimo não pode ser maior que o pH máximo"
        });
      }

      if (ideal_salinity_min > ideal_salinity_max) {
        return response.status(400).json({
          message:
            "A salinidade mínima não pode ser maior que a salinidade máxima"
        });
      }

      const plant = await PlantService.create({
        popular_name,
        ideal_humidity,
        ideal_ph_min,
        ideal_ph_max,
        ideal_salinity_min,
        ideal_salinity_max,
        care_tips
      });

      return response.status(201).json(plant);
    } catch (error) {
      return response.status(500).json({
        message: "Erro interno do servidor"
      });
    }
  }

  async list(request: Request, response: Response) {
    try {
      const plants = await PlantService.list();

      return response.status(200).json(plants);
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

      const plant = await PlantService.findById(id);

      return response.status(200).json(plant);
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

      const plant = await PlantService.update(id, request.body ?? {});

      return response.status(200).json(plant);
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

  async delete(request: Request, response: Response) {
    try {
      const id = Number(request.params.id);

      if (Number.isNaN(id)) {
        return response.status(400).json({
          message: "ID inválido"
        });
      }

      await PlantService.delete(id);

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

export default new PlantController();