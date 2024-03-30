import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Protected from "./components/Protected";
import Register from "./pages/Register";
import Shop from "./pages/Shop";

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route index element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route element={<Protected permission="user" />}>
              <Route exact path="/home" element={<Home />} />
              <Route exact path='/profile/:profilename' element={<Profile />} />
              <Route exact path='/commerce/:commerce' element={<Shop />} />
              {/* <Route exact path='/filter/:' element={<Shop />} /> */}
              <Route exact path="/*" element={<h1>Pagina no encontrada</h1>} />
            </Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
