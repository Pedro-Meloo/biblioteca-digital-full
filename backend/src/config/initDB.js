const User = require('../models/User'); 
const Book = require('../models/Book'); 
const bcrypt = require('bcryptjs');

async function initDB() {
    try {
        await User.createTable();
        await Book.createTable();

        const initialEmail = 'user@test.com';
        const existingUser = await User.findByEmail(initialEmail);

        if (!existingUser) {
            
            const hashedPassword = await bcrypt.hash('password123', 10); 
            await User.insertInitialUser(initialEmail, hashedPassword, 'Usuário Teste');
            console.log('Usuário inicial inserido com sucesso.');
        } else {
            console.log('Usuário inicial já existe.');
        }

    } catch (error) {
      
        console.error('ERRO FATAL NA INICIALIZAÇÃO DO DB:', error.message);
    }
}

module.exports = initDB;
