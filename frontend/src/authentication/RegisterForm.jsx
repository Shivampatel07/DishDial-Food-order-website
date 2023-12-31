import React, { useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import toast from "react-hot-toast";

function RegisterForm(props) {
  const [RegisterData, setRegisterData] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setRegisterData({ ...RegisterData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (RegisterData.createpassword !== RegisterData.confirmpassword) {
        setError("Passwords do not match");
        return;
      } else {
        setError("");

        const response = await axios.post(
          "http://localhost:8080/api/auth/register",
          {
            email: RegisterData.email,
            username: RegisterData.username,
            password: RegisterData.createpassword,
          }
        );
        if (response.data.message) {
          toast.success(response.data.message);
          props.handleSigninOpen();
        } else if (response.data.error) {
          toast.error(response.data.error);
        }
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
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
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />
      </div>
      <div class="mb-2">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="createpassword"
        >
          Create password
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="createpassword"
          type="password"
          name="createpassword"
          onChange={handleChange}
          placeholder="******************"
        />
      </div>
      <div>
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="confirmpassword"
        >
          Confirm password
        </label>
        <input
          class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmpassword"
          type="password"
          name="confirmpassword"
          onChange={handleChange}
          placeholder="******************"
        />
      </div>
      {error && <div className="text-red-500 text-xs p-1">{error}</div>}

      <div class="flex items-center justify-between mt-6">
        <button
          class="bg-orange-400 hover:bg-orange-600 text-white  py-2 px-4 rounded "
          type="submit"
        >
          Sign-Up
        </button>
      </div>
      <div
        class="my-2 hover:text-orange-500 cursor-pointer"
        onClick={props.handleSigninOpen}
      >
        Already have an account?
      </div>
    </form>
  );
}

export default RegisterForm;
