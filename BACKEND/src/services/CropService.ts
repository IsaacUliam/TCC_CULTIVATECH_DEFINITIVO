import database from "../database/connection";
import { CreateCropDTO, UpdateCropDTO } from "../models/Crop";

class CropService {
  async create(data: CreateCropDTO) {
    const { user_id, plant_id, device_code, nickname, alerts } = data;

    const user = await database("users").where({ id: user_id }).first();
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const plant = await database("plant_catalog").where({ id: plant_id }).first();
    if (!plant) {
      throw new Error("Planta não encontrada");
    }

    const existingDevice = await database("my_crops").where({ device_code }).first();
    if (existingDevice) {
      throw new Error("Este dispositivo já está cadastrado");
    }

    const [id] = await database("my_crops").insert({
      user_id,
      plant_id,
      device_code,
      nickname,
      alerts: alerts ? JSON.stringify(alerts) : null,
    });

    return this.findById(id, user_id);
  }

  async list(userId: number) {
    const crops = await database("my_crops")
      .join("users", "my_crops.user_id", "=", "users.id")
      .join("plant_catalog", "my_crops.plant_id", "=", "plant_catalog.id")
      .select(
        "my_crops.*",
        "users.name as user_name",
        "plant_catalog.popular_name as plant_name"
      )
      .where("my_crops.user_id", userId)
      .orderBy("my_crops.created_at", "desc");

    return crops.map(this.formatCrop);
  }

  async findById(id: number, userId: number) {
    const crop = await database("my_crops")
      .join("users", "my_crops.user_id", "=", "users.id")
      .join("plant_catalog", "my_crops.plant_id", "=", "plant_catalog.id")
      .select(
        "my_crops.*",
        "users.name as user_name",
        "plant_catalog.popular_name as plant_name"
      )
      .where("my_crops.id", id)
      .where("my_crops.user_id", userId)
      .first();

    if (!crop) {
      throw new Error("Cultivo não encontrado");
    }

    return this.formatCrop(crop);
  }

  async findByUser(userId: number) {
    const user = await database("users").where({ id: userId }).first();
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const crops = await database("my_crops")
      .join("plant_catalog", "my_crops.plant_id", "=", "plant_catalog.id")
      .select(
        "my_crops.*",
        "plant_catalog.popular_name as plant_name"
      )
      .where("my_crops.user_id", userId)
      .orderBy("my_crops.created_at", "desc");

    return crops.map(this.formatCrop);
  }
  
  async registerWatering(cropId: number, userId: number) {
  const crop = await database("my_crops")
    .where({ id: cropId, user_id: userId })
    .first();

  if (!crop) {
    throw new Error("Cultivo não encontrado.");
  }

  const now = new Date().toISOString();

  await database("my_crops")
    .where({ id: cropId, user_id: userId })
    .update({ last_watered_at: now });

  return this.findById(cropId, userId);
}

  async update(id: number, userId: number, data: UpdateCropDTO) {
    const crop = await database("my_crops")
      .where({ id, user_id: userId })
      .first();

    if (!crop) {
      throw new Error("Cultivo não encontrado");
    }

    if (data.plant_id !== undefined) {
      const plant = await database("plant_catalog")
        .where({ id: data.plant_id })
        .first();

      if (!plant) {
        throw new Error("Planta não encontrada");
      }
    }

    const updateData: Record<string, unknown> = {};

    if (data.plant_id !== undefined) {
      updateData.plant_id = data.plant_id;
    }

    if (data.nickname !== undefined) {
      updateData.nickname = data.nickname;
    }

    if (data.alerts !== undefined) {
      updateData.alerts = JSON.stringify(data.alerts);
    }

    if (data.last_watered_at !== undefined) {
      updateData.last_watered_at = data.last_watered_at;
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error("Nenhum campo informado para atualização");
    }

    await database("my_crops")
      .where({ id, user_id: userId })
      .update(updateData);

    return this.findById(id, userId);
  }

  async delete(id: number, userId: number) {
    const crop = await database("my_crops")
      .where({ id, user_id: userId })
      .first();

    if (!crop) {
      throw new Error("Cultivo não encontrado");
    }

    await database("my_crops")
      .where({ id, user_id: userId })
      .delete();
  }

  private formatCrop(crop: any) {
    return {
      ...crop,
      alerts: crop.alerts ? JSON.parse(crop.alerts) : null,
    };
  }
}

export default new CropService();