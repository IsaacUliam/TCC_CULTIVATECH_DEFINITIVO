import database from "../database/connection";
import { CreateSensorReadingDTO } from "../models/SensorReading";

class SensorReadingService {
  // Criar leitura vinda da API / App (usando device_code)
  async create(data: CreateSensorReadingDTO) {
    const { device_code, humidity, ph, salinity } = data;

    const crop = await database("my_crops")
      .where({ device_code })
      .first();

    if (!crop) {
      throw new Error("Dispositivo não vinculado a nenhum cultivo.");
    }

    const [id] = await database("sensor_readings").insert({
      crop_id: crop.id,
      humidity_value: humidity,
      ph_value: ph,
      salinity_value: salinity,
    });

    return database("sensor_readings").where({ id }).first();
  }

  // Buscar histórico de um cultivo do usuário logado
  async listByCrop(cropId: number, userId: number) {
    const crop = await database("my_crops")
      .where({ id: cropId, user_id: userId })
      .first();

    if (!crop) {
      throw new Error("Cultivo não encontrado.");
    }

    return database("sensor_readings")
      .where({ crop_id: cropId })
      .orderBy("created_at", "desc");
  }

  // Buscar a última leitura de um cultivo do usuário logado
  async latestByCrop(cropId: number, userId: number) {
    const crop = await database("my_crops")
      .where({ id: cropId, user_id: userId })
      .first();

    if (!crop) {
      throw new Error("Cultivo não encontrado.");
    }

    const reading = await database("sensor_readings")
      .where({ crop_id: cropId })
      .orderBy("created_at", "desc")
      .first();

    if (!reading) {
      throw new Error("Nenhuma leitura encontrada para este cultivo.");
    }

    return reading;
  }
}

export default new SensorReadingService();