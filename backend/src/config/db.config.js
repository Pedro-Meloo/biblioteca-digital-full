

const express = require('express');

const initDB = require('./config/initDB'); 
const { testConnection } = require('./config/db.config'); 

const app = express();



async function startServer() {
    try {
        // 1. TETA A CONEXAO E AGUARDA
        await testConnection(); 

        // 2. INICIALIZA O BD
        await initDB(); 
        
        // 3. INICIA O SERVIDOR
        app.listen(PORT, () => {
            console.log(`Servidor backend rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro fatal ao iniciar o servidor:', error.message);
        process.exit(1); 
    }
}

startServer();
