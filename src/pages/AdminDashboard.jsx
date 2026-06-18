import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopContext from '../context/ShopContext';
import { FiHome, FiBox, FiSettings, FiMessageSquare, FiList, FiLogOut, FiEdit, FiTrash2, FiPlus, FiSave, FiUpload } from 'react-icons/fi';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { 
    products, addProduct, editProduct, deleteProduct, 
    categories, addCategory, editCategory, deleteCategory,
    storeSettings, updateSettings,
    chatHistory, sendMessage,
    adminLogout,
    unreadAdmin, clearUnreadAdmin
  } = useContext(ShopContext);

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (activeTab === 'chat' && unreadAdmin > 0) {
      clearUnreadAdmin();
    }
  }, [activeTab, unreadAdmin, clearUnreadAdmin]);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardHome products={products} chatHistory={chatHistory} setActiveTab={setActiveTab} />;
      case 'products': return <ManageProducts products={products} categories={categories} addProduct={addProduct} editProduct={editProduct} deleteProduct={deleteProduct} />;
      case 'settings': return <ManageSettings storeSettings={storeSettings} updateSettings={updateSettings} />;
      case 'chat': return <ManageChat chatHistory={chatHistory} sendMessage={sendMessage} />;
      case 'categories': return <ManageCategories categories={categories} addCategory={addCategory} editCategory={editCategory} deleteCategory={deleteCategory} />;
      default: return <DashboardHome products={products} chatHistory={chatHistory} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-gray-light)', width: '100%' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#fff', borderRight: '1px solid var(--color-gray)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '30px 20px', textAlign: 'center', borderBottom: '1px solid var(--color-gray)' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-pink-dark)', margin: 0 }}>MOMO ADMIN</h2>
        </div>
        
        <div style={{ flex: 1, padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <SidebarItem icon={<FiHome />} label="Dashboard Utama" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={<FiBox />} label="Kelola Produk" active={activeTab === 'products'} onClick={() => setActiveTab('products')} />
          <SidebarItem icon={<FiSettings />} label="Banner & Toko" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          <SidebarItem 
            icon={
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <FiMessageSquare />
                {unreadAdmin > 0 && (
                  <span style={{
                    position: 'absolute', top: '-5px', right: '-10px',
                    backgroundColor: 'red', color: 'white', fontSize: '0.65rem',
                    padding: '2px 5px', borderRadius: '10px', fontWeight: 'bold'
                  }}>
                    {unreadAdmin}
                  </span>
                )}
              </div>
            } 
            label="Chat Pelanggan" 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')} 
          />
          <SidebarItem icon={<FiList />} label="Kelola Kategori" active={activeTab === 'categories'} onClick={() => setActiveTab('categories')} />
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid var(--color-gray)' }}>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '12px', backgroundColor: 'transparent', color: 'var(--color-danger)', border: '1px solid var(--color-danger)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            <FiLogOut /> Keluar
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {renderTabContent()}
      </div>
    </div>
  );
}

// Komponen Pembantu
function SidebarItem({ icon, label, active, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 25px', cursor: 'pointer',
        backgroundColor: active ? 'var(--color-pink-light)' : 'transparent',
        color: active ? 'var(--color-pink-dark)' : 'var(--color-text-dark)',
        borderRight: active ? '4px solid var(--color-pink-dark)' : '4px solid transparent',
        fontWeight: active ? 'bold' : 'normal',
        transition: 'background-color 0.2s'
      }}
    >
      <span style={{ fontSize: '1.2rem' }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function DashboardHome({ products, chatHistory, setActiveTab }) {
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalChats = Object.keys(chatHistory || {}).length;

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Dashboard Ringkasan</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        <StatCard title="Total Produk" value={totalProducts} icon={<FiBox size={30} />} color="var(--color-pink)" onClick={() => setActiveTab('products')} />
        <StatCard title="Total Stok Barang" value={totalStock} icon={<FiList size={30} />} color="var(--color-lavender)" onClick={() => setActiveTab('products')} />
        <StatCard title="Pesan Masuk" value={totalChats} icon={<FiMessageSquare size={30} />} color="#FFD54F" onClick={() => setActiveTab('chat')} />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{ 
        backgroundColor: '#fff', padding: '25px', borderRadius: '16px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', 
        alignItems: 'center', gap: '20px', cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
      onMouseEnter={(e) => {
        if(onClick) {
           e.currentTarget.style.transform = 'translateY(-5px)';
           e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if(onClick) {
           e.currentTarget.style.transform = 'translateY(0)';
           e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
        }
      }}
    >
      <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <div>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '5px' }}>{title}</p>
        <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{value}</h3>
      </div>
    </div>
  );
}

function ManageProducts({ products, categories, addProduct, editProduct, deleteProduct }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: '', price: '', stock: '', category: '', description: '', image: '' });

  const resetForm = () => {
    setFormData({ id: null, name: '', price: '', stock: '', category: categories[0]?.name || '', description: '', image: '' });
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = { ...formData, price: Number(formData.price), stock: Number(formData.stock), image: formData.image || 'https://placehold.co/400x400/FFD6E8/333333?text=Product' };
    
    if (isEditing) {
      editProduct(formData.id, payload);
    } else {
      addProduct(payload);
    }
    resetForm();
    alert('Produk berhasil disimpan!');
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus produk ini?')) {
      deleteProduct(id);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Kelola Produk</h2>
      
      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 600px', backgroundColor: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '20px' }}>Daftar Produk</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-gray)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Produk</th>
                <th style={{ padding: '10px' }}>Kategori</th>
                <th style={{ padding: '10px' }}>Harga</th>
                <th style={{ padding: '10px' }}>Stok</th>
                <th style={{ padding: '10px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--color-gray)' }}>
                  <td style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={p.image || 'https://placehold.co/400x400/FFD6E8/333333?text=Produk'} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/FFD6E8/333333?text=Produk"; }} />
                    <span style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
                  </td>
                  <td style={{ padding: '10px' }}>{p.category}</td>
                  <td style={{ padding: '10px' }}>Rp {p.price.toLocaleString('id-ID')}</td>
                  <td style={{ padding: '10px' }}>{p.stock}</td>
                  <td style={{ padding: '10px' }}>
                    <button onClick={() => handleEdit(p)} style={{ marginRight: '10px', color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}><FiEdit size={18} /></button>
                    <button onClick={() => handleDelete(p.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}><FiTrash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ flex: '1 1 300px', backgroundColor: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', position: 'sticky', top: '20px' }}>
          <h3 style={{ marginBottom: '20px' }}>{isEditing ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" placeholder="Nama Produk" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle} />
            <input type="number" placeholder="Harga (Rp)" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={inputStyle} />
            <input type="number" placeholder="Stok" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} style={inputStyle} />
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={inputStyle}>
              <option value="">Pilih Kategori</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
            <textarea placeholder="Deskripsi Singkat" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ ...inputStyle, minHeight: '80px', marginBottom: '15px' }} />
            <ImageUploader label="Gambar Produk" value={formData.image} onChange={(val) => setFormData({...formData, image: val})} />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              {isEditing && <button type="button" onClick={resetForm} style={btnSecondaryStyle}>Batal</button>}
              <button type="submit" style={btnPrimaryStyle}>{isEditing ? 'Simpan Perubahan' : 'Tambah Produk'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function ManageSettings({ storeSettings, updateSettings }) {
  const [formData, setFormData] = useState(storeSettings);

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings(formData);
    alert('Pengaturan Website Berhasil Diperbarui!');
  };

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Pengaturan Website</h2>
      
      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '30px' }}>
        
        {/* Kolom 1: Banner & Tampilan */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--color-gray)', paddingBottom: '10px' }}>Banner & Tampilan</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={labelStyle}>Nama Toko</label>
              <input type="text" value={formData.storeName} onChange={e => setFormData({...formData, storeName: e.target.value})} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Tagline / Subjudul</label>
              <textarea value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} style={inputStyle} rows="2"/>
            </div>
            <ImageUploader label="Gambar Hero Banner" value={formData.heroImage} onChange={(val) => setFormData({...formData, heroImage: val})} />
            <ImageUploader label="Gambar Maskot Kelinci (Kanan)" value={formData.mascotImage} onChange={(val) => setFormData({...formData, mascotImage: val})} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', 
                          padding: '10px', backgroundColor: 'var(--color-gray-light)', borderRadius: '8px' }}>
              <input type="checkbox" checked={formData.promoActive} onChange={e => setFormData({...formData, promoActive: e.target.checked})} style={{ transform: 'scale(1.2)' }} />
              <label style={{ fontWeight: 'bold' }}>Aktifkan Banner Promo</label>
            </div>
            {formData.promoActive && (
              <div>
                <label style={labelStyle}>Teks Banner Promo</label>
                <input type="text" value={formData.promoText} onChange={e => setFormData({...formData, promoText: e.target.value})} style={inputStyle} />
              </div>
            )}
          </div>
        </div>

        {/* Kolom 2: Kontak & Sosial Media */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--color-gray)', paddingBottom: '10px' }}>Kontak & Sosial Media</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={labelStyle}>Nomor WhatsApp Checkout (Gunakan awalan 62)</label>
              <input type="text" value={formData.waNumber} onChange={e => setFormData({...formData, waNumber: e.target.value})} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email Toko</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Username Instagram</label>
              <input type="text" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Alamat Fisik (Opsional)</label>
              <textarea value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} style={inputStyle} rows="2"/>
            </div>

            <button type="submit" style={{ ...btnPrimaryStyle, marginTop: '20px' }}><FiSave /> Simpan Pengaturan</button>
          </div>
        </div>

      </form>
    </div>
  );
}

function ManageChat({ chatHistory, sendMessage }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [replyText, setReplyText] = useState('');
  const endRef = useRef(null);

  // Automatically select the first user if none is selected and there are chats
  const chatUsers = Object.keys(chatHistory || {});
  useEffect(() => {
    if (!selectedUser && chatUsers.length > 0) {
      setSelectedUser(chatUsers[0]);
    }
  }, [chatUsers, selectedUser]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, selectedUser]);

  const handleReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedUser) return;
    sendMessage(selectedUser, replyText, 'admin');
    setReplyText('');
  };

  const currentMessages = selectedUser && chatHistory[selectedUser] ? chatHistory[selectedUser] : [];

  return (
    <div style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Chat Pelanggan</h2>
      
      <div style={{ flex: 1, display: 'flex', gap: '20px', overflow: 'hidden' }}>
        {/* Kolom Kiri: Daftar Pelanggan */}
        <div style={{ width: '300px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--color-gray)', backgroundColor: 'var(--color-pink-light)' }}>
            <h3 style={{ margin: 0, color: 'var(--color-pink-dark)' }}>Daftar Obrolan ({chatUsers.length})</h3>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {chatUsers.length === 0 ? (
              <p style={{ padding: '20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>Belum ada pesan</p>
            ) : (
              chatUsers.map(userId => (
                <div 
                  key={userId}
                  onClick={() => setSelectedUser(userId)}
                  style={{
                    padding: '20px', borderBottom: '1px solid var(--color-gray)', cursor: 'pointer',
                    backgroundColor: selectedUser === userId ? 'var(--color-pink)' : 'transparent',
                    color: selectedUser === userId ? 'white' : 'var(--color-text-dark)',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '5px' }}>Pelanggan #{userId}</strong>
                  <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                    {chatHistory[userId].length} pesan
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Kolom Kanan: Jendela Chat Aktif */}
        <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {!selectedUser ? (
             <div style={{ margin: 'auto', color: 'var(--color-text-muted)', textAlign: 'center' }}>
               <FiMessageSquare size={50} style={{ opacity: 0.5, marginBottom: '10px' }} />
               <p>Pilih salah satu obrolan untuk mulai membalas</p>
             </div>
          ) : (
            <>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--color-gray)', backgroundColor: 'var(--color-gray-light)' }}>
                <h3 style={{ margin: 0 }}>Obrolan Pelanggan #{selectedUser}</h3>
              </div>
              <div style={{ flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {currentMessages.map((msg) => (
                  <div key={msg.id} style={{ alignSelf: msg.sender === 'admin' ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                    <div style={{
                      backgroundColor: msg.sender === 'admin' ? '#E1F5FE' : '#fff',
                      padding: '12px', borderRadius: '12px',
                      border: msg.sender === 'admin' ? '1px solid #B3E5FC' : '1px solid var(--color-gray)'
                    }}>
                      <strong style={{ display: 'block', marginBottom: '5px', color: msg.sender === 'admin' ? '#0288D1' : 'var(--color-pink-dark)' }}>
                        {msg.sender === 'admin' ? 'Admin Momo' : `Pelanggan #${selectedUser}`}
                      </strong>
                      {msg.text}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block', textAlign: msg.sender === 'admin' ? 'right' : 'left' }}>{msg.time}</span>
                  </div>
                ))}
                <div ref={endRef} />
              </div>
              
              <form onSubmit={handleReply} style={{ padding: '15px 20px', backgroundColor: '#fff', borderTop: '1px solid var(--color-gray)', display: 'flex', gap: '10px' }}>
                <input type="text" value={replyText} onChange={e => setReplyText(e.target.value)} placeholder={`Balas Pelanggan #${selectedUser}...`} style={{ flex: 1, padding: '12px', borderRadius: '25px', border: '1px solid var(--color-gray)', fontSize: '1rem' }} />
                <button type="submit" disabled={!replyText.trim()} style={{ 
                  padding: '0 25px', backgroundColor: 'var(--color-pink-dark)', color: '#fff', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' 
                }}>Kirim</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ManageCategories({ categories, addCategory, deleteCategory }) {
  const [newCat, setNewCat] = useState({ name: '', icon: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if(!newCat.name || !newCat.icon) return;
    addCategory(newCat);
    setNewCat({name: '', icon: ''});
  };

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Kelola Kategori</h2>
      
      <div style={{ display: 'flex', gap: '30px' }}>
        <div style={{ flex: 1, backgroundColor: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '20px' }}>Daftar Kategori</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {categories.map(c => (
              <li key={c.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid var(--color-gray)' }}>
                <span style={{ fontSize: '1.2rem' }}>{c.icon} {c.name}</span>
                <button onClick={() => deleteCategory(c.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}><FiTrash2 size={20} /></button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ width: '350px', backgroundColor: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', alignSelf: 'flex-start' }}>
          <h3 style={{ marginBottom: '20px' }}>Tambah Kategori</h3>
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={labelStyle}>Nama Kategori</label>
              <input type="text" value={newCat.name} onChange={e => setNewCat({...newCat, name: e.target.value})} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Icon (Emoji)</label>
              <input type="text" placeholder="Misal: 🎀" value={newCat.icon} onChange={e => setNewCat({...newCat, icon: e.target.value})} style={inputStyle} required />
            </div>
            <button type="submit" style={btnPrimaryStyle}>Tambah Kategori</button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Fitur Upload Gambar Drag & Drop
function ImageUploader({ value, onChange, label }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onChange(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onChange(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={labelStyle}>{label}</label>
      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => !value && fileInputRef.current?.click()}
        style={{
          border: '2px dashed var(--color-gray)', borderRadius: '12px', padding: value ? '10px' : '30px', 
          textAlign: 'center', backgroundColor: value ? 'transparent' : 'var(--color-gray-light)', 
          cursor: value ? 'default' : 'pointer', position: 'relative', transition: 'background-color 0.2s'
        }}
      >
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
        
        {value ? (
          <div>
            <img src={value} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '8px' }} />
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
              <button type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }} style={btnSecondaryStyle}>Ganti Gambar</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); onChange(''); }} style={{ ...btnSecondaryStyle, backgroundColor: '#ffebee', color: 'red' }}>Hapus</button>
            </div>
          </div>
        ) : (
          <div style={{ color: 'var(--color-text-muted)' }}>
            <FiUpload size={36} style={{ marginBottom: '10px', color: 'var(--color-pink-dark)' }} />
            <p style={{ margin: 0, fontWeight: 'bold' }}>Pilih atau Tarik Gambar</p>
            <span style={{ fontSize: '0.85rem' }}>Maks file 2MB disarankan</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Styling Globals for Admin Forms
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '1rem', boxSizing: 'border-box' };
const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--color-text-dark)' };
const btnPrimaryStyle = { flex: 1, padding: '12px', backgroundColor: 'var(--color-pink-dark)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' };
const btnSecondaryStyle = { flex: 1, padding: '10px', backgroundColor: 'var(--color-gray-light)', color: 'var(--color-text-dark)', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };
