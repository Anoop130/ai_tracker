import { useState } from "react";
import { apiService } from "../services/api";
import InputField from "./InputField";

interface MealEntryProps {
  onMealAdded?: () => void;
}

export default function MealEntry({ onMealAdded }: MealEntryProps) {
  const [foodEntry, setFoodEntry] = useState({
    food: "",
    servings: "",
    calories: "",
    protein: "",
    carbs: "",
    fiber: "",
    fat: ""
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFoodEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(" Form submitted with data:", foodEntry);
    setLoading(true);
    
    try {
      const mealLogData = {
        food: foodEntry.food,
        servings: parseFloat(foodEntry.servings),
        calories: parseFloat(foodEntry.calories),
        protein: parseFloat(foodEntry.protein),
        carbs: parseFloat(foodEntry.carbs),
        fiber: parseFloat(foodEntry.fiber),
        fat: parseFloat(foodEntry.fat)
      };

      console.log("🔄 Calling API service with:", mealLogData);
      await apiService.createMealLog(mealLogData);
      
      // Reset form
      setFoodEntry({
        food: "",
        servings: "",
        calories: "",
        protein: "",
        carbs: "",
        fiber: "",
        fat: ""
      });
      
      alert("Food logged successfully!");
      
      // Notify parent component
      onMealAdded?.();
    } catch (error) {
      console.error('Error logging food:', error);
      alert("Failed to log food. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Define the form fields configuration
  const formFields = [
    {
      name: "food",
      label: "Food Name",
      type: "text" as const,
      placeholder: "e.g., Grilled Chicken Breast",
      required: true,
      className: ""
    },
    {
      name: "servings",
      label: "Servings",
      type: "number" as const,
      placeholder: "1",
      required: true,
      step: 0.1,
      min: 0,
      className: ""
    },
    {
      name: "calories",
      label: "Calories",
      type: "number" as const,
      placeholder: "200",
      required: true,
      min: 0,
      className: "grid grid-cols-2 gap-3"
    },
    {
      name: "protein",
      label: "Protein (g)",
      type: "number" as const,
      placeholder: "25",
      required: true,
      min: 0,
      step: 0.1,
      className: "grid grid-cols-2 gap-3"
    },
    {
      name: "carbs",
      label: "Carbs (g)",
      type: "number" as const,
      placeholder: "15",
      required: true,
      min: 0,
      step: 0.1,
      className: "grid grid-cols-2 gap-3"
    },
    {
      name: "fiber",
      label: "Fiber (g)",
      type: "number" as const,
      placeholder: "2",
      required: true,
      min: 0,
      step: 0.1,
      className: "grid grid-cols-2 gap-3"
    },
    {
      name: "fat",
      label: "Fat (g)",
      type: "number" as const,
      placeholder: "8",
      required: true,
      min: 0,
      step: 0.1,
      className: ""
    }
  ];

  return (
    <div className="flex-1 flex flex-col">
      <h2 className="text-xl font-bold text-center p-3 bg-green-100 border-b">
        Manual Food Entry
      </h2>
      <div className="flex-grow p-3 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-3">
          {formFields.map((field) => (
            <InputField
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              value={foodEntry[field.name as keyof typeof foodEntry]}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              required={field.required}
              min={field.min}
              step={field.step}
              className={field.className}
            />
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging..." : "Log Food"}
          </button>
        </form>
      </div>
    </div>
  );
}