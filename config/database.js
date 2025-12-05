const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,
        define: {
            timestamps: false, 
        }
    }
);

// testar e sincronizar o db
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Conectado');
        
        await sequelize.sync(); 
        console.log('Tabelas sincronizadas com sucesso!');
        
    } catch (error) {
        console.error(`Erro de Conexão ou Sincronização: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = { sequelize, connectDB };