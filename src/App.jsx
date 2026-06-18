import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import ShopContext, { ShopProvider } from './context/ShopContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Chat from './pages/Chat';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

// Komponen pelindung untuk rute admin
function AdminRoute({ children }) {
  const { isAdminLoggedIn } = useContext(ShopContext);
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

// Wrapper untuk conditional rendering layout
function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: isAdminRoute ? 'row' : 'column', minHeight: '100vh' }}>
      {!isAdminRoute && <Header />}
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/chat" element={<Chat />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          {/* Pindahkan rute default ke dashboard jika admin */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </main>
      
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ShopProvider>
      <Router>
        <AppContent />
      </Router>
    </ShopProvider>
  );
}

export default App;
