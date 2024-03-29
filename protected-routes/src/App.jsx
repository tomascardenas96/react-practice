import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/home";
import Analytics from "./pages/analytics";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserProvider";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<Login />} />
            <Route element={<ProtectedRoute role="user" />}>
              <Route path="/home" element={<Home />} />
              <Route path="/analytics" element={<Analytics />} />
            </Route>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}
export default App;
