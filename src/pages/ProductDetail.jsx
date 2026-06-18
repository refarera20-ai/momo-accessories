import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiArrowLeft, FiMinus, FiPlus } from 'react-icons/fi';
import ShopContext from '../context/ShopContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, wishlist } = useContext(ShopContext);
  
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    // Look up ID in local products rather than using Axios
    const found = products.find(p => p.id === parseInt(id));
    setProduct(found);
    window.scrollTo(0, 0); // Reset scroll position when opening a new detail
  }, [id, products]);

  if (!product) {
    return <div className="container" style={{ padding: '60px 1rem', textAlign: 'center' }}>Loading...</div>;
  }

  const isWishlisted = wishlist.some(w => w.productId === product.id);

  const handleQtyChange = (type) => {
    if (type === 'minus' && qty > 1) setQty(qty - 1);
    if (type === 'plus' && qty < product.stock) setQty(qty + 1);
  };

  const handleAddToCart = () => {
    addToCart(product.id, qty);
    alert(`${qty} ${product.name} ditambahkan ke keranjang!`);
  };

  const handleBuyNow = () => {
    addToCart(product.id, qty);
    navigate('/checkout');
  };

  return (
    <div className="container" style={{ padding: '40px 1rem' }}>
      <button 
        onClick={() => navigate(-1)}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', marginBottom: '30px', fontWeight: 'bold', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
      >
        <FiArrowLeft /> Kembali
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', backgroundColor: 'var(--color-white)', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <div style={{ flex: '1 1 400px' }}>
          <img 
            src={product.image || 'https://placehold.co/400x400/FFD6E8/333333?text=Produk'} 
            alt={product.name} 
            style={{ width: '100%', borderRadius: '16px', objectFit: 'cover' }} 
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/FFD6E8/333333?text=Produk"; }}
          />
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
            <h1 style={{ fontSize: '2rem', color: 'var(--color-text-dark)', margin: 0 }}>{product.name}</h1>
            <button 
            onClick={() => toggleWishlist(product.id)}
            style={{ backgroundColor: 'var(--color-gray-light)', padding: '12px', borderRadius: '50%', color: 'var(--color-pink-dark)', transition: 'background-color 0.2s', border: 'none', cursor: 'pointer' }} 
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-pink)'} 
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gray-light)'}>
              <FiHeart size={24} fill={isWishlisted ? 'var(--color-pink-dark)' : 'transparent'} />
            </button>
          </div>
          
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-pink-dark)', margin: '10px 0 20px 0' }}>
            Rp {product.price.toLocaleString('id-ID')}
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <span style={{ 
              display: 'inline-block', 
              padding: '6px 12px', 
              backgroundColor: 'var(--color-lavender)', 
              color: 'var(--color-text-dark)', 
              borderRadius: '20px', 
              fontSize: '0.9rem', 
              fontWeight: 'bold',
              marginBottom: '15px'
            }}>
              Kategori: {product.category}
            </span>
            <p style={{ color: 'var(--color-text-dark)', lineHeight: '1.6' }}>
              {product.description}
            </p>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
              <span style={{ fontWeight: 'bold' }}>Jumlah:</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-gray)', borderRadius: '30px', overflow: 'hidden' }}>
                <button onClick={() => handleQtyChange('minus')} style={{ padding: '10px 15px', backgroundColor: 'var(--color-gray-light)', border: 'none', cursor: 'pointer' }}><FiMinus /></button>
                <span style={{ width: '40px', textAlign: 'center', fontWeight: 'bold' }}>{qty}</span>
                <button onClick={() => handleQtyChange('plus')} style={{ padding: '10px 15px', backgroundColor: 'var(--color-gray-light)', border: 'none', cursor: 'pointer' }}><FiPlus /></button>
              </div>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Sisa stok: {product.stock}</span>
            </div>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <button 
              onClick={handleAddToCart}
              style={{ 
                flex: '1 1 200px', 
                padding: '16px', 
                backgroundColor: 'var(--color-pink)', 
                color: 'var(--color-text-dark)', 
                fontWeight: 'bold', 
                borderRadius: '30px', 
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
                <FiShoppingCart size={20} /> Keranjang
              </button>
              <button 
              onClick={handleBuyNow}
              style={{ 
                flex: '1 1 200px', 
                padding: '16px', 
                backgroundColor: 'var(--color-lavender-dark)', 
                color: 'var(--color-white)', 
                fontWeight: 'bold', 
                borderRadius: '30px',
                transition: 'background-color 0.2s',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#9a6aff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-lavender-dark)'}
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
