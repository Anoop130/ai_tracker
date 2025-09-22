import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              AI Nutrition Coach
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Track your meals, monitor your nutrition, and get personalized dietary advice with our AI-powered nutrition coach.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link
                to="/signup"
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl mb-4">��</div>
              <h3 className="text-xl font-semibold mb-2">Track Meals</h3>
              <p className="text-gray-600">Log your daily meals and track calories, protein, carbs, and more.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl mb-4">��</div>
              <h3 className="text-xl font-semibold mb-2">Monitor Progress</h3>
              <p className="text-gray-600">Visualize your nutrition trends and track your health goals.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl mb-4">��</div>
              <h3 className="text-xl font-semibold mb-2">AI Coach</h3>
              <p className="text-gray-600">Get personalized nutrition advice and meal recommendations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
