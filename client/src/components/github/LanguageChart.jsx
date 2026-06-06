import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
const COLORS = ['#6366f1','#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6','#ef4444','#14b8a6'];
export default function LanguageChart({ languages }) {
  const data = Object.entries(languages).map(([name, value]) => ({ name, value }));
  return (
    <div className="card h-80">
      <h3 className="font-semibold mb-3">Language Distribution</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
