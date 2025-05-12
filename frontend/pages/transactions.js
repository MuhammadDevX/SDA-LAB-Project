import { useState, useEffect } from 'react';
import TransactionList from '../components/TransactionList';
import AddTransactionForm from '../components/AddTransactionForm';
import { apiGet, apiPost } from '../utils/api';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [txs, accs] = await Promise.all([
          apiGet('/api/transactions/'),
          apiGet('/api/accounts/'),
        ]);
        setTransactions(txs);
        setAccounts(accs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [success]);

  const handleAdd = async (tx) => {
    setError(null);
    setSuccess(null);
    try {
      const res = await apiPost('/api/transactions/', tx);
      const newTx = { ...tx, id: res.id };
      setTransactions([newTx, ...transactions]);
      setSuccess('Transaction added successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ background: '#f4f6fa', minHeight: '100vh', padding: '2.5rem 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 24, color: '#0f172a', letterSpacing: 0.5 }}>Transactions</h1>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: '2rem', marginBottom: '2rem' }}>
          {accounts.length === 0 ? (
            <div style={{ color: '#888', margin: '2rem 0', fontSize: 18, fontWeight: 500 }}>
              Please add an account before adding transactions.
            </div>
          ) : (
            <AddTransactionForm onAdd={handleAdd} accounts={accounts} />
          )}
        </div>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: '2rem' }}>
          <TransactionList transactions={transactions} />
        </div>
        {loading && <p style={{ textAlign: 'center', color: '#38bdf8', marginTop: 32 }}>Loading...</p>}
        {error && <p style={{ textAlign: 'center', color: '#e11d48', marginTop: 32 }}>{error}</p>}
        {success && <p style={{ textAlign: 'center', color: '#059669', fontWeight: 500, marginTop: 32 }}>{success}</p>}
      </div>
    </div>
  );
} 