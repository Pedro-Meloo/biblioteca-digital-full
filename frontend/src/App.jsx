import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Search from './Search';
import Insert from './Insert';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rotas Protegidas */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="/insert" element={<ProtectedRoute><Insert /></ProtectedRoute>} />

        {/* Rota de fallback para 404 */}
        <Route path="*" element={
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Página Não Encontrada</h1>
            <p>A rota que você tentou acessar não existe.</p>
            <Link to="/home">Voltar para a Home</Link>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
