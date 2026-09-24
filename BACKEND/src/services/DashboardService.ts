import database from "../database/connection";
import HortaAnalysisService from "./HortaAnalysisService";

class DashboardService {
  async getCropDashboard(cropId: number, userId: number) {
    // 1. Busca o cultivo pertencente ao usuário logado
    const crop = await database("my_crops")
      .join("plant_catalog", "my_crops.plant_id", "=", "plant_catalog.id")
      .select(
        "my_crops.id as crop_id",
        "my_crops.nickname",
        "my_crops.device_code",
        "my_crops.alerts",
        "my_crops.last_watered_at",
        "plant_catalog.popular_name as plant_name",
        "plant_catalog.ideal_humidity",
        "plant_catalog.ideal_ph_min",
        "plant_catalog.ideal_ph_max",
        "plant_catalog.ideal_salinity_min",
        "plant_catalog.ideal_salinity_max",
        "plant_catalog.care_tips"
      )
      .where("my_crops.id", cropId)
      .where("my_crops.user_id", userId)
      .first();

    if (!crop) {
      throw new Error("Cultivo não encontrado.");
    }

    // 2. Busca a última leitura do sensor para este cultivo
    const latestReading = await database("sensor_readings")
      .where({ crop_id: cropId })
      .orderBy("created_at", "desc")
      .first();

    // 3. Obtém a análise de saúde da horta através do serviço existente
    let analysis = null;
    try {
      analysis = await HortaAnalysisService.analyze(cropId);
    } catch {
      analysis = { message: "Sem leituras suficientes para gerar análise." };
    }

    return {
      crop: {
        id: crop.crop_id,
        nickname: crop.nickname,
        device_code: crop.device_code,
        last_watered_at: crop.last_watered_at,
        alerts: crop.alerts ? JSON.parse(crop.alerts) : null,
      },
      plant: {
        name: crop.plant_name,
        care_tips: crop.care_tips,
        ideals: {
          humidity: crop.ideal_humidity,
          ph: [crop.ideal_ph_min, crop.ideal_ph_max],
          salinity: [crop.ideal_salinity_min, crop.ideal_salinity_max],
        },
      },
      latest_reading: latestReading || null,
      health_analysis: analysis,
    };
  }
}

export default new DashboardService();