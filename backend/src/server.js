const express = require('express');
const cors = require('cors');
const initDB = require('./config/initDB'); 
const routes = require('./routes'); 
const { testConnection } = require('./config/db.config'); 

const app = express();
const PORT = process.env.BACKEND_PORT || 3001; 

app.use(cors());
app.use(express.json());

app.use('/api', routes);

async function startServer() {
    try {
       
        await testConnection(); 

      
        await initDB(); 
        
       
        app.listen(PORT, () => {
            console.log(`Servidor backend rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro fatal ao iniciar o servidor:', error.message);
        process.exit(1); 
    }
}

startServer();
