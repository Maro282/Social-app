import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(
    sessionStorage.getItem("token") || ""
  );

  const [userData, setUserData] = useState(null);

  // function to get logged user data
  function getUserData() {
    axios
      .get("https://linked-posts.routemisr.com/users/profile-data", {
        headers: {
          token: userToken,
        },
      })
      .then((response) => {
        if (response.data.message == "success") {
          setUserData(response.data.user);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    if (userToken) getUserData();
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{ userToken, setUserToken, userData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
