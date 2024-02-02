// AuthContext.js
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import configureData from "./../environments/environments";
const baseUrl = configureData.baseUrl;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isInfoGet, setIsInfoGet] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") && !isLoggedIn) {
      axios
        .post(baseUrl + "/api/auth/user", {
          token: localStorage.getItem("token"),
        })
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setUser(res.data);
          } else {
            setIsLoggedIn(false);
            setUser(null);
          }
        });
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, [isInfoGet]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        setUser,
        user,
        isInfoGet,
        setIsInfoGet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
