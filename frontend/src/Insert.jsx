import React, { useState } from 'react';
import api from './api';

function Insert() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        if (!title.trim() || !author.trim()) {
            setError('Título e Autor são campos obrigatórios.');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('/books', { title, author, isbn });
            setMessage(response.data.message);
            setTitle('');
            setAuthor('');
            setIsbn('');
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao inserir livro. Verifique se está logado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>Inserir Novo Livro</h2>
            <form onSubmit={handleSubmit}>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <div style={{ marginBottom: '15px' }}>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Autor:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>ISBN (Opcional):</label>
                    <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <button type="submit" disabled={loading} style={{ padding: '10px 15px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    {loading ? 'Inserindo...' : 'Inserir Livro'}
                </button>
            </form>
        </div>
    );
}

export default Insert;
