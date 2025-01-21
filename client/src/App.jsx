import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signUp";
import Home from "./pages/home";
import ProtectLogin from "./components/privateRoutes/protectLogin";
import PrivateRoute from "./components/privateRoutes";
import ForgotPassword from "./pages/auth/fogotPassword/forgotPassword";
import ResetPassword from "./pages/auth/fogotPassword/resetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectLogin />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
