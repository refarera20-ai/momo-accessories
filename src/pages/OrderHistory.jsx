import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiBox, FiClock, FiCheckCircle, FiTruck } from 'react-icons/fi';
import ShopContext from '../context/ShopContext';

export default function OrderHistory() {
  const { orders } = useContext(ShopContext);

  const formatting = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Selesai': return <FiCheckCircle color="var(--color-success)" />;
      case 'Dikirim': return <FiTruck color="var(--color-pink-dark)" />;
      case 'Menunggu Pembayaran': return <FiClock color="#F5A623" />;
      default: return <FiBox />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selesai': return 'rgba(76, 175, 80, 0.1)';
      case 'Dikirim': return 'rgba(255, 133, 179, 0.1)';
      case 'Menunggu Pembayaran': return 'rgba(245, 166, 35, 0.1)';
      default: return 'var(--color-gray-light)';
    }
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px', minHeight: '80vh' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Riwayat Pesanan 📦</h2>
      
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>Belum ada riwayat pesanan.</p>
          <Link to="/catalog" style={{ display: 'inline-block', padding: '10px 24px', backgroundColor: 'var(--color-pink-dark)', color: '#fff', borderRadius: '25px', fontWeight: 'bold', textDecoration: 'none' }}>Mulai Belanja</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map(order => (
            <div key={order.id} style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-gray)', paddingBottom: '15px', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ fontWeight: 'bold', marginRight: '15px' }}>{order.id}</span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{order.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: getStatusColor(order.status), padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  {getStatusIcon(order.status)}
                  <span style={{ 
                    color: order.status === 'Selesai' ? 'var(--color-success)' : 
                          order.status === 'Dikirim' ? 'var(--color-pink-dark)' : 
                          order.status === 'Menunggu Pembayaran' ? '#D48806' : 'var(--color-text-dark)' 
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <img src={item.image || 'https://placehold.co/400x400/FFD6E8/333333?text=Produk'} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/FFD6E8/333333?text=Produk"; }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{item.name}</h4>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{item.quantity} x {formatting.format(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-gray)', paddingTop: '15px', marginTop: '15px', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', marginRight: '10px' }}>Total Belanja</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatting.format(order.total)}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {order.status === 'Menunggu Pembayaran' && (
                    <button style={{ padding: '8px 16px', backgroundColor: 'var(--color-pink-dark)', color: '#fff', borderRadius: '20px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Bayar Sekarang</button>
                  )}
                </div>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

