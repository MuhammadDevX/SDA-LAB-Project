export default function AccountSummary({ accounts }) {
  const total = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>Account Summary</h2>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {accounts.map(acc => (
          <div key={acc.id} style={{ background: '#f1f5f9', padding: '1rem 2rem', borderRadius: 8, minWidth: 150 }}>
            <h3>{acc.name}</h3>
            <p style={{ fontSize: 20, fontWeight: 600 }}>${acc.balance.toLocaleString()}</p>
            <span style={{ color: '#888' }}>{acc.type.charAt(0).toUpperCase() + acc.type.slice(1)}</span>
          </div>
        ))}
        <div style={{ background: '#e6fffa', padding: '1rem 2rem', borderRadius: 8, minWidth: 150 }}>
          <h3>Total</h3>
          <p style={{ fontSize: 20, fontWeight: 600 }}>${total.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
} 