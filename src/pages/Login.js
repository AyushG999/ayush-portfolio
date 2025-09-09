import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';

function Login() {
  const { login } = useContext(AuthContext);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const data = await apiRequest('/api/auth/login', 'POST', {
        email: emailOrUsername.includes('@') ? emailOrUsername : undefined,
        username: !emailOrUsername.includes('@') ? emailOrUsername : undefined,
        password
      });
      login(data.token, data.username);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #4a90e2, #50e3c2)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '3rem',
        borderRadius: '15px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        width: '350px',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Login</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder="Email or Username"
            value={emailOrUsername}
            onChange={e => setEmailOrUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
            required
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#4a90e2',
              color: 'white',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#357ABD'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#4a90e2'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
