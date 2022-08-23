import { Routes, Route } from "react-router-dom";

import "./App.css";
import "bulma/css/bulma.css";

import MainGame from "./components/MainGame";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainGame />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
