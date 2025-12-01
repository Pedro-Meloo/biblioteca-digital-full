const { pool } = require('../config/db.config');

class User {
    //busca email usuario 
    static async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
    
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        }
        return null; 
    }

    // busca id usuari 
    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        }
        return null;
    }


    static async createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255)
            )
        `;
        await pool.query(query);
        console.log('Tabela de usuários verificada/criada.');
    }

  
    static async insertInitialUser(email, password, name) {
        // * da senah 
        const [result] = await pool.query(
            'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
            [email, password, name]
        );
        return result.insertId;
    }
}

module.exports = User;
