import { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import ShopContext from '../context/ShopContext';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(ShopContext);

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px', minHeight: '80vh' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Wishlist Saya 💖</h2>
      
      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'var(--color-white)', borderRadius: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px', opacity: 0.9 }}>🥺💔</div>
          <p style={{ fontSize: '1.4rem', color: 'var(--color-text-dark)', marginBottom: '10px', fontWeight: 'bold' }}>Yah, Wishlist kamu masih kosong nih...</p>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '30px', maxWidth: '400px', margin: '0 auto 30px' }}>Belum ada aksesoris lucu yang bikin hatimu berdebar? Yuk, mulai eksplorasi koleksi terbaik kami sekarang!</p>
          <Link to="/catalog" style={{ display: 'inline-block', padding: '12px 30px', backgroundColor: 'var(--color-pink-dark)', color: '#fff', borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 4px 10px rgba(255, 133, 179, 0.4)' }}>Eksplor Sekarang ✨</Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          {wishlist.map((item) => (
            <div key={item.id} style={{ position: 'relative' }}>
              <ProductCard product={item.product} />
              <button 
                onClick={(e) => { e.preventDefault(); toggleWishlist(item.productId); }}
                style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  backgroundColor: 'white', 
                  width: '35px', 
                  height: '35px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  fontSize: '18px',
                  border: 'none',
                  cursor: 'pointer',
                  zIndex: 20
                }}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

