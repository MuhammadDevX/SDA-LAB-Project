import { useState, useEffect } from 'react';

const categories = ['income', 'dining', 'shopping', 'investment', 'savings'];

export default function AddTransactionForm({ onAdd, accounts }) {
  const [form, setForm] = useState({
    amount: '',
    category: 'income',
    description: '',
    date: new Date().toISOString().slice(0, 10),
    account_id: accounts && accounts.length > 0 ? accounts[0].id : '',
  });

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setForm(f => ({ ...f, account_id: accounts[0].id }));
    }
  }, [accounts]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.amount || !form.description || !form.account_id) return;
    onAdd({ ...form, amount: Number(form.amount), account_id: Number(form.account_id) });
    setForm({ ...form, amount: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <input name="date" type="date" value={form.date} onChange={handleChange} required style={{ padding: 6 }} />
      <input name="description" type="text" placeholder="Description" value={form.description} onChange={handleChange} required style={{ padding: 6 }} />
      <select name="category" value={form.category} onChange={handleChange} style={{ padding: 6 }}>
        {categories.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
      </select>
      <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required style={{ padding: 6, width: 100 }} />
      {accounts && accounts.length > 0 && (
        <select name="account_id" value={form.account_id} onChange={handleChange} style={{ padding: 6 }}>
          {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name}</option>)}
        </select>
      )}
      <button type="submit" style={{ padding: '6px 16px', background: '#3182ce', color: '#fff', border: 'none', borderRadius: 4 }}>Add</button>
    </form>
  );
} 