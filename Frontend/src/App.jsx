import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Includes from "./pages/Includes";
import Minutes from "./pages/Minutes";
import Members from "./pages/Members";
import Transactions from "./pages/Transactions";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./components/Profile";
import { Toaster } from 'react-hot-toast';
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/forgotPassword";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";

function App() {

  const [auth, setAuth] = useState(false);
  const authCheckStarted = useRef(false);
  
 useEffect(() => {
    if (authCheckStarted.current) return;

    authCheckStarted.current = true;

    const checkUser = async () => {
      try {
        console.log("Checking authentication...");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/check`,
          {
            withCredentials: true,
          }
        );

        console.log("Auth Check:", res.data);

        setAuth(res.data.loggedIn === true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Auth check failed:",
            error.response?.status,
            error.response?.data
          );
        } else {
          console.error("Auth check error:", error);
        }

        setAuth(false);
      }
    };

    checkUser();
  }, []);


  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={auth ? <Dashboard auth={auth} setAuth={setAuth} /> : <Login setAuth={setAuth} />}
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/includes" element={<Includes />} />
          <Route path="/minutes" element={<Minutes />} />
          <Route path="/members" element={<Members />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/events" element={<Events />} />
          <Route path="/dashboard" element={<Dashboard auth={auth} setAuth={setAuth} />} />
          <Route path="/profile/:id" element={<Profile />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;