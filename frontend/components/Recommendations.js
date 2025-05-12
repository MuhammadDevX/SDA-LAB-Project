export default function Recommendations({ recommendations }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Recommendations</h2>
      <ul>
        {recommendations.map((rec, idx) => (
          <li key={idx} style={{ marginBottom: 8 }}>{rec}</li>
        ))}
      </ul>
    </div>
  );
} 