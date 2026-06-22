import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import ShopContext from '../context/ShopContext';

export default function Home() {
  const { products, categories, storeSettings } = useContext(ShopContext);

  // Hardcoded Testimonials for visual enhancement
  const testimonials = [
    { id: 1, name: "Sakura H.", text: "Barangnya lucu-lucu banget! Pengirimannya jg cepet & packagingnya super aman 💖", rating: 5 },
    { id: 2, name: "Ayu Kirana", text: "Quality aksesorisnya premium, ga gampang luntur. Bakal langganan terus di Momo! ✨", rating: 5 },
    { id: 3, name: "Chika", text: "Maskotnya gemes bgt! Dapet freebies sticker lucu juga pas dapet paketnya. Recommended! 🎀", rating: 5 }
  ];

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative',
        background: storeSettings.heroImage && !storeSettings.heroImage.includes('placehold.co') 
          ? `url(${storeSettings.heroImage}) center/cover` 
          : 'linear-gradient(135deg, var(--color-pink) 0%, var(--color-lavender) 100%)',
        padding: '80px 0',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        borderBottomRightRadius: '100px',
        borderBottomLeftRadius: '20px',
        boxShadow: '0 10px 30px rgba(255, 133, 179, 0.2)'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="glass-panel" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap-reverse', 
            gap: '40px',
            padding: '50px', 
            borderRadius: '40px',
            border: '2px solid rgba(255, 255, 255, 0.8)'
          }}>
            <div style={{ flex: '1 1 400px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'var(--color-cream)', padding: '8px 20px', borderRadius: '30px', fontWeight: 'bold', color: 'var(--color-pink-dark)', marginBottom: '20px', boxShadow: 'var(--shadow-soft)' }}>
                🎀 Welcome to Momo
              </div>
              <h1 style={{ fontSize: '3.5rem', color: 'var(--color-text-dark)', marginBottom: '20px', lineHeight: '1.2', textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)' }}>
                {storeSettings.storeName}
              </h1>
              <p style={{ fontSize: '1.3rem', marginBottom: '35px', color: '#555', lineHeight: '1.6' }}>
                {storeSettings.tagline}
              </p>
              <Link to="/catalog" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'linear-gradient(45deg, var(--color-pink-dark), var(--color-lavender-dark))',
                color: 'var(--color-white)',
                padding: '16px 36px',
                borderRadius: '50px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                textDecoration: 'none',
                boxShadow: '0 8px 25px rgba(255, 133, 179, 0.5)',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(255, 133, 179, 0.6)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 133, 179, 0.5)'; }}
              >
                Mulai Belanja ✨
              </Link>
            </div>
            <div style={{ flex: '1 1 300px', textAlign: 'center', position: 'relative' }}>
              {/* Decorative behind mascot */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '350px', height: '350px', backgroundColor: 'var(--color-white)', borderRadius: '50%', filter: 'blur(40px)', opacity: 0.6, zIndex: -1 }}></div>
              <img 
                src={storeSettings.mascotImage} 
                alt="Mascot" 
                className="animate-float"
                style={{ width: '100%', maxWidth: '350px', objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(255, 133, 179, 0.3))' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Promo Section (Conditional) */}
      {storeSettings.promoActive && (
        <div className="animate-pulse-btn" style={{ 
          background: 'linear-gradient(90deg, var(--color-pink-dark), var(--color-lavender-dark))', 
          color: '#fff', 
          textAlign: 'center', 
          padding: '12px', 
          fontWeight: 'bold',
          fontSize: '1.1rem',
          letterSpacing: '1px'
        }}>
          ✨ {storeSettings.promoText} ✨
        </div>
      )}

      {/* Categories */}
      <section className="container" style={{ padding: '80px 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: 'var(--color-pink-dark)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Eksplorasi</span>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--color-text-dark)', marginTop: '10px' }}>Kategori Pilihan 🎀</h2>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '24px',
          textAlign: 'center'
        }}>
          {categories.map((cat) => (
            <Link to={`/catalog?category=${cat.name}`} key={cat.id} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '30px 20px',
              backgroundColor: 'var(--color-white-transparent)',
              backdropFilter: 'blur(5px)',
              border: '2px solid var(--color-white)',
              borderRadius: '24px',
              boxShadow: 'var(--shadow-card)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => { 
               e.currentTarget.style.transform = 'translateY(-10px)'; 
               e.currentTarget.style.borderColor = 'var(--color-pink)';
               e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
            }}
            onMouseLeave={(e) => { 
               e.currentTarget.style.transform = 'translateY(0)'; 
               e.currentTarget.style.borderColor = 'var(--color-white)';
               e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
            >
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '15px', 
                backgroundColor: 'var(--color-pink)',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                boxShadow: 'inset 0 -4px 10px rgba(0,0,0,0.05)'
              }}>{cat.icon}</div>
              <span style={{ fontWeight: '700', fontSize: '16px', color: 'var(--color-text-dark)' }}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Products */}
      <section style={{ 
        background: 'linear-gradient(to bottom, var(--color-white), var(--color-cream))', 
        padding: '80px 0',
        borderTopLeftRadius: '60px',
        borderTopRightRadius: '60px'
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ color: 'var(--color-pink-dark)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Koleksi Baru</span>
              <h2 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Produk Terbaru ✨</h2>
            </div>
            <Link to="/catalog" style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              color: 'var(--color-pink-dark)', fontWeight: 'bold', 
              textDecoration: 'none', backgroundColor: 'var(--color-white)',
              padding: '10px 24px', borderRadius: '30px',
              boxShadow: 'var(--shadow-card)', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Lihat Semua <FiArrowRight />
            </Link>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '30px'
          }}>
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="container" style={{ padding: '80px 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: 'var(--color-lavender-dark)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Kata Mereka</span>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--color-text-dark)', marginTop: '10px' }}>Ulasan Pelanggan 💌</h2>
        </div>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'center'
        }}>
          {testimonials.map(t => (
            <div key={t.id} style={{
              flex: '1 1 300px',
              maxWidth: '400px',
              backgroundColor: 'var(--color-white)',
              padding: '30px',
              borderRadius: '24px',
              boxShadow: 'var(--shadow-card)',
              borderBottom: '4px solid var(--color-pink)',
              position: 'relative'
            }}>
              <div style={{ color: '#FFD700', marginBottom: '10px', display: 'flex', gap: '5px' }}>
                {[...Array(t.rating)].map((_, i) => <FiStar key={i} fill="#FFD700" />)}
              </div>
              <p style={{ fontStyle: 'italic', color: '#555', marginBottom: '20px', lineHeight: '1.6' }}>"{t.text}"</p>
              <h4 style={{ color: 'var(--color-pink-dark)', fontWeight: '700' }}>- {t.name}</h4>
              
              {/* Decorative Ribbon/Tape */}
              <div style={{
                position: 'absolute',
                top: '-15px',
                left: '50%',
                transform: 'translateX(-50%) rotate(-3deg)',
                width: '80px',
                height: '30px',
                backgroundColor: 'rgba(255, 214, 232, 0.7)',
                backdropFilter: 'blur(2px)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}></div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Best Sellers */}
      <section style={{ background: 'linear-gradient(to top, var(--color-white), var(--color-pink))', padding: '80px 0', borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: 'var(--color-text-dark)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Paling Dicari</span>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-text-dark)', marginTop: '10px' }}>Produk Terlaris 🔥</h2>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '30px'
          }}>
            {products.slice().reverse().slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
