export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-pink)', padding: '30px 0', marginTop: '40px' }}>
      <div className="container" style={{ textAlign: 'center', color: 'var(--color-text-dark)' }}>
        <h3 style={{fontFamily: 'var(--font-heading)', color: 'var(--color-pink-dark)'}}>Momo Accessories</h3>
        <p style={{marginTop: '10px'}}>&copy; 2026 Momo Accessories. All rights reserved.</p>
      </div>
    </footer>
  );
}
