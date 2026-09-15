import { Request, Response } from "express";

import UserService from "../services/UserService";

class UserController {
  async create(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      if (!name || !email || !password) {
        return response.status(400).json({
          message: "Nome, e-mail e senha são obrigatórios"
        });
      }

      const user = await UserService.create({
        name,
        email,
        password
      });

      return response.status(201).json(user);
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
      const users = await UserService.list();

      return response.status(200).json(users);
    } catch {
      return response.status(500).json({
        message: "Erro interno do servidor"
      });
    }
  }

  async show(request: Request, response: Response) {
    try {
      const id = Number(request.params.id);

      const user = await UserService.findById(id);

      return response.status(200).json(user);
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

export default new UserController();