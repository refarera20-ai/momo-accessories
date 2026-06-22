import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import ShopContext from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useContext(ShopContext);

  const isWishlisted = wishlist.some(w => String(w.productId) === String(product.id));

  return (
    <div style={{
      backgroundColor: 'var(--color-white-transparent)',
      backdropFilter: 'blur(5px)',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-card)',
      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      position: 'relative',
      cursor: 'pointer',
      border: '2px solid var(--color-white)'
    }} 
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
      e.currentTarget.style.borderColor = 'var(--color-pink)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      e.currentTarget.style.borderColor = 'var(--color-white)';
    }}
    >
      <button 
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
      style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '50%',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: isWishlisted ? 'var(--color-pink-dark)' : 'var(--color-gray)',
        zIndex: 10,
        boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        border: 'none',
        cursor: 'pointer',
        transition: 'transform 0.2s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <FiHeart size={20} fill={isWishlisted ? 'var(--color-pink-dark)' : 'transparent'} color={isWishlisted ? 'var(--color-pink-dark)' : 'var(--color-gray-dark)'}/>
      </button>
      
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <div style={{ padding: '10px 10px 0 10px' }}>
          <img 
            src={product.image || 'https://placehold.co/400x400/FFD6E8/333333?text=Produk'} 
            alt={product.name} 
            style={{ 
              width: '100%', 
              height: '220px', 
              objectFit: 'cover',
              borderRadius: '16px',
              transition: 'transform 0.5s'
            }} 
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/FFD6E8/333333?text=Produk"; }} 
          />
        </div>
        <div style={{ padding: '20px 15px 15px 15px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '17px', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--color-text-dark)', fontWeight: '700' }}>
            {product.name}
          </h3>
          <div style={{ display: 'inline-block', backgroundColor: 'var(--color-cream)', padding: '5px 15px', borderRadius: '20px', marginBottom: '15px' }}>
            <p style={{ color: 'var(--color-pink-dark)', fontWeight: '800', margin: 0, fontSize: '15px' }}>
              Rp {product.price.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </Link>
      
      <div style={{ padding: '0 15px 15px 15px' }}>
        <button 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product.id); alert('Barang ditambahkan ke keranjang!'); }}
        className="animate-pulse-btn"
        style={{
          width: '100%',
          padding: '12px',
          background: 'linear-gradient(45deg, var(--color-pink), var(--color-pink-dark))',
          color: 'var(--color-white)',
          fontWeight: 'bold',
          fontSize: '15px',
          borderRadius: '14px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 15px rgba(255, 133, 179, 0.3)',
          transition: 'all 0.2s',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 133, 179, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 133, 179, 0.3)';
        }}
        >
          <FiShoppingCart size={18} /> ✨ Beli ✨
        </button>
      </div>
    </div>
  );
}
