import database from "../database/connection";

import {
  CreateSensorReadingDTO
} from "../models/SensorReading";

class SensorReadingService {
  async create(data: CreateSensorReadingDTO) {
    const {
      device_code,
      humidity,
      ph,
      salinity
    } = data;

    const crop = await database("my_crops")
      .where({ device_code })
      .first();

    if (!crop) {
      throw new Error("Dispositivo não encontrado");
    }

    const [id] = await database("sensor_readings").insert({
      crop_id: crop.id,
      humidity_value: humidity,
      ph_value: ph,
      salinity_value: salinity
    });

    return this.findById(id);
  }

  async findById(id: number) {
    const reading = await database("sensor_readings")
      .where({ id })
      .first();

    if (!reading) {
      throw new Error("Leitura não encontrada");
    }

    return reading;
  }

  async listByCrop(cropId: number) {
    const crop = await database("my_crops")
      .where({ id: cropId })
      .first();

    if (!crop) {
      throw new Error("Cultivo não encontrado");
    }

    const readings = await database("sensor_readings")
      .where({ crop_id: cropId })
      .orderBy("created_at", "desc");

    return readings;
  }

  async latestByCrop(cropId: number) {
    const crop = await database("my_crops")
      .where({ id: cropId })
      .first();

    if (!crop) {
      throw new Error("Cultivo não encontrado");
    }

    const reading = await database("sensor_readings")
      .where({ crop_id: cropId })
      .orderBy("created_at", "desc")
      .orderBy("id", "desc")
      .first();

    if (!reading) {
      throw new Error("Nenhuma leitura encontrada");
    }

    return reading;
  }

  async latestByDevice(deviceCode: string) {
    const crop = await database("my_crops")
      .where({ device_code: deviceCode })
      .first();

    if (!crop) {
      throw new Error("Dispositivo não encontrado");
    }

    const reading = await database("sensor_readings")
      .where({ crop_id: crop.id })
      .orderBy("created_at", "desc")
      .orderBy("id", "desc")
      .first();

    if (!reading) {
      throw new Error("Nenhuma leitura encontrada");
    }

    return reading;
  }
}

export default new SensorReadingService();