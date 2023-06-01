import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./views/home";
import Dashboard from "./views/dashboard";
import Landing from "./views/landing";
import Login from "./views/login";
import Signup from "./views/signup";
import NotFound from "./views/not-found";

import { UserCtx } from "./context/UserCtx";
import ProtectRoute from "./components/ProtectRoute";

const App = () => {
  const { isLogged } = useContext(UserCtx);

  return (
    <Routes>
      {/* App */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      {/* Access protect to home */}
      <Route
        element={<ProtectRoute isAllowed={!isLogged} redirectTo="/landing" />}>
        <Route path="home/*" element={<Home />} />
        <Route path="dashboard/*" element={<Dashboard />} />
      </Route>
      {/* Deny access if logged in */}
      <Route element={<ProtectRoute isAllowed={isLogged} redirectTo="/home" />}>
        <Route path="landing/*" element={<Landing />} />
        <Route path="login/*" element={<Login />} />
        <Route path="signup/*" element={<Signup />} />
      </Route>
      <Route path="not-found/*" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
