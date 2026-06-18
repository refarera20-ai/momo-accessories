import { useState, useContext, useEffect, useRef } from 'react';
import { FiSend, FiArrowLeft, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ShopContext from '../context/ShopContext';

export default function Chat() {
  const navigate = useNavigate();
  const { chatHistory, sendMessage, currentUser, unreadCustomer, clearUnreadCustomer } = useContext(ShopContext);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (unreadCustomer > 0) {
      clearUnreadCustomer();
    }
  }, [chatHistory, unreadCustomer, clearUnreadCustomer]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(currentUser.id, inputText, 'customer');
    setInputText('');
  };

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px', minHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
      <button 
        onClick={() => navigate(-1)}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', marginBottom: '20px', fontWeight: 'bold', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem', width: 'max-content' }}
      >
        <FiArrowLeft /> Kembali
      </button>

      <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '600px', maxHeight: '70vh' }}>
        
        {/* Header Chat */}
        <div style={{ padding: '20px', backgroundColor: 'var(--color-pink-dark)', color: '#fff', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '45px', height: '45px', backgroundColor: 'var(--color-white)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <img src="https://ui-avatars.com/api/?name=Admin+Momo&background=FF85B3&color=fff" alt="Admin" style={{ width: '100%', height: '100%' }} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Admin Momo</h3>
            <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Online</span>
          </div>
        </div>

        {/* Bubble Messages */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: 'var(--color-gray-light)' }}>
          {(!chatHistory[currentUser.id] || chatHistory[currentUser.id].length === 0) ? (
            <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              <FiUser size={50} style={{ marginBottom: '10px', opacity: 0.5 }} />
              <p>Mulai percakapan dengan Admin Momo!</p>
              <p style={{ fontSize: '0.9rem' }}>Kami siap membantu Anda.</p>
            </div>
          ) : (
            chatHistory[currentUser.id].map((msg) => (
              <div key={msg.id} style={{
                alignSelf: msg.sender === 'customer' ? 'flex-end' : 'flex-start',
                maxWidth: '75%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  backgroundColor: msg.sender === 'customer' ? 'var(--color-pink-dark)' : 'var(--color-white)',
                  color: msg.sender === 'customer' ? '#fff' : 'var(--color-text-dark)',
                  padding: '12px 18px',
                  borderRadius: msg.sender === 'customer' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}>
                  {msg.text}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '5px', alignSelf: msg.sender === 'customer' ? 'flex-end' : 'flex-start' }}>
                  {msg.time}
                </span>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: '15px 20px', backgroundColor: 'var(--color-white)', borderTop: '1px solid var(--color-gray)' }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ketik pesan Anda di sini..."
              style={{ flex: 1, padding: '12px 20px', borderRadius: '30px', border: '1px solid var(--color-gray)', fontSize: '0.95rem' }}
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: inputText.trim() ? 'var(--color-pink-dark)' : 'var(--color-gray)',
                color: '#fff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputText.trim() ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.2s',
                boxShadow: inputText.trim() ? '0 4px 10px rgba(255, 133, 179, 0.4)' : 'none'
              }}
            >
              <FiSend size={20} style={{ marginLeft: '-2px' }} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
