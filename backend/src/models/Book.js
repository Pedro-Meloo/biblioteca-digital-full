const { pool } = require('../config/db.config');

class Book {
    // BUSCA DE LIVROS 
    static async search(query) {
        const [rows] = await pool.query(
            'SELECT * FROM books WHERE title LIKE ? OR author LIKE ?',
            [`%${query}%`, `%${query}%`]
        );
        return rows;
    }

    // insere livro0s
    static async insert(title, author, isbn, userId) {
        const [result] = await pool.query(
            'INSERT INTO books (title, author, isbn, user_id) VALUES (?, ?, ?, ?)',
            [title, author, isbn, userId]
        );
        return result.insertId;
    }

    // cria tabaela de livros 
    static async createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS books (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                isbn VARCHAR(20),
                user_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `;
        await pool.query(query);
        console.log('Tabela de livros verificada/criada.');
    }
}

module.exports = Book;
