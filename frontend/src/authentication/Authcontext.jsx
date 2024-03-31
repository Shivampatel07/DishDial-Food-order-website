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
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
        cart,
        setCart,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
