import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import ShopContext from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useContext(ShopContext);

  const isWishlisted = wishlist.some(w => w.productId === product.id);

  return (
    <div style={{
      backgroundColor: 'var(--color-white)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      transition: 'transform 0.2s',
      position: 'relative',
      cursor: 'pointer'
    }} 
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <button 
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '50%',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: isWishlisted ? 'var(--color-pink-dark)' : 'var(--color-gray-dark)',
        zIndex: 10,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        border: 'none',
        cursor: 'pointer'
      }}>
        <FiHeart size={18} fill={isWishlisted ? 'var(--color-pink-dark)' : 'transparent'} color={isWishlisted ? 'var(--color-pink-dark)' : 'var(--color-pink-dark)'}/>
      </button>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <img src={product.image || 'https://placehold.co/400x400/FFD6E8/333333?text=Produk'} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/FFD6E8/333333?text=Produk"; }} />
        <div style={{ padding: '15px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--color-text-dark)' }}>{product.name}</h3>
          <p style={{ color: 'var(--color-pink-dark)', fontWeight: 'bold', marginBottom: '15px' }}>
            Rp {product.price.toLocaleString('id-ID')}
          </p>
        </div>
      </Link>
      <div style={{ padding: '0 15px 15px 15px' }}>
        <button 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product.id); alert('Barang ditambahkan ke keranjang!'); }}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: 'var(--color-pink)',
          color: 'var(--color-text-dark)',
          fontWeight: 'bold',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          transition: 'background-color 0.2s',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-pink-dark)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-pink)'}
        >
          <FiShoppingCart /> Keranjang
        </button>
      </div>
    </div>
  );
}
