import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Selamat datang kembali!`);
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: 'var(--color-pink)' }}>
      <div style={{ backgroundColor: 'var(--color-white)', padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', margin: '40px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img src="https://placehold.co/100x100/FFD6E8/333333?text=Logo" alt="Logo" style={{ borderRadius: '50%', marginBottom: '15px' }} />
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-pink-dark)' }}>Selamat Datang Kembali!</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Yuk, masuk untuk melanjutkan belanja</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Email</label>
            <input 
              type="email" 
              placeholder="Masukkan email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid var(--color-gray)', backgroundColor: 'var(--color-gray-light)' }}
              required 
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Password</label>
            <input 
              type="password" 
              placeholder="Masukkan password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid var(--color-gray)', backgroundColor: 'var(--color-gray-light)' }} 
              required
            />
            <div style={{ textAlign: 'right', marginTop: '8px' }}>
              <a href="#" style={{ fontSize: '0.8rem', color: 'var(--color-lavender-dark)' }}>Lupa password?</a>
            </div>
          </div>
          
          <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: 'var(--color-pink-dark)', color: 'var(--color-white)', fontWeight: 'bold', borderRadius: '30px', margin: '20px 0', fontSize: '1rem', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-lavender-dark)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-pink-dark)'}>
            Masuk
          </button>
        </form>
        
        <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
          Belum punya akun? <Link to="/register" style={{ color: 'var(--color-lavender-dark)', fontWeight: 'bold' }}>Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}
