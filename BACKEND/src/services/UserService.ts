import bcrypt from "bcryptjs";

import database from "../database/connection";
import { CreateUserDTO } from "../models/User";

class UserService {
  async create(data: CreateUserDTO) {
    const { name, email, password } = data;

    const existingUser = await database("users")
      .where({ email })
      .first();

    if (existingUser) {
      throw new Error("E-mail já cadastrado");
    }

    const password_hash = await bcrypt.hash(password, 10);

    const [id] = await database("users").insert({
      name,
      email,
      password_hash
    });

    const user = await database("users")
      .where({ id })
      .first();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at
    };
  }

  async list() {
    const users = await database("users")
      .select(
        "id",
        "name",
        "email",
        "created_at"
      );

    return users;
  }

  async findById(id: number) {
    const user = await database("users")
      .select(
        "id",
        "name",
        "email",
        "created_at"
      )
      .where({ id })
      .first();

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }
}

export default new UserService();