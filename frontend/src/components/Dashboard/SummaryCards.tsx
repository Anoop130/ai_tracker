export default function SummaryCards() {
    const data = {
      calories: { value: 1450, goal: 1800 },
      protein: { value: 95, goal: 120 },
      carbs: { value: 200, goal: 250 },
      fat: { value: 50, goal: 60 },
    };
  
    return (
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(data).map(([key, { value, goal }]) => (
          <div
            key={key}
            className="bg-white shadow-md p-4 rounded-lg text-center border"
          >
            <h3 className="text-gray-600 capitalize">{key}</h3>
            <p className="text-xl font-bold">
              {value}/{goal}
            </p>
          </div>
        ))}
      </div>
    );
  }
  