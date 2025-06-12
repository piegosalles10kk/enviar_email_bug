const express = require('express');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes.js');

const app = express();
const PORT = 1000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rota principal indicando que o servidor está online
app.get('/', (req, res) => {
    res.send('🚀 Servidor está online e funcionando corretamente!');
});

// Usar as rotas de e-mail
app.use('/api', emailRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
