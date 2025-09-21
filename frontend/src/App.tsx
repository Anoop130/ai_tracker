import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <nav className="p-3 bg-gray-200 flex justify-between">
        <Link to="/" className="font-bold text-blue-600">AI Nutrition Coach</Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="text-blue-500">Dashboard</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<div className="p-6 text-center">Welcome!  </div>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
