export default function MealLog() {
    const meals = [
      { id: 1, name: "Oats & Milk", calories: 440, protein: 12 },
      { id: 2, name: "Chicken & Rice", calories: 600, protein: 45 },
      { id: 3, name: "Protein Shake", calories: 200, protein: 25 },
    ];
  
    return (
      <div className="h-full overflow-y-auto">
        <table className="w-full text-left border">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="p-2 border">Meal</th>
              <th className="p-2 border">Calories</th>
              <th className="p-2 border">Protein (g)</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal.id}>
                <td className="p-2 border">{meal.name}</td>
                <td className="p-2 border">{meal.calories}</td>
                <td className="p-2 border">{meal.protein}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  