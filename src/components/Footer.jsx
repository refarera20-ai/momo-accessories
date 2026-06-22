export default function Footer() {
  return (
    <footer style={{ 
      background: 'linear-gradient(to bottom, var(--color-cream), var(--color-pink))', 
      padding: '60px 0 30px', 
      marginTop: '60px',
      borderTop: '3px dashed var(--color-white)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Sparkles */}
      <span className="animate-twinkle" style={{ position: 'absolute', top: '20px', left: '10%', fontSize: '24px', color: 'var(--color-white)' }}>✨</span>
      <span className="animate-twinkle" style={{ position: 'absolute', top: '50px', right: '15%', fontSize: '20px', color: 'var(--color-pink-dark)', animationDelay: '1s' }}>✨</span>
      
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '30px', marginBottom: '40px' }}>
          <div style={{ flex: '1 1 300px' }}>
            <h3 style={{ 
              fontFamily: 'var(--font-heading)', 
              color: 'var(--color-pink-dark)', 
              fontSize: '28px',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              ✿ MOMO
            </h3>
            <p style={{ color: 'var(--color-text-dark)', lineHeight: '1.6' }}>
              Destinasi utama untuk menemukan aksesoris kawaii, estetik, dan pastel yang akan melengkapi harimu. Belanja dengan gembira dan penuh gaya! 🎀
            </p>
          </div>
          
          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ color: 'var(--color-pink-dark)', fontSize: '18px', marginBottom: '15px' }}>Tautan Cepat</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="/" style={{ color: 'var(--color-text-dark)' }} onMouseEnter={(e) => e.target.style.color='var(--color-pink-dark)'} onMouseLeave={(e) => e.target.style.color='var(--color-text-dark)'}>Beranda</a></li>
              <li><a href="/catalog" style={{ color: 'var(--color-text-dark)' }} onMouseEnter={(e) => e.target.style.color='var(--color-pink-dark)'} onMouseLeave={(e) => e.target.style.color='var(--color-text-dark)'}>Katalog Produk</a></li>
              <li><a href="#" style={{ color: 'var(--color-text-dark)' }} onMouseEnter={(e) => e.target.style.color='var(--color-pink-dark)'} onMouseLeave={(e) => e.target.style.color='var(--color-text-dark)'}>Tentang Kami</a></li>
              <li><a href="#" style={{ color: 'var(--color-text-dark)' }} onMouseEnter={(e) => e.target.style.color='var(--color-pink-dark)'} onMouseLeave={(e) => e.target.style.color='var(--color-text-dark)'}>Hubungi Kami</a></li>
            </ul>
          </div>
          
          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ color: 'var(--color-pink-dark)', fontSize: '18px', marginBottom: '15px' }}>Bantuan</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#" style={{ color: 'var(--color-text-dark)' }} onMouseEnter={(e) => e.target.style.color='var(--color-pink-dark)'} onMouseLeave={(e) => e.target.style.color='var(--color-text-dark)'}>FAQ</a></li>
              <li><a href="#" style={{ color: 'var(--color-text-dark)' }} onMouseEnter={(e) => e.target.style.color='var(--color-pink-dark)'} onMouseLeave={(e) => e.target.style.color='var(--color-text-dark)'}>Kebijakan Pengembalian</a></li>
              <li><a href="#" style={{ color: 'var(--color-text-dark)' }} onMouseEnter={(e) => e.target.style.color='var(--color-pink-dark)'} onMouseLeave={(e) => e.target.style.color='var(--color-text-dark)'}>Panduan Ukuran</a></li>
            </ul>
          </div>
        </div>
        
        <div style={{ 
          textAlign: 'center', 
          color: 'var(--color-text-muted)', 
          borderTop: '1px solid rgba(0,0,0,0.05)',
          paddingTop: '20px',
          fontSize: '14px'
        }}>
          &copy; 2026 Momo Accessories. All rights reserved. Dibuat dengan 💖
        </div>
      </div>
    </footer>
  );
}
