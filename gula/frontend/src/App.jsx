import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Menu from "./components/Menu";
import { UserProvider } from "./provider/UserProvider";
import Protected from "./components/Protected";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <Routes>
            <Route index element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="/" element={<Menu />}>
              <Route element={<Protected role="user" />}>
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/profile" element={<Profile />} />
              </Route>
              <Route exact path="/*" element={<h1>Pagina no encontrada</h1>} />
            </Route>
          </Routes>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
