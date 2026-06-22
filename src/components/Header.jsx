import { Link } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMessageCircle } from 'react-icons/fi';
import { useContext } from 'react';
import ShopContext from '../context/ShopContext';

export default function Header() {
  const { unreadCustomer } = useContext(ShopContext);

  return (
    <header className="glass-panel" style={{ 
      padding: '15px 0', 
      position: 'sticky', 
      top: 0, 
      zIndex: 100,
      borderBottom: '2px solid rgba(255, 214, 232, 0.4)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ 
          fontSize: '28px', 
          fontWeight: '800', 
          color: 'var(--color-pink-dark)', 
          fontFamily: 'var(--font-heading)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textShadow: '2px 2px 4px rgba(255, 133, 179, 0.2)'
        }}>
          ✿ MOMO
        </Link>
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center', fontWeight: '600' }}>
          <Link to="/" style={{ color: 'var(--color-text-dark)' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-pink-dark)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-dark)'}>Home</Link>
          <Link to="/catalog" style={{ color: 'var(--color-text-dark)' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-pink-dark)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-dark)'}>Katalog</Link>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginLeft: '10px', paddingLeft: '20px', borderLeft: '2px dashed var(--color-pink)' }}>
            <Link to="/wishlist" style={{ color: 'var(--color-pink-dark)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <FiHeart size={22} />
            </Link>
            <Link to="/cart" style={{ color: 'var(--color-pink-dark)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <FiShoppingCart size={22} />
            </Link>
            <Link to="/chat" style={{ position: 'relative', color: 'var(--color-pink-dark)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <FiMessageCircle size={22} />
              {unreadCustomer > 0 && (
                <span className="animate-pulse-btn" style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: 'var(--color-danger)',
                  color: 'white',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 5px rgba(255, 107, 107, 0.5)'
                }}>
                  {unreadCustomer}
                </span>
              )}
            </Link>
            <Link to="/profile" style={{ color: 'var(--color-pink-dark)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <FiUser size={22} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
