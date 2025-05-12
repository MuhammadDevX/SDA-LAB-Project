import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFE', '#FF6699'];

function getSpendingByCategory(transactions) {
  const spending = {};
  transactions.forEach(t => {
    if (t.amount < 0) {
      spending[t.category] = (spending[t.category] || 0) + Math.abs(t.amount);
    }
  });
  return Object.entries(spending).map(([category, value]) => ({ name: category, value }));
}

function getIncomeVsExpenses(transactions) {
  // Group by date
  const byDate = {};
  transactions.forEach(t => {
    if (!byDate[t.date]) byDate[t.date] = { date: t.date, income: 0, expense: 0 };
    if (t.amount > 0) byDate[t.date].income += t.amount;
    else byDate[t.date].expense += Math.abs(t.amount);
  });
  // Sort by date
  return Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date));
}

export default function FinancialCharts({ transactions }) {
  const pieData = getSpendingByCategory(transactions);
  const lineData = getIncomeVsExpenses(transactions);
  return (
    <div style={{ margin: '1.2rem 0', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 220 }}>
        <h3 style={{ fontSize: 18, marginBottom: 10 }}>Spending by Category</h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
              {pieData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ flex: 2, minWidth: 260 }}>
        <h3 style={{ fontSize: 18, marginBottom: 10 }}>Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={lineData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#2563eb" name="Income" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="expense" stroke="#e11d48" name="Expense" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 