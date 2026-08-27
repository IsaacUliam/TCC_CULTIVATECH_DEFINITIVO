// src/server.js
// Ponto de entrada: sobe o servidor Express

require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🌱 Cultiva Tech API rodando na porta ${PORT}`);
});