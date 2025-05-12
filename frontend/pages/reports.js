import { useEffect, useState } from 'react';
import FinancialCharts from '../components/FinancialCharts';
import { apiGet } from '../utils/api';

export default function ReportsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReports() {
      setLoading(true);
      setError(null);
      try {
        const txs = await apiGet('/api/transactions/');
        setTransactions(txs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  return (
    <div style={{ background: '#f4f6fa', minHeight: '100vh', padding: '2.5rem 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 24, color: '#0f172a', letterSpacing: 0.5 }}>Reports</h1>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: '2rem' }}>
          <FinancialCharts transactions={transactions} />
        </div>
        {loading && <p style={{ textAlign: 'center', color: '#38bdf8', marginTop: 32 }}>Loading...</p>}
        {error && <p style={{ textAlign: 'center', color: '#e11d48', marginTop: 32 }}>{error}</p>}
      </div>
    </div>
  );
} 