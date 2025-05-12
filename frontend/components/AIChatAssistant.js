import { useState, useRef, useEffect } from 'react';
import { apiPost } from '../utils/api';
import { FaRobot, FaPaperPlane, FaComments } from 'react-icons/fa';

export default function AIChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I am your AI finance assistant. Ask me anything about your expenses or goals.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { sender: 'user', text: input }]);
    setLoading(true);
    try {
      const res = await apiPost('/api/ai/chat', { message: input });
      setMessages(msgs => [...msgs, { sender: 'ai', text: res.reply }]);
    } catch {
      setMessages(msgs => [...msgs, { sender: 'ai', text: 'Sorry, I am currently unavailable.' }]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200 }}>
      {!open && (
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setOpen(true)}
            style={{
              background: 'var(--color-primary)',
              border: 'none',
              borderRadius: '50%',
              width: 56,
              height: 56,
              boxShadow: '0 2px 16px var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              animation: 'ai-pulse 1.5s infinite',
              position: 'relative',
            }}
            title="Ask our AI assistant"
          >
            <FaComments size={28} color="#fff" />
            <span style={{
              position: 'absolute',
              top: 6,
              right: 6,
              background: '#fff',
              color: 'var(--color-primary)',
              fontWeight: 700,
              fontSize: 11,
              borderRadius: 8,
              padding: '1px 7px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              letterSpacing: 0.5,
            }}>AI</span>
          </button>
          <style>{`
            @keyframes ai-pulse {
              0% { box-shadow: 0 0 0 0 var(--color-primary); }
              70% { box-shadow: 0 0 0 12px rgba(56,189,248,0.15); }
              100% { box-shadow: 0 0 0 0 var(--color-primary); }
            }
          `}</style>
        </div>
      )}
      {open && (
        <div style={{ width: 320, background: 'var(--color-card)', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.13)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
          <div style={{ background: 'var(--color-primary)', color: '#fff', padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}><FaRobot /> AI Assistant</span>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>&times;</button>
          </div>
          <div style={{ flex: 1, padding: '1rem', background: 'var(--color-bg)', maxHeight: 260, overflowY: 'auto' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: 10, display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  background: msg.sender === 'user' ? 'var(--color-primary)' : 'var(--color-card)',
                  color: msg.sender === 'user' ? '#fff' : 'var(--color-heading)',
                  borderRadius: 10,
                  padding: '7px 13px',
                  maxWidth: 200,
                  fontSize: 14,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                }}>{msg.text}</div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={sendMessage} style={{ display: 'flex', borderTop: '1px solid var(--color-border)', background: 'var(--color-card)' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me about your finances..."
              style={{ flex: 1, border: 'none', outline: 'none', padding: '0.7rem', fontSize: 14, background: 'var(--color-card)', color: 'var(--color-text)' }}
              disabled={loading}
            />
            <button type="submit" disabled={loading} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: 20, padding: '0 0.7rem', cursor: 'pointer' }}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
} 