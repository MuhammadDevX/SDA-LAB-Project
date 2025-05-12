import { useState } from 'react';

export default function AccountList({ accounts, onAdd, onRemove }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', balance: '', type: 'checking' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name) return;
    onAdd && onAdd({ ...form, balance: Number(form.balance) || 0 });
    setForm({ name: '', balance: '', type: 'checking' });
    setShowForm(false);
  };
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Accounts</h2>
        {onAdd && <button onClick={() => setShowForm(f => !f)} style={{ padding: '6px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4 }}>{showForm ? 'Cancel' : 'Add Account'}</button>}
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, margin: '1rem 0', alignItems: 'center' }}>
          <input name="name" type="text" placeholder="Account Name" value={form.name} onChange={handleChange} required style={{ padding: 6 }} />
          <input name="balance" type="number" placeholder="Initial Balance" value={form.balance} onChange={handleChange} style={{ padding: 6, width: 120 }} />
          <select name="type" value={form.type} onChange={handleChange} style={{ padding: 6 }}>
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
            <option value="investment">Investment</option>
          </select>
          <button type="submit" style={{ padding: '6px 16px', background: '#059669', color: '#fff', border: 'none', borderRadius: 4 }}>Add</button>
        </form>
      )}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {accounts.length === 0 && <p style={{ color: '#888' }}>No accounts yet.</p>}
        {accounts.map(acc => (
          <div key={acc.id} style={{ background: '#f1f5f9', padding: '1rem 2rem', borderRadius: 8, minWidth: 150, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', position: 'relative' }}>
            <h3 style={{ margin: 0 }}>{acc.name}</h3>
            <p style={{ fontSize: 20, fontWeight: 600, margin: '0.5rem 0' }}>${acc.balance.toLocaleString()}</p>
            <span style={{ color: '#2563eb', fontWeight: 500 }}>{acc.type.charAt(0).toUpperCase() + acc.type.slice(1)}</span>
            {onRemove && (
              <button
                onClick={() => onRemove(acc.id)}
                style={{ position: 'absolute', top: 10, right: 10, background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 10px', cursor: 'pointer' }}
                title="Remove Account"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 