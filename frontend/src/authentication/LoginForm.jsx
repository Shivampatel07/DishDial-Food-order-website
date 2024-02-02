import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "./Authcontext";
import configureData from "../environments/environments";
const baseUrl = configureData.baseUrl;

function LoginForm(props) {
  let { setIsInfoGet, isInfoGet } = useAuth();
  const [userData, setUserData] = useState({});

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseUrl + "/api/auth/login", userData, {
        withcredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.message && response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        setIsInfoGet(!isInfoGet);
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <form className="font-[Raleway]" onSubmit={handleSubmit}>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Username"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="******************"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-orange-400 hover:bg-orange-600 text-white  py-2 px-4 rounded "
          type="submit"
        >
          Sign-In
        </button>
        <a
          class="inline-block align-baseline hover:font-semibold text-sm text-orange-500 hover:text-orange-800"
          href="/"
        >
          Forgot Password?
        </a>
      </div>
      <div
        class="my-2 hover:text-orange-500 cursor-pointer"
        onClick={props.handleSignupOpen}
      >
        Create an account
      </div>
    </form>
  );
}

export default LoginForm;
