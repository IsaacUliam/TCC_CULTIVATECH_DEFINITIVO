import "dotenv/config";

import app from "./app";

const PORT = Number(process.env.PORT) || 3333;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Escutando em todas as interfaces (0.0.0.0:${PORT})`);
});