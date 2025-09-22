const API_BASE_URL = 'http://127.0.0.1:8000';

export interface MealLog {
  id?: number;
  food: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fiber: number;
  fat: number;
  user?: {
    name: string;
    email: string;
  };
}

class ApiService {
  // Meal Log CRUD operations
  async getMealLogs(): Promise<MealLog[]> {
    const response = await fetch(`${API_BASE_URL}/meal_log/`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch meal logs');
    }

    return response.json();
  }

  async createMealLog(mealLog: Omit<MealLog, 'id' | 'user'>): Promise<MealLog> {
    console.log('🚀 Sending meal log data:', mealLog);
    console.log('🌐 API URL:', `${API_BASE_URL}/meal_log/`);
    
    try {
      const response = await fetch(`${API_BASE_URL}/meal_log/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealLog),
      });

      console.log('📡 Response status:', response.status);
      console.log('✅ Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(`Failed to create meal log: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('🎉 Success! Created meal log:', result);
      return result;
    } catch (error) {
      console.error('💥 Network or parsing error:', error);
      throw error;
    }
  }

  async updateMealLog(id: number, mealLog: Omit<MealLog, 'id' | 'user'>): Promise<MealLog> {
    const response = await fetch(`${API_BASE_URL}/meal_log/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mealLog),
    });

    if (!response.ok) {
      throw new Error('Failed to update meal log');
    }

    return response.json();
  }

  async deleteMealLog(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/meal_log/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete meal log');
    }
  }
}

export const apiService = new ApiService();
