export default function TransactionList({ transactions }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Transaction History</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ padding: 8 }}>Date</th>
            <th style={{ padding: 8 }}>Description</th>
            <th style={{ padding: 8 }}>Category</th>
            <th style={{ padding: 8 }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td style={{ padding: 8 }}>{tx.date}</td>
              <td style={{ padding: 8 }}>{tx.description}</td>
              <td style={{ padding: 8 }}>{tx.category}</td>
              <td style={{ padding: 8, color: tx.amount < 0 ? '#e53e3e' : '#38a169' }}>
                {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 