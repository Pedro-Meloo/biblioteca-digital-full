import React, { useState } from 'react';
import api from './api';

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setResults([]);

        if (!query.trim()) {
            setError('Por favor, insira um termo de busca.');
            setLoading(false);
            return;
        }

        try {
            const response = await api.get('/books', { params: { query } });
            setResults(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao realizar a busca. Verifique se está logado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>Busca de Livros</h2>
            <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar por título ou autor..."
                    style={{ width: '70%', padding: '10px', marginRight: '10px' }}
                />
                <button type="submit" disabled={loading} style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {results.length > 0 && (
                <div>
                    <h3>Resultados ({results.length})</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {results.map((book, index) => (
                            <li key={index} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '10px' }}>
                                <strong>Título:</strong> {book.title} <br />
                                <strong>Autor:</strong> {book.author} <br />
                                <strong>ISBN:</strong> {book.isbn || 'N/A'}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {results.length === 0 && !loading && !error && query && <p>Nenhum resultado encontrado.</p>}
        </div>
    );
}

export default Search;
