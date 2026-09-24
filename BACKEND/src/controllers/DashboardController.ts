import { Request, Response } from "express";
import DashboardService from "../services/DashboardService";

class DashboardController {
  async show(request: Request, response: Response) {
    try {
      const userId = request.user?.id;
      const cropId = Number(request.params.cropId);

      if (!userId) {
        return response.status(401).json({ message: "Usuário não autenticado." });
      }

      if (Number.isNaN(cropId)) {
        return response.status(400).json({ message: "ID do cultivo inválido." });
      }

      const dashboardData = await DashboardService.getCropDashboard(cropId, userId);

      return response.status(200).json(dashboardData);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message });
      }

      return response.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

export default new DashboardController();