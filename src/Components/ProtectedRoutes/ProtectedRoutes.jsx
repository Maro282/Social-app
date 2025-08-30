import { Navigate } from "react-router-dom";

// import styles from "./ProtectedRoutes.module.css";
export default function ProtectedRoutes({ children }) {
  if (sessionStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}
