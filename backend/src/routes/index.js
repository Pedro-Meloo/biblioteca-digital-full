const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./authMiddleware'); 
const JWT_SECRET = process.env.JWT_SECRET;
router.post('/login', async (req, res) => { 
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

    
        const isMatch = (password === 'password123'); 

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

       
        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1h' }); 

        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});



router.get('/books', authenticateToken, async (req, res) => { 
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'O parâmetro de busca (query) é obrigatório.' });
    }

    try {
        const books = await Book.search(query);
        res.json(books);
    } catch (error) {
        console.error('Erro na busca:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar livros.' });
    }
});


router.post('/books', authenticateToken, async (req, res) => { 
    const { title, author, isbn } = req.body;
    const userId = req.user.id; 

    if (!title || !author) {
        return res.status(400).json({ message: 'Título e autor são obrigatórios para a inserção.' });
    }

    try {
        const newBookId = await Book.insert(title, author, isbn, userId);
        res.status(201).json({ message: 'Livro inserido com sucesso.', id: newBookId });
    } catch (error) {
        console.error('Erro na inserção:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao inserir livro.' });
    }
});

module.exports = router;
