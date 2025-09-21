import Chatbot from "../components/Chatbot";
import MealEntry from "../components/MealEntry";
import ProgressChart from "../components/Dashboard/ProgressChart";
import MealLog from "../components/Dashboard/MealLog";

export default function Dashboard() {
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Left side: Split between Chatbot and Manual Entry */}
      <div className="w-1/2 bg-white flex flex-col">
        {/* Top left: Chatbot */}
        <div className="flex-1 flex flex-col border-b">
          <h2 className="text-xl font-bold text-center p-3 bg-blue-100 border-b">
            Chatbot
          </h2>
          <div className="flex-grow p-3 overflow-hidden">
            <div className="h-full">
              <Chatbot />
            </div>
          </div>
        </div>

        {/* Bottom left: Manual Food Entry */}
        <MealEntry />
      </div>

      {/* Right side: Charts & Table */}
      <div className="w-1/2 flex flex-col">
        {/* Top right: Chart */}
        <div className="flex-1 border-b bg-white p-3">
          <h2 className="text-xl font-bold text-center mb-3">Nutrition Progress</h2>
          <ProgressChart />
        </div>

        {/* Bottom right: Table */}
        <div className="flex-1 bg-white p-3">
          <h2 className="text-xl font-bold text-center mb-3">Meal Log</h2>
          <MealLog />
        </div>
      </div>
    </div>
  );
}
