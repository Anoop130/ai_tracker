import { useState, useEffect } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { apiService, type MealLog } from "../../services/api";

export default function ProgressChart() {
  const [mealLogs, setMealLogs] = useState<MealLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMealLogs();
  }, []);

  const fetchMealLogs = async () => {
    try {
      const data = await apiService.getMealLogs();
      setMealLogs(data);
    } catch (error) {
      console.error('Error fetching meal logs for chart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals from meal logs
  const totals = mealLogs.reduce((acc, log) => {
    acc.calories += log.calories;
    acc.protein += log.protein;
    acc.carbs += log.carbs;
    acc.fiber += log.fiber;
    acc.fat += log.fat;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fiber: 0, fat: 0 });

  // Daily goals (you can make these configurable)
  const goals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fiber: 25,
    fat: 65
  };

  const chartData = [
    { name: "Calories", consumed: totals.calories, goal: goals.calories },
    { name: "Protein", consumed: totals.protein, goal: goals.protein },
    { name: "Carbs", consumed: totals.carbs, goal: goals.carbs },
    { name: "Fiber", consumed: totals.fiber, goal: goals.fiber },
    { name: "Fat", consumed: totals.fat, goal: goals.fat },
  ];

  const pieData = [
    { name: "Protein", value: totals.protein, color: "#3b82f6" },
    { name: "Carbs", value: totals.carbs, color: "#10b981" },
    { name: "Fat", value: totals.fat, color: "#f59e0b" },
  ];

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500">Loading chart data...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-sm text-blue-600">Total Calories</div>
          <div className="text-2xl font-bold text-blue-800">{totals.calories}</div>
          <div className="text-xs text-blue-600">Goal: {goals.calories}</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-sm text-green-600">Total Protein</div>
          <div className="text-2xl font-bold text-green-800">{totals.protein}g</div>
          <div className="text-xs text-green-600">Goal: {goals.protein}g</div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <div className="h-64">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Daily Progress</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="consumed" fill="#3b82f6" name="Consumed" />
              <Bar dataKey="goal" fill="#d1d5db" name="Goal" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="h-64">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Macro Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
