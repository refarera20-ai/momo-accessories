import { createContext, useState, useEffect } from 'react';
import dbData from '../../db.json';
import { supabase } from '../lib/supabase';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [chatHistory, setChatHistory] = useState({});
  const [categories, setCategories] = useState([]);
  
  // States that use localStorage purely for UI interactions
  const [unreadCustomer, setUnreadCustomer] = useState(() => Number(localStorage.getItem('momo_unread_customer')) || 0);
  const [unreadAdmin, setUnreadAdmin] = useState(() => Number(localStorage.getItem('momo_unread_admin')) || 0);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try { return JSON.parse(localStorage.getItem('momo_admin')) || false; } catch (e) { return false; }
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('momo_user')) || dbData.users[0]; } catch(e) { return dbData.users[0]; }
  });

  const defaultSettings = {
    storeName: 'Momo Accessories',
    tagline: 'Aksesoris Lucu untuk Hari yang Lebih Berwarna ✨',
    waNumber: '6281234567890',
    email: 'hello@momo.com',
    instagram: 'momo.acc',
    tiktok: 'momo.acc',
    address: 'Jl. Melati No. 123, Jakarta',
    heroImage: 'https://placehold.co/800x400/FFD6E8/333333?text=Hero+Banner',
    mascotImage: 'https://placehold.co/400x400/DCC6FF/FFFFFF?text=Rabbit+Bag+Img',
    promoActive: true,
    promoText: 'Diskon 20% untuk semua produk!'
  };
  const [storeSettings, setStoreSettings] = useState(defaultSettings);

  const fetchData = async (table) => {
    const { data, error } = await supabase.from(table).select('*').order('id', { ascending: false });
    if (error) {
      console.error(`Error fetching ${table}:`, error);
      return [];
    }
    return data;
  };

  const fetchSettings = async () => {
    const { data, error } = await supabase.from('settings').select('*');
    if (!error && data) {
      const formatted = { ...defaultSettings };
      data.forEach(item => {
        try {
          formatted[item.key] = typeof item.value === 'string' ? JSON.parse(item.value) : item.value;
        } catch(e) { formatted[item.key] = item.value; }
      });
      setStoreSettings(formatted);
    }
  };

  const fetchChats = async () => {
    const { data, error } = await supabase.from('chat_messages').select('*').order('id', { ascending: true });
    if (!error && data) {
      const history = {};
      data.forEach(msg => {
        if (!history[msg.user_id]) history[msg.user_id] = [];
        history[msg.user_id].push(msg);
      });
      setChatHistory(history);
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      setProducts(await fetchData('products'));
      setCategories(await fetchData('categories'));
      setCart(await fetchData('carts'));
      setWishlist(await fetchData('wishlists'));
      setOrders(await fetchData('orders'));
      await fetchSettings();
      await fetchChats();
    };

    loadAll();

    const channel = supabase.channel('public_db_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, async () => setProducts(await fetchData('products')))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, async () => setCategories(await fetchData('categories')))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'carts' }, async () => setCart(await fetchData('carts')))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'wishlists' }, async () => setWishlist(await fetchData('wishlists')))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, async () => setOrders(await fetchData('orders')))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, async () => fetchSettings())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_messages' }, async () => fetchChats())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => { localStorage.setItem('momo_unread_customer', unreadCustomer); }, [unreadCustomer]);
  useEffect(() => { localStorage.setItem('momo_unread_admin', unreadAdmin); }, [unreadAdmin]);
  useEffect(() => { if (currentUser) localStorage.setItem('momo_user', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('momo_admin', JSON.stringify(isAdminLoggedIn)); }, [isAdminLoggedIn]);

  const addToCart = async (productId, quantity = 1) => {
    const userId = currentUser.id;
    const existing = cart.find(c => String(c.product_id) === String(productId) && String(c.user_id) === String(userId));
    
    if (existing) {
      const newQty = existing.quantity + quantity;
      await supabase.from('carts').update({ quantity: newQty }).eq('id', existing.id);
    } else {
      await supabase.from('carts').insert({
        id: new Date().getTime(),
        user_id: userId,
        product_id: productId,
        quantity
      });
    }
    setCart(await fetchData('carts'));
  };

  const updateCartQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) newQuantity = 1;
    await supabase.from('carts').update({ quantity: newQuantity }).eq('id', cartItemId);
    setCart(await fetchData('carts'));
  };

  const removeFromCart = async (cartItemId) => {
    await supabase.from('carts').delete().eq('id', cartItemId);
    setCart(await fetchData('carts'));
  };

  const toggleWishlist = async (productId) => {
    const userId = currentUser?.id || 1;
    const existing = wishlist.find(w => String(w.product_id) === String(productId) && String(w.user_id) === String(userId));
    
    if (existing) {
      await supabase.from('wishlists').delete().eq('id', existing.id);
    } else {
      await supabase.from('wishlists').insert({
        id: new Date().getTime(),
        user_id: userId,
        product_id: productId
      });
    }
    setWishlist(await fetchData('wishlists'));
  };

  const checkoutOrder = async (orderData) => {
    const userCart = cart.filter(c => String(c.user_id) === String(currentUser.id));
    const subtotal = userCart.reduce((sum, item) => {
       const product = products.find(p => String(p.id) === String(item.product_id));
       return sum + ((product?.price || 0) * item.quantity);
    }, 0);
    const shipping = 15000;
    
    const newOrder = {
        id: `INV-${new Date().getTime()}`,
        user_id: currentUser.id,
        date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
        status: 'Menunggu Pembayaran',
        total: subtotal + shipping,
        items: userCart.map(c => {
            const product = products.find(p => String(p.id) === String(c.product_id));
            return {
              productId: c.product_id,
              name: product?.name,
              price: product?.price,
              quantity: c.quantity,
              image: product?.image
            };
        })
    };

    await supabase.from('orders').insert(newOrder);
    
    // Hapus cart pengguna setelah checkout berhasil
    for(const item of userCart) {
      await supabase.from('carts').delete().eq('id', item.id);
    }
    
    setCart(await fetchData('carts'));
    setOrders(await fetchData('orders'));
    
    return newOrder;
  };

  const clearCart = async () => {
    const userCart = cart.filter(c => String(c.user_id) === String(currentUser.id));
    for(const item of userCart) {
      await supabase.from('carts').delete().eq('id', item.id);
    }
    setCart(await fetchData('carts'));
  };

  const sendMessage = async (userId, text, sender) => {
    await supabase.from('chat_messages').insert({
      id: new Date().getTime(),
      user_id: userId,
      text,
      sender,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    });
    
    await fetchChats();

    if (sender === 'customer') {
      setUnreadAdmin(prev => prev + 1);
      setTimeout(async () => {
        await supabase.from('chat_messages').insert({
          id: new Date().getTime() + 1,
          user_id: userId,
          text: "Halo kak! Pesanan dan pertanyaan kakak akan segera kami proses. Ada yang bisa dibantu lagi? 😊",
          sender: 'admin',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        });
        setUnreadCustomer(prev => prev + 1);
        await fetchChats();
      }, 1500);
    } else if (sender === 'admin') {
      setUnreadCustomer(prev => prev + 1);
    }
  };

  const clearUnreadCustomer = () => setUnreadCustomer(0);
  const clearUnreadAdmin = () => setUnreadAdmin(0);

  const adminLogin = (username, password) => {
    if (username.trim().toLowerCase() === 'admin' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => setIsAdminLoggedIn(false);

  const addProduct = async (product) => {
    await supabase.from('products').insert({ ...product, id: new Date().getTime() });
  };
  const editProduct = async (id, updated) => {
    await supabase.from('products').update(updated).eq('id', id);
  };
  const deleteProduct = async (id) => {
    await supabase.from('products').delete().eq('id', id);
  };

  const addCategory = async (category) => {
    await supabase.from('categories').insert({ ...category, id: new Date().getTime() });
  };
  const editCategory = async (id, updated) => {
    await supabase.from('categories').update(updated).eq('id', id);
  };
  const deleteCategory = async (id) => {
    await supabase.from('categories').delete().eq('id', id);
  };

  const updateSettings = async (newSettings) => {
    const upserts = Object.entries(newSettings).map(([key, value]) => ({
      key, 
      value: JSON.stringify(value) // store as JSON string in jsonb column, or just raw value
    }));
    // Try to perform upsert, but Supabase SDK .upsert takes an array of rows
    await supabase.from('settings').upsert(upserts, { onConflict: 'key' });
  };

  // Helper mappings for backward compatibility of UI
  const mappedCart = cart.filter(c => String(c.user_id) === String(currentUser.id)).map(c => ({
    ...c,
    product: products.find(p => String(p.id) === String(c.product_id)),
    productId: c.product_id // legacy UI mapping
  })).filter(c => c.product !== undefined);

  const mappedWishlist = wishlist.filter(w => String(w.user_id) === String(currentUser.id)).map(w => ({
    ...w,
    product: products.find(p => String(p.id) === String(w.product_id)),
    productId: w.product_id // legacy UI mapping
  })).filter(w => w.product !== undefined);

  return (
    <ShopContext.Provider value={{
      products,
      cart: mappedCart,
      wishlist: mappedWishlist,
      orders, chatHistory, storeSettings, categories, isAdminLoggedIn, currentUser,
      unreadCustomer, unreadAdmin, clearUnreadCustomer, clearUnreadAdmin,
      setCurrentUser, addToCart, updateCartQuantity, removeFromCart, toggleWishlist, checkoutOrder, clearCart, sendMessage,
      adminLogin, adminLogout, addProduct, editProduct, deleteProduct, addCategory, editCategory, deleteCategory, updateSettings
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
