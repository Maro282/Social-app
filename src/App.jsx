import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayout from "./Pages/MainLayout/MainLayout";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Posts from "./Pages/Posts/Posts";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CounterContextProvider from "./Context/CounterContext";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import AuthContextProvider from "./Context/AuthContext";
import PostDetails from "./Pages/PostDetails/PostDetails";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Profile from "./Pages/Profile/Profile";
import { useOffline } from "./Hooks/useOffline";
import Offline from "./Components/InternetCheck/Offline";
import Online from "./Components/InternetCheck/Online";
import { useEffect, useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") == "true" ? true : false
  );
  const routes = createBrowserRouter([
    {
      path: "",
      element: (
        <MainLayout handleDarkMode={handleDarkMode} darkMode={darkMode} />
      ),
      children: [
        {
          path: "/home",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/about",
          element: (
            <ProtectedRoutes>
              <About />
            </ProtectedRoutes>
          ),
        },

        {
          index: true,
          path: "",
          element: (
            <ProtectedRoutes>
              <Posts />
            </ProtectedRoutes>
          ),
        },

        {
          path: "/profile",
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
        },

        {
          path: "/details/:postId",
          element: (
            <ProtectedRoutes>
              <PostDetails />
            </ProtectedRoutes>
          ),
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  const client = new QueryClient();
  const { isOffline } = useOffline();

  function handleDarkMode() {
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [darkMode]);

  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={client}>
          <CounterContextProvider>
            <Toaster position="top-right" />
            <Offline isOffline={isOffline} />
            <Online isOffline={isOffline} />
            <RouterProvider router={routes} />
          </CounterContextProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
