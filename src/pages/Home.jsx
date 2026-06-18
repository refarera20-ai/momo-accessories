import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { FiArrowRight } from 'react-icons/fi';
import ShopContext from '../context/ShopContext';

export default function Home() {
  const { products, categories, storeSettings } = useContext(ShopContext);

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        backgroundColor: 'var(--color-pink)',
        backgroundImage: storeSettings.heroImage && !storeSettings.heroImage.includes('placehold.co') ? `url(${storeSettings.heroImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '60px 0' 
      }}>
        <div className="container" style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px',
          ...(storeSettings.heroImage && !storeSettings.heroImage.includes('placehold.co') ? { backgroundColor: 'rgba(255, 255, 255, 0.85)', padding: '30px', borderRadius: '20px', backdropFilter: 'blur(5px)' } : {})
        }}>
          <div style={{ flex: '1 1 400px' }}>
            <h1 style={{ fontSize: '3rem', color: 'var(--color-text-dark)', marginBottom: '15px' }}>
              {storeSettings.storeName}
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: 'var(--color-text-dark)' }}>
              {storeSettings.tagline}
            </p>
            <Link to="/catalog" style={{
              display: 'inline-block',
              backgroundColor: 'var(--color-pink-dark)',
              color: 'var(--color-white)',
              padding: '12px 24px',
              borderRadius: '30px',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 4px 10px rgba(255, 133, 179, 0.4)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Belanja Sekarang
            </Link>
          </div>
          <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
            <img 
              src={storeSettings.mascotImage} 
              alt="Mascot" 
              style={{ width: '100%', maxWidth: '300px', borderRadius: '20px', objectFit: 'cover' }} 
            />
          </div>
        </div>
      </section>

      {/* Promo Section (Conditional) */}
      {storeSettings.promoActive && (
        <div style={{ backgroundColor: 'var(--color-pink-dark)', color: '#fff', textAlign: 'center', padding: '10px', fontWeight: 'bold' }}>
          ✨ {storeSettings.promoText} ✨
        </div>
      )}

      {/* Categories */}
      <section className="container" style={{ padding: '60px 1rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>Kategori Pilihan</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '20px',
          textAlign: 'center'
        }}>
          {categories.map((cat) => (
            <Link to={`/catalog?category=${cat.name}`} key={cat.id} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              backgroundColor: 'var(--color-white)',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{cat.icon}</div>
              <span style={{ fontWeight: '500', fontSize: '14px', color: 'var(--color-text-dark)' }}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Products */}
      <section style={{ backgroundColor: 'var(--color-white)', padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '2rem' }}>Produk Terbaru</h2>
            <Link to="/catalog" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--color-pink-dark)', fontWeight: 'bold', textDecoration: 'none' }}>
              Lihat Semua <FiArrowRight />
            </Link>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Best Sellers */}
      <section className="container" style={{ padding: '60px 1rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>Produk Terlaris 🔥</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          {products.slice().reverse().slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
