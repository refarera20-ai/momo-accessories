import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopContext from '../context/ShopContext';
import { FiLock, FiUser } from 'react-icons/fi';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { adminLogin } = useContext(ShopContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminLogin(username, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Kredensial tidak valid. Silakan coba lagi.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--color-pink)'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-pink-dark)', marginBottom: '10px' }}>Admin Panel</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Momo Accessories</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 'bold' }}>
              <FiUser /> Username
            </label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="Masukkan username"
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '1rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 'bold' }}>
              <FiLock /> Password
            </label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Masukkan password"
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '1rem' }}
            />
          </div>

          <button type="submit" style={{
            width: '100%',
            padding: '14px',
            backgroundColor: 'var(--color-pink-dark)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            marginTop: '10px',
            transition: 'transform 0.2s',
            boxShadow: '0 4px 10px rgba(255,133,179,0.3)'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Masuk ke Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
