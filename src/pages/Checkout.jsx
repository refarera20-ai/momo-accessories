import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShopContext from '../context/ShopContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, checkoutOrder, clearCart, currentUser, storeSettings } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    phone: currentUser.phone || '',
    address: currentUser.address || '',
    city: 'Jakarta Selatan',
    paymentMethod: 'bank_transfer'
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = 15000;
  const total = subtotal + shipping;
  const formatting = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Keranjang Anda kosong!');
      return;
    }
    
    // Save to local order history
    await checkoutOrder(formData);

    // Prepare WhatsApp Message
    let productList = cart.map((item, i) => `- ${item.quantity}x ${item.product.name} (${formatting.format(item.product.price * item.quantity)})`).join('\n');
    let message = `Halo ${storeSettings.storeName} 👋\n\nSaya ingin memesan:\n\n${productList}\n\nTermasuk Ongkir: ${formatting.format(shipping)}\nTotal: *${formatting.format(total)}*\n\nNama: ${formData.name}\nAlamat Penuh: ${formData.address}, ${formData.city}\nMetode Bayar: ${formData.paymentMethod === 'bank_transfer' ? 'Transfer Bank' : formData.paymentMethod === 'ewallet' ? 'E-Wallet' : 'COD'}`;

    let waUrl = `https://wa.me/${storeSettings.waNumber}?text=${encodeURIComponent(message)}`;
    
    // Clear the cart explicitly just in case
    await clearCart();

    // Redirect to WhatsApp safely for Mobile Browsers
    window.location.href = waUrl;
    
    // alert is skipped or placed differently because of redirect, but we'll show it before redirect if possible or just navigate
    // Actually, setting window.location.href redirects away, so no need for React navigate or alert after.
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Checkout 🛍️</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>Keranjang Anda kosong. Silakan pilih produk terlebih dahulu.</p>
        <Link to="/catalog" style={{ display: 'inline-block', padding: '10px 24px', backgroundColor: 'var(--color-pink-dark)', color: '#fff', borderRadius: '25px', fontWeight: 'bold', textDecoration: 'none' }}>Kembali Belanja</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Checkout 🛍️</h2>
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        <div style={{ flex: '1 1 600px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '1px solid var(--color-gray)', paddingBottom: '10px' }}>Alamat Pengiriman</h3>
            
            <form id="checkout-form" onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nama Lengkap</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '1rem' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nomor Telepon</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '1rem' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Kota/Kabupaten</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '1rem' }} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Alamat Lengkap</label>
                <textarea name="address" value={formData.address} onChange={handleChange} required rows="3"
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '1rem' }}></textarea>
              </div>
            </form>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '1px solid var(--color-gray)', paddingBottom: '10px' }}>Metode Pembayaran ({storeSettings.storeName})</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {['bank_transfer', 'ewallet', 'cod'].map(method => (
                <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', border: '1px solid var(--color-gray)', borderRadius: '8px', cursor: 'pointer', backgroundColor: formData.paymentMethod === method ? 'var(--color-pink)' : 'transparent' }}>
                  <input type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod === method} onChange={handleChange} style={{ transform: 'scale(1.2)' }} />
                  <span style={{ fontWeight: '600' }}>
                    {method === 'bank_transfer' ? 'Transfer Bank' : method === 'ewallet' ? 'E-Wallet (GoPay/OVO/Dana)' : 'Bayar di Tempat (COD)'}
                  </span>
                </label>
              ))}
            </div>
            <p style={{ marginTop: '15px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              *Klik buat pesanan, Anda akan dialihkan secara otomatis ke nomor WhatsApp Kasir toko.
            </p>
          </div>
        </div>

        <div style={{ flex: '1 1 350px', backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', position: 'sticky', top: '20px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '1px solid var(--color-gray)', paddingBottom: '15px' }}>Ringkasan Pesanan</h3>
          
          <div style={{ marginBottom: '20px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{item.quantity}x {item.product.name}</span>
                <span style={{ fontWeight: '600' }}>{formatting.format(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--color-gray)', paddingTop: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
              <span style={{ fontWeight: '600' }}>{formatting.format(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Ongkos Kirim</span>
              <span style={{ fontWeight: '600' }}>{formatting.format(shipping)}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', paddingTop: '15px', borderTop: '2px solid var(--color-gray)' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total Bayar</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-pink-dark)' }}>{formatting.format(total)}</span>
          </div>
          
          <button type="submit" form="checkout-form" style={{
            width: '100%',
            backgroundColor: '#25D366', /* Warna WhatsApp */
            color: 'white',
            padding: '16px',
            borderRadius: '30px',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 4px 10px rgba(37, 211, 102, 0.4)',
            transition: 'transform 0.2s',
            cursor: 'pointer',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Pesan via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
