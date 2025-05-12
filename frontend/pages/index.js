import { useEffect, useState } from 'react';
import AccountSummary from '../components/AccountSummary';
import Recommendations from '../components/Recommendations';
import FinancialCharts from '../components/FinancialCharts';
import AccountList from '../components/AccountList';
import { apiGet, apiPost, apiDelete } from '../utils/api';

export default function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [accs, txs, recs] = await Promise.all([
          apiGet('/api/accounts/'),
          apiGet('/api/transactions/'),
          apiGet('/api/recommendations/'),
        ]);
        setAccounts(accs);
        setTransactions(txs);
        setRecommendations(recs.recommendations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [success]);

  const handleAddAccount = async (acc) => {
    setError(null);
    setSuccess(null);
    try {
      const res = await apiPost('/api/accounts/', acc);
      setSuccess('Account added successfully!');
      setAccounts([res, ...accounts]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveAccount = async (accountId) => {
    setError(null);
    setSuccess(null);
    try {
      await apiDelete(`/api/accounts/${accountId}`);
      setSuccess('Account removed successfully!');
      // Refresh all data
      const [accs, txs, recs] = await Promise.all([
        apiGet('/api/accounts/'),
        apiGet('/api/transactions/'),
        apiGet('/api/recommendations/'),
      ]);
      setAccounts(accs);
      setTransactions(txs);
      setRecommendations(recs.recommendations);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', padding: '2.5rem 0' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)', borderRadius: 12, boxShadow: '0 2px 12px rgba(56,189,248,0.10)', padding: '1.2rem 2rem', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ fontSize: 28, color: '#fff', marginRight: 10 }}>🤖</span>
          <div style={{ color: '#fff', flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 2 }}>Need help? Ask our AI Assistant!</div>
            <div style={{ fontSize: 14, opacity: 0.92 }}>Click the glowing chat button at the bottom right to get personalized financial advice and insights.</div>
          </div>
        </div>
        <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 24, color: 'var(--color-heading)', letterSpacing: 0.5 }}>Dashboard</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '50rem', gap: '2.5rem' }}>
            <div className="card">
              <AccountList accounts={accounts} onAdd={handleAddAccount} onRemove={handleRemoveAccount} />
              <AccountSummary accounts={accounts} />
            </div>
        
            <div className="card">
              <FinancialCharts transactions={transactions} />
            </div>
            <div className="card">
              <Recommendations recommendations={recommendations} />
            </div>
        </div>
        {loading && <p style={{ textAlign: 'center', color: 'var(--color-primary)', marginTop: 32 }}>Loading...</p>}
        {error && <p style={{ textAlign: 'center', color: 'var(--color-error)', marginTop: 32 }}>{error}</p>}
        {success && <p style={{ textAlign: 'center', color: 'var(--color-success)', fontWeight: 500, marginTop: 32 }}>{success}</p>}
      </div>
    </div>
  );
} 