import database from "../database/connection";
import {
  CreatePlantDTO,
  UpdatePlantDTO
} from "../models/Plant";

class PlantService {
  async create(data: CreatePlantDTO) {
    const [id] = await database("plant_catalog").insert(data);

    const plant = await database("plant_catalog")
      .where({ id })
      .first();

    return plant;
  }

  async list() {
    return database("plant_catalog")
      .select("*")
      .orderBy("popular_name", "asc");
  }

  async findById(id: number) {
    const plant = await database("plant_catalog")
      .where({ id })
      .first();

    if (!plant) {
      throw new Error("Planta não encontrada");
    }

    return plant;
  }

  async update(id: number, data: UpdatePlantDTO) {
    const plant = await database("plant_catalog")
      .where({ id })
      .first();

    if (!plant) {
      throw new Error("Planta não encontrada");
    }

    await database("plant_catalog")
      .where({ id })
      .update(data);

    return database("plant_catalog")
      .where({ id })
      .first();
  }

  async delete(id: number) {
    const plant = await database("plant_catalog")
      .where({ id })
      .first();

    if (!plant) {
      throw new Error("Planta não encontrada");
    }

    await database("plant_catalog")
      .where({ id })
      .delete();
  }
}

export default new PlantService();