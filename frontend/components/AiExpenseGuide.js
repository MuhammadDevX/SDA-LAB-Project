import { useEffect, useState } from 'react';
import { apiGet } from '../utils/api';
import { FaRobot } from 'react-icons/fa';

export default function AIExpenseGuide({ refreshKey }) {
  const [advice, setAdvice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAdvice() {
      setLoading(true);
      setError(null);
      try {
        const res = await apiGet('/api/ai/expense_guide');
        setAdvice(res.advice);
      } catch (err) {
        setError('AI agent unavailable');
      } finally {
        setLoading(false);
      }
    }
    fetchAdvice();
  }, [refreshKey]);

  return (
    <div style={{ background: '#0f172a', borderRadius: 12, padding: '1.5rem 1rem', marginTop: 32, color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <FaRobot size={22} style={{ marginRight: 8, color: '#38bdf8' }} />
        <span style={{ fontWeight: 600, fontSize: 16 }}>AI Expense Guide</span>
      </div>
      {loading ? <div style={{ color: '#38bdf8' }}>Analyzing...</div> : error ? <div style={{ color: '#f87171' }}>{error}</div> : (
        <ul style={{ paddingLeft: 18, margin: 0 }}>
          {advice.map((a, i) => <li key={i} style={{ marginBottom: 8, fontSize: 14 }}>{a}</li>)}
        </ul>
      )}
    </div>
  );
} 