import { createContext, useState, useEffect } from 'react';
import dbData from '../../db.json';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem('momo_products');
      return savedProducts ? JSON.parse(savedProducts) : dbData.products || [];
    } catch (e) {
      return dbData.products || [];
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('momo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('momo_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('momo_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [chatHistory, setChatHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('momo_chat');
      const parsed = saved ? JSON.parse(saved) : null;
      // Membuang riwayat lama yang berbentuk Array berhubung strukturnya Object sekarang
      if (parsed && !Array.isArray(parsed)) return parsed;
    } catch (e) {}
    
    // Obrolan default
    return {
      [dbData.users[0].id]: [{
        id: new Date().getTime(),
        text: "Halo kak 👋 Ada yang bisa kami bantu hari ini?",
        sender: 'admin',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }]
    };
  });

  const [unreadCustomer, setUnreadCustomer] = useState(() => {
    try {
      return Number(localStorage.getItem('momo_unread_customer')) || 0;
    } catch (e) { return 0; }
  });

  const [unreadAdmin, setUnreadAdmin] = useState(() => {
    try {
      return Number(localStorage.getItem('momo_unread_admin')) || 0;
    } catch (e) { return 0; }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      const saved = localStorage.getItem('momo_admin');
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
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

  const defaultCategories = [
    { id: 1, name: 'Keychain', icon: '🎀' },
    { id: 2, name: 'Tote Bag', icon: '👜' },
    { id: 3, name: 'Case HP', icon: '📱' },
    { id: 4, name: 'Sticker', icon: '✨' },
    { id: 5, name: 'Boneka', icon: '🧸' },
    { id: 6, name: 'Gelang', icon: '💎' },
    { id: 7, name: 'Kalung', icon: '🌷' },
    { id: 8, name: 'Scrunchie', icon: '🎀' }
  ];

  const [storeSettings, setStoreSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('momo_settings');
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch(e) {
      return defaultSettings;
    }
  });

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('momo_categories');
      return saved ? JSON.parse(saved) : defaultCategories;
    } catch(e) {
      return defaultCategories;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('momo_user');
      return saved ? JSON.parse(saved) : dbData.users[0];
    } catch(e) {
      return dbData.users[0];
    }
  });

  useEffect(() => {
    // Listen to storage changes for cross-tab synchronization
    const handleStorageChange = (e) => {
      try {
        if (e.key === 'momo_products' && e.newValue) setProducts(JSON.parse(e.newValue));
        if (e.key === 'momo_cart' && e.newValue) setCart(JSON.parse(e.newValue));
        if (e.key === 'momo_wishlist' && e.newValue) setWishlist(JSON.parse(e.newValue));
        if (e.key === 'momo_settings' && e.newValue) setStoreSettings(JSON.parse(e.newValue));
        if (e.key === 'momo_categories' && e.newValue) setCategories(JSON.parse(e.newValue));
        if (e.key === 'momo_chat' && e.newValue) setChatHistory(JSON.parse(e.newValue));
        if (e.key === 'momo_unread_customer' && e.newValue) setUnreadCustomer(Number(e.newValue));
        if (e.key === 'momo_unread_admin' && e.newValue) setUnreadAdmin(Number(e.newValue));
        if (e.key === 'momo_orders' && e.newValue) setOrders(JSON.parse(e.newValue));
      } catch (err) {
        console.error("Error parsing storage change", err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => { localStorage.setItem('momo_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('momo_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('momo_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('momo_chat', JSON.stringify(chatHistory)); }, [chatHistory]);
  useEffect(() => { localStorage.setItem('momo_unread_customer', unreadCustomer); }, [unreadCustomer]);
  useEffect(() => { localStorage.setItem('momo_unread_admin', unreadAdmin); }, [unreadAdmin]);
  useEffect(() => { if (currentUser) localStorage.setItem('momo_user', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('momo_settings', JSON.stringify(storeSettings)); }, [storeSettings]);
  useEffect(() => { localStorage.setItem('momo_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { 
    try {
      localStorage.setItem('momo_products', JSON.stringify(products)); 
    } catch (e) {
      console.error("Failed to save momo_products to localStorage. Data might be too large.", e);
    }
  }, [products]);
  useEffect(() => { localStorage.setItem('momo_admin', JSON.stringify(isAdminLoggedIn)); }, [isAdminLoggedIn]);

  const addToCart = (productId, quantity = 1) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(prevCart => {
      const existing = prevCart.find(c => c.productId === productId);
      if (existing) {
        return prevCart.map(c => 
          c.productId === productId ? { ...c, quantity: c.quantity + quantity } : c
        );
      }
      return [...prevCart, { 
        id: new Date().getTime(), 
        userId: currentUser.id, 
        productId, 
        quantity, 
        product 
      }];
    });
  };

  const updateCartQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) newQuantity = 1;
    setCart(prevCart => prevCart.map(c => 
      c.id === cartItemId ? { ...c, quantity: newQuantity } : c
    ));
  };

  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(c => c.id !== cartItemId));
  };

  const toggleWishlist = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setWishlist(prev => {
      const existing = prev.find(w => w.productId === productId);
      if (existing) {
        return prev.filter(w => w.id !== existing.id);
      }
      return [...prev, { 
        id: new Date().getTime(), 
        userId: currentUser.id, 
        productId, 
        product 
      }];
    });
  };

  const checkoutOrder = (orderData) => {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shipping = 15000;
    
    const newOrder = {
        ...orderData,
        userId: currentUser.id,
        date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
        status: 'Menunggu Pembayaran',
        id: `INV-${new Date().getTime()}`,
        total: subtotal + shipping,
        items: cart.map(c => ({
            productId: c.productId,
            name: c.product.name,
            price: c.product.price,
            quantity: c.quantity,
            image: c.product.image
        }))
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const clearCart = () => setCart([]);

  const sendMessage = (userId, text, sender) => {
    const newMsg = {
      id: new Date().getTime(),
      text,
      sender, 
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory(prev => ({
      ...prev,
      [userId]: [...(prev[userId] || []), newMsg]
    }));

    if (sender === 'customer') {
      setUnreadAdmin(prev => prev + 1);
      setTimeout(() => {
        setChatHistory(prev => ({
          ...prev,
          [userId]: [...(prev[userId] || []), {
            id: new Date().getTime() + 1,
            text: "Halo kak! Pesanan dan pertanyaan kakak akan segera kami proses. Ada yang bisa dibantu lagi? 😊",
            sender: 'admin',
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
          }]
        }));
        setUnreadCustomer(prev => prev + 1);
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

  const addProduct = (product) => setProducts(prev => [{ ...product, id: new Date().getTime() }, ...prev]);
  const editProduct = (id, updated) => setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  const addCategory = (category) => setCategories(prev => [...prev, { ...category, id: new Date().getTime() }]);
  const editCategory = (id, updated) => setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  const deleteCategory = (id) => setCategories(prev => prev.filter(c => c.id !== id));

  const updateSettings = (newSettings) => setStoreSettings(prev => ({ ...prev, ...newSettings }));

  return (
    <ShopContext.Provider value={{
      products,
      cart: cart.map(c => ({ ...c, product: products.find(p => p.id === c.productId) || c.product })),
      wishlist: wishlist.map(w => ({ ...w, product: products.find(p => p.id === w.productId) || w.product })),
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
