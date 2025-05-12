import { useState } from 'react';

export default function AddGoalForm({ onAdd }) {
  const [form, setForm] = useState({
    name: '',
    target_amount: '',
    deadline: new Date().toISOString().slice(0, 10),
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.target_amount) return;
    onAdd({ ...form, target_amount: Number(form.target_amount) });
    setForm({ ...form, name: '', target_amount: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <input name="name" type="text" placeholder="Goal Name" value={form.name} onChange={handleChange} required style={{ padding: 6 }} />
      <input name="target_amount" type="number" placeholder="Target Amount" value={form.target_amount} onChange={handleChange} required style={{ padding: 6, width: 120 }} />
      <input name="deadline" type="date" value={form.deadline} onChange={handleChange} required style={{ padding: 6 }} />
      <button type="submit" style={{ padding: '6px 16px', background: '#38b2ac', color: '#fff', border: 'none', borderRadius: 4 }}>Add Goal</button>
    </form>
  );
} 