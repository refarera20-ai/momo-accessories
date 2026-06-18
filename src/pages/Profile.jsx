import { useState, useContext } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiLogOut, FiShoppingBag, FiHeart } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import ShopContext from '../context/ShopContext';

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(ShopContext);

  const [user, setUser] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setCurrentUser(user);
    alert('Profil berhasil diperbarui!');
  };

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      navigate('/login');
    }
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px', maxWidth: '800px', minHeight: '80vh' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '30px', textAlign: 'center' }}>Profil Saya 👤</h2>
      
      <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid var(--color-gray)' }}>
          <img src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=FF85B3&color=fff&size=100`} alt="Avatar" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{user.name}</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>Member Momo Accessories</p>
          </div>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', fontWeight: 'bold' }}><FiUser /> Nama Lengkap</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '1rem' }} />
          </div>
          
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', fontWeight: 'bold' }}><FiMail /> Email</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} readOnly
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '1rem', backgroundColor: 'var(--color-gray-light)', color: 'var(--color-text-muted)' }} />
          </div>
          
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', fontWeight: 'bold' }}><FiPhone /> Nomor Telepon</label>
            <input type="tel" name="phone" value={user.phone} onChange={handleChange} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '1rem' }} />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', fontWeight: 'bold' }}><FiMapPin /> Alamat Default</label>
            <textarea name="address" value={user.address} onChange={handleChange} rows="3"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '1rem' }}></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <button type="button" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', backgroundColor: 'transparent', color: 'var(--color-danger)', border: '1px solid var(--color-danger)', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>
              <FiLogOut /> Keluar
            </button>
            <button type="submit" style={{ padding: '12px 30px', backgroundColor: 'var(--color-pink-dark)', color: '#fff', borderRadius: '30px', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 10px rgba(255, 133, 179, 0.4)' }}>
              Simpan Perubahan
            </button>
          </div>
        </form>

        <div style={{ marginTop: '40px', borderTop: '1px dashed var(--color-gray)', paddingTop: '30px' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Menu Cepat</h4>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/orders" style={{ flex: 1, textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '20px', backgroundColor: 'var(--color-gray-light)', borderRadius: '12px', color: 'var(--color-text-dark)', transition: 'background-color 0.2s', fontWeight: 'bold' }} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-pink)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gray-light)'}
            >
              <FiShoppingBag size={24} color="var(--color-pink-dark)" />
              Riwayat Pesanan
            </Link>
            <Link to="/wishlist" style={{ flex: 1, textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '20px', backgroundColor: 'var(--color-gray-light)', borderRadius: '12px', color: 'var(--color-text-dark)', transition: 'background-color 0.2s', fontWeight: 'bold' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-pink)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gray-light)'}
            >
              <FiHeart size={24} color="var(--color-pink-dark)" />
              Wishlist Saya
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

