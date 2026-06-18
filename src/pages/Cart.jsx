import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import ShopContext from '../context/ShopContext';

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart } = useContext(ShopContext);

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const formatting = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Keranjang Belanja 🛒</h2>
      
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>Keranjangmu masih kosong.</p>
          <Link to="/catalog" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 24px', backgroundColor: 'var(--color-pink-dark)', color: '#fff', borderRadius: '25px', fontWeight: 'bold', textDecoration: 'none' }}>Mulai Belanja</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          
          <div style={{ flex: '1 1 600px', backgroundColor: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            {cart.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '20px', padding: '20px 0', borderBottom: '1px solid var(--color-gray)', alignItems: 'center' }}>
                <img src={item.product.image || 'https://placehold.co/400x400/FFD6E8/333333?text=Produk'} alt={item.product.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px' }} onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/FFD6E8/333333?text=Produk"; }} />
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{item.product.name}</h3>
                  <p style={{ fontWeight: 'bold', color: 'var(--color-pink-dark)' }}>{formatting.format(item.product.price)}</p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-gray-light)', borderRadius: '20px', padding: '5px' }}>
                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} style={{ padding: '5px 10px', fontSize: '1.2rem', border: 'none', background: 'transparent', cursor: 'pointer' }}><FiMinus /></button>
                    <span style={{ padding: '0 10px', fontWeight: 'bold' }}>{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} style={{ padding: '5px 10px', fontSize: '1.2rem', border: 'none', background: 'transparent', cursor: 'pointer' }}><FiPlus /></button>
                  </div>
                  
                  <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--color-danger)', fontSize: '1.5rem', padding: '10px', border: 'none', background: 'transparent', cursor: 'pointer' }} title="Hapus">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: '1 1 300px', backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', position: 'sticky', top: '20px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '1px solid var(--color-gray)', paddingBottom: '15px' }}>Ringkasan Pesanan</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
              <span style={{ fontWeight: '600' }}>{formatting.format(subtotal)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Ongkos Kirim</span>
              <span style={{ fontWeight: '600' }}>Hitung saat checkout</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', paddingTop: '15px', borderTop: '1px dotted var(--color-gray)' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-pink-dark)' }}>{formatting.format(subtotal)}</span>
            </div>
            
            <Link to="/checkout" style={{
              display: 'block',
              textAlign: 'center',
              backgroundColor: 'var(--color-pink-dark)',
              color: 'var(--color-white)',
              padding: '16px',
              borderRadius: '30px',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 4px 10px rgba(255, 133, 179, 0.4)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Lanjut ke Pembayaran
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

