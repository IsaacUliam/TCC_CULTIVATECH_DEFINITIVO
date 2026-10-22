import database from "../database/connection";
import { CreateGardenDTO, GardenServiceError } from "../models/Garden";

class GardenService {
  async findByUser(userId: number) {
    const garden = await database("gardens").where({ user_id: userId }).first();
    return garden ? this.formatGarden(garden) : null;
  }

  async create(data: CreateGardenDTO) {
    const name = data.name.trim();

    if (name.length < 2) {
      throw new GardenServiceError("O nome da horta deve ter pelo menos 2 caracteres.");
    }

    if (name.length > 60) {
      throw new GardenServiceError("O nome da horta pode ter no máximo 60 caracteres.");
    }

    const user = await database("users").where({ id: data.user_id }).first();
    if (!user) {
      throw new GardenServiceError("Usuário não encontrado.", 404);
    }

    const existingGarden = await database("gardens")
      .where({ user_id: data.user_id })
      .first();

    if (existingGarden) {
      throw new GardenServiceError(
        "Esta conta já possui uma horta cadastrada.",
        409,
      );
    }

    const [id] = await database("gardens").insert({
      user_id: data.user_id,
      name,
      monitoring_enabled: false,
    });

    return this.findById(Number(id), data.user_id);
  }

  async setMonitoring(userId: number, enabled: unknown) {
    if (typeof enabled !== "boolean") {
      throw new GardenServiceError("O campo enabled deve ser true ou false.");
    }

    const garden = await database("gardens").where({ user_id: userId }).first();
    if (!garden) {
      throw new GardenServiceError("Nenhuma horta cadastrada para esta conta.", 404);
    }

    await database("gardens")
      .where({ user_id: userId })
      .update({ monitoring_enabled: enabled });

    return this.findByUser(userId);
  }

  private async findById(id: number, userId: number) {
    const garden = await database("gardens")
      .where({ id, user_id: userId })
      .first();

    if (!garden) {
      throw new GardenServiceError("Horta não encontrada.", 404);
    }

    return this.formatGarden(garden);
  }

  private formatGarden(garden: any) {
    return {
      ...garden,
      monitoring_enabled: Boolean(garden.monitoring_enabled),
    };
  }
}

export default new GardenService();
