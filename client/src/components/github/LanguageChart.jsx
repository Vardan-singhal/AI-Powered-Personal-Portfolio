import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = [
  '#EAB308', // Gold
  '#F59E0B',
  '#FBBF24',
  '#D97706',
  '#CA8A04',
  '#A16207',
  '#FCD34D',
  '#92400E',
];

export default function LanguageChart({ languages }) {
  const data = Object.entries(languages || {}).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <div
      className="
        rounded-2xl
        border
        border-yellow-500/15
        bg-neutral-950
        p-6
        h-80
        shadow-lg
      "
    >
      <h3 className="font-semibold text-yellow-300 mb-4">
        Language Distribution
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={90}
            paddingAngle={2}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i % COLORS.length]}
              />
            ))}
          </Pie>

          <Legend
            wrapperStyle={{
              color: '#a1a1aa',
              fontSize: '12px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}