import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { FiSearch, FiFilter } from 'react-icons/fi';
import ShopContext from '../context/ShopContext';

export default function Catalog() {
  const { products: contextProducts } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get('category');

  useEffect(() => {
    // If a category filter exists, filter products by category from ShopContext
    if (categoryFilter) {
      setProducts(contextProducts.filter(p => p.category === categoryFilter));
    } else {
      setProducts(contextProducts);
    }
  }, [categoryFilter, contextProducts]);

  let filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  
  if (sort === 'price_asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container" style={{ padding: '40px 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--color-pink-dark)' }}>
          {categoryFilter ? `Kategori: ${categoryFilter}` : 'Katalog Produk'}
        </h1>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <FiSearch style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Cari aksesoris..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '12px 15px 12px 40px', borderRadius: '30px', border: '1px solid var(--color-gray)', width: '250px' }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              style={{ padding: '12px 15px', borderRadius: '30px', border: '1px solid var(--color-gray)', backgroundColor: 'var(--color-white)', cursor: 'pointer', appearance: 'none', paddingRight: '40px' }}
            >
              <option value="newest">Terbaru</option>
              <option value="price_asc">Harga Terendah</option>
              <option value="price_desc">Harga Tertinggi</option>
            </select>
            <FiFilter style={{ position: 'absolute', top: '50%', right: '15px', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--color-text-muted)' }} />
          </div>
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Yah, produk yang kamu cari belum ada 🥲</h3>
          <p>Coba gunakan kata kunci lain yuk!</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
