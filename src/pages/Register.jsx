import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (name && email && password) {
      alert(`Akun berhasil dibuat! Silakan masuk.`);
      navigate('/login');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: 'var(--color-pink)' }}>
      <div style={{ backgroundColor: 'var(--color-white)', padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', margin: '40px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img src="https://placehold.co/100x100/FFD6E8/333333?text=Logo" alt="Logo" style={{ borderRadius: '50%', marginBottom: '15px' }} />
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-pink-dark)' }}>Daftar Akun Baru</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Gabung dengan Momo dan belanja lebih gampang!</p>
        </div>
        
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Nama Lengkap</label>
            <input 
              type="text" 
              placeholder="Masukkan nama" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid var(--color-gray)', backgroundColor: 'var(--color-gray-light)' }}
              required 
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
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
          </div>
          
          <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: 'var(--color-pink-dark)', color: 'var(--color-white)', fontWeight: 'bold', borderRadius: '30px', margin: '20px 0', fontSize: '1rem', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-lavender-dark)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-pink-dark)'}>
            Daftar Sekarang
          </button>
        </form>
        
        <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
          Sudah punya akun? <Link to="/login" style={{ color: 'var(--color-lavender-dark)', fontWeight: 'bold' }}>Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}
