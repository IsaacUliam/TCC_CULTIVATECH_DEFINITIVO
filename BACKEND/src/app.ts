import express from "express";
import authRoutes from './routes/auth.routes';
import routes from "./routes";

const app = express();

// 1. Middlewares globais (parser de JSON deve vir PRIMEIRO)
app.use(express.json());

// 2. Registra as rotas
app.use('/auth', authRoutes);
app.use(routes);

export default app;