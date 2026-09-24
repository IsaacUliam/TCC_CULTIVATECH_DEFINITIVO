import bcrypt from 'bcryptjs';
import db from '../database/connection'; // Ajuste o caminho da conexão com Knex se necessário
import { generateToken } from '../utils/jwt';

export class AuthService {
  async login(email: string, password: unknown) {
    if (!email || !password || typeof password !== 'string') {
      throw new Error('E-mail e senha são obrigatórios.');
    }

    const user = await db('users').where({ email }).first();

    if (!user) {
      throw new Error('Usuário ou senha inválidos.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new Error('Usuário ou senha inválidos.');
    }

    const token = generateToken({ id: user.id, email: user.email });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}