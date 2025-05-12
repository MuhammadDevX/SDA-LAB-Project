export default function GoalList({ goals, onUpdate }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Goals</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ padding: 8 }}>Name</th>
            <th style={{ padding: 8 }}>Target</th>
            <th style={{ padding: 8 }}>Current</th>
            <th style={{ padding: 8 }}>Deadline</th>
            <th style={{ padding: 8 }}>Progress</th>
            <th style={{ padding: 8 }}>Update</th>
          </tr>
        </thead>
        <tbody>
          {goals.map(goal => {
            const progress = Math.min(100, (goal.current_amount / goal.target_amount) * 100);
            return (
              <tr key={goal.id}>
                <td style={{ padding: 8 }}>{goal.name}</td>
                <td style={{ padding: 8 }}>${goal.target_amount}</td>
                <td style={{ padding: 8 }}>${goal.current_amount}</td>
                <td style={{ padding: 8 }}>{goal.deadline}</td>
                <td style={{ padding: 8, width: 150 }}>
                  <div style={{ background: '#e2e8f0', borderRadius: 4, height: 16, width: '100%' }}>
                    <div style={{ width: `${progress}%`, background: '#38b2ac', height: 16, borderRadius: 4 }}></div>
                  </div>
                  <span style={{ fontSize: 12 }}>{progress.toFixed(1)}%</span>
                </td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => onUpdate(goal.id, 100)} style={{ padding: '4px 10px', background: '#3182ce', color: '#fff', border: 'none', borderRadius: 4, fontSize: 12 }}>+ $100</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
} 