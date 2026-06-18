import { Link } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMessageCircle } from 'react-icons/fi';
import { useContext } from 'react';
import ShopContext from '../context/ShopContext';

export default function Header() {
  const { unreadCustomer } = useContext(ShopContext);

  return (
    <header style={{ backgroundColor: 'var(--color-white)', padding: '15px 0', borderBottom: '1px solid var(--color-gray)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-pink-dark)', fontFamily: 'var(--font-heading)' }}>
          MOMO
        </Link>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/">Home</Link>
          <Link to="/catalog">Katalog</Link>
          <Link to="/wishlist"><FiHeart size={20} /></Link>
          <Link to="/cart"><FiShoppingCart size={20} /></Link>
          <Link to="/chat" style={{ position: 'relative' }}>
            <FiMessageCircle size={20} />
            {unreadCustomer > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: 'var(--color-danger, red)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                padding: '2px 6px',
                borderRadius: '10px'
              }}>
                {unreadCustomer}
              </span>
            )}
          </Link>
          <Link to="/profile"><FiUser size={20} /></Link>
        </div>
      </div>
    </header>
  );
}
