import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signUp";
import Home from "./pages/home";
import ProtectLogin from "./components/privateRoutes/protectLogin";
import PrivateRoute from "./components/privateRoutes";
import Navbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectLogin />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<PrivateRoute />}>
          {/* <Navbar /> */}
          {/* <Route path="/nav" element={<Navbar />} />
          <Route path="/" element={<Home />} /> */}
          <Route
            path="/"
            element={
              <>
                <Navbar /> {/* Navbar is only displayed in private routes */}
                <Home />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
