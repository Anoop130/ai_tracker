import { useState, useEffect } from "react";
import { apiService, type MealLog } from "../../services/api";

export default function MealLog() {
  const [mealLogs, setMealLogs] = useState<MealLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMealLogs();
  }, []);

  const fetchMealLogs = async () => {
    try {
      setLoading(true);
      const data = await apiService.getMealLogs();
      setMealLogs(data);
      setError('');
    } catch (error) {
      console.error('Error fetching meal logs:', error);
      setError('Failed to load meal logs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this meal log?')) {
      try {
        await apiService.deleteMealLog(id);
        setMealLogs(mealLogs.filter(log => log.id !== id));
      } catch (error) {
        console.error('Error deleting meal log:', error);
        alert('Failed to delete meal log');
      }
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500">Loading meal logs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <table className="w-full text-left border">
        <thead className="sticky top-0 bg-gray-100">
          <tr>
            <th className="p-2 border">Food</th>
            <th className="p-2 border">Servings</th>
            <th className="p-2 border">Calories</th>
            <th className="p-2 border">Protein (g)</th>
            <th className="p-2 border">Carbs (g)</th>
            <th className="p-2 border">Fiber (g)</th>
            <th className="p-2 border">Fat (g)</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mealLogs.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50">
              <td className="p-2 border">{log.food}</td>
              <td className="p-2 border">{log.servings}</td>
              <td className="p-2 border">{log.calories}</td>
              <td className="p-2 border">{log.protein}</td>
              <td className="p-2 border">{log.carbs}</td>
              <td className="p-2 border">{log.fiber}</td>
              <td className="p-2 border">{log.fat}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(log.id!)}
                  className="text-red-600 hover:text-red-900 text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {mealLogs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No meal logs found. Add some meals to get started!
        </div>
      )}
    </div>
  );
}
  