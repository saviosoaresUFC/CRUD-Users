const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database'); 
const userRoutes = require('./routes/userRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de CRUD de Usuários rodando! Acesse /api/users');
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));