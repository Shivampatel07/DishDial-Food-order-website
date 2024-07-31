import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "./Authcontext";
import configureData from "../environments/environments";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const baseUrl = configureData.baseUrl;

function LoginForm(props) {
  let { setIsInfoGet, isInfoGet } = useAuth();
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({});
  const [passwordShow, setPasswordShow] = useState(false)

  const togglePasswordShow = () => {
    setPasswordShow(!passwordShow)
  }

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    await axios.post(baseUrl + "/api/auth/login", userData, {
      withcredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      const loginResponse = response.data
      if (loginResponse.success === 1) {
        localStorage.setItem("token", loginResponse.data.token);
        toast.success(loginResponse.message);
        setIsInfoGet(!isInfoGet);
      }
      else if (loginResponse.success === 0) {
        toast.error(loginResponse.message)
      }
    }).catch((error) => {
      toast.error("Internal server error")
    }).finally(() => {
      setLoading(false)
    })
  };
  return (
    <form className="font-[Raleway]" onSubmit={handleSubmit}>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Username"
        />
      </div>
      <div class="mb-4 relative">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input
          class="shadow appearance-none border  rounded w-full py-1 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          name="password"
          onChange={handleChange}
          type={passwordShow ? "text" : "password"}
          placeholder="Password"
        />
        {passwordShow ? <VisibilityIcon fontSize="small" className="absolute right-4 top-8" onClick={togglePasswordShow} /> : <VisibilityOffIcon fontSize="small" className="absolute right-4 top-8" onClick={togglePasswordShow} />}
      </div>
      <div class="flex items-center justify-between mb-4">
        <button
          class={"bg-orange-400 hover:bg-orange-600 text-white  py-2 px-4 rounded disabled:bg-orange-400"}
          type="submit"
          disabled={loading}>
          {loading ? 'Loading...' : 'Sign-In'}
        </button>
        <a
          class="inline-block align-baseline hover:font-semibold text-sm text-orange-500 hover:text-orange-800"
          href="/">
          Forgot Password?
        </a>
      </div>
      <div
        class="hover:text-orange-500 cursor-pointer underline"
        onClick={props.handleSignupOpen}>
        Create an account
      </div>
    </form>
  );
}

export default LoginForm;
