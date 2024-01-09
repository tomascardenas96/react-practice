import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Analytics from "./pages/analytics";
import Dashboard from "./pages/dashboard";

import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import SesionButton from "./components/SesionButton";
function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <SesionButton/>
      </UserProvider>
    </>
  );
}
export default App;
