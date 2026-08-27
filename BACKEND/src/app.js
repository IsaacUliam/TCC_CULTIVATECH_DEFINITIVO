// src/app.js
// Configuração principal do Express

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste para checar se a API está no ar
app.get('/', (req, res) => {
  res.json({ status: 'ok', projeto: 'Cultiva Tech - API rodando 🌱' });
});

// As rotas de leituras (umidade, pH, salinidade) serão registradas
// aqui no próximo passo, ex: app.use('/leituras', leiturasRoutes);

module.exports = app;