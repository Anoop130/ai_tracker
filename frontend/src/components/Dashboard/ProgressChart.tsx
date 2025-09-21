import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function ProgressChart() {
  const data = [
    { name: "Calories", value: 1450, goal: 1800 },
    { name: "Protein", value: 95, goal: 120 },
    { name: "Carbs", value: 200, goal: 250 },
    { name: "Fat", value: 50, goal: 60 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#3b82f6" />
        <Bar dataKey="goal" fill="#d1d5db" />
      </BarChart>
    </ResponsiveContainer>
  );
}
