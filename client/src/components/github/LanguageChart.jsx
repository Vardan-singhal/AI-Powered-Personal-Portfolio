import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = [
  '#EAB308',
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
        h-[420px]
        shadow-lg
      "
    >
      <h3 className="font-semibold text-yellow-300 mb-4">
        Language Distribution
      </h3>

      <div className="h-[340px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
              cx="35%"
              cy="50%"
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                />
              ))}
            </Pie>

            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              wrapperStyle={{
                color: '#a1a1aa',
                fontSize: '13px',
                paddingLeft: '20px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}