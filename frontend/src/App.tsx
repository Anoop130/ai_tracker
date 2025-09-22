import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <nav className="p-3 bg-gray-200 flex justify-between">
        <Link to="/" className="font-bold text-blue-600">AI Nutrition Coach</Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="text-blue-500">Dashboard</Link>
          <Link to="/login" className="text-blue-500">Login</Link>
          <Link to="/signup" className="text-blue-500">Signup</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
