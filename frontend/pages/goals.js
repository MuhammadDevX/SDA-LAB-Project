import { useState, useEffect } from 'react';
import GoalList from '../components/GoalList';
import AddGoalForm from '../components/AddGoalForm';
import { apiGet, apiPost, apiPatch } from '../utils/api';

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function fetchGoals() {
      setLoading(true);
      setError(null);
      try {
        const data = await apiGet('/api/goals/');
        setGoals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchGoals();
  }, [success]);

  const handleAdd = async (goal) => {
    setError(null);
    setSuccess(null);
    try {
      const res = await apiPost('/api/goals/', goal);
      setGoals([{ ...goal, id: res.id, current_amount: 0 }, ...goals]);
      setSuccess('Goal added successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, amount) => {
    setError(null);
    setSuccess(null);
    try {
      const res = await apiPatch(`/api/goals/${id}`, { amount });
      setGoals(goals.map(g => g.id === id ? { ...g, current_amount: res.current_amount } : g));
      setSuccess('Goal updated!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ background: '#f4f6fa', minHeight: '100vh', padding: '2.5rem 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 24, color: '#0f172a', letterSpacing: 0.5 }}>Goals</h1>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: '2rem', marginBottom: '2rem' }}>
          <AddGoalForm onAdd={handleAdd} />
        </div>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: '2rem' }}>
          <GoalList goals={goals} onUpdate={handleUpdate} />
        </div>
        {loading && <p style={{ textAlign: 'center', color: '#38bdf8', marginTop: 32 }}>Loading...</p>}
        {error && <p style={{ textAlign: 'center', color: '#e11d48', marginTop: 32 }}>{error}</p>}
        {success && <p style={{ textAlign: 'center', color: '#059669', fontWeight: 500, marginTop: 32 }}>{success}</p>}
      </div>
    </div>
  );
} 