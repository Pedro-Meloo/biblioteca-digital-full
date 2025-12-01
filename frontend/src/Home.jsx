import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', textAlign: 'center' }}>
            <h2>Bem-vindo(a), {user?.name || user?.email || 'Usuário'}!</h2>
            <p>Selecione uma opção:</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
                <Link to="/search" style={{ padding: '15px 30px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
                    Buscar Livros
                </Link>
                <Link to="/insert" style={{ padding: '15px 30px', backgroundColor: '#ffc107', color: 'black', textDecoration: 'none', borderRadius: '5px' }}>
                    Inserir Livro
                </Link>
            </div>
            <button onClick={handleLogout} style={{ marginTop: '50px', padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Sair (Logout)
            </button>
        </div>
    );
}

export default Home;
