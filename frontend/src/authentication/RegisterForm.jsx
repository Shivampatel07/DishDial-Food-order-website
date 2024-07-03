import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import configureData from "../environments/environments";
import { useAuth } from "./Authcontext";
const baseUrl = configureData.baseUrl;

function RegisterForm(props) {
  let { setIsInfoGet, isInfoGet } = useAuth();
  const [RegisterData, setRegisterData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setRegisterData({ ...RegisterData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (RegisterData.createpassword !== RegisterData.confirmpassword) {
      setError("Passwords do not match");
      return;
    } else {
      setError("");
      setLoading(true)
      const response = await axios.post(baseUrl + "/api/auth/register", {
        email: RegisterData.email,
        username: RegisterData.username,
        password: RegisterData.createpassword,
      }).then((response) => {
        const registerResponse = response.data
        if (registerResponse.success === 1) {
          localStorage.setItem('token', registerResponse.data.token)
          toast.success(registerResponse.message)
          setIsInfoGet(!isInfoGet);
        }
        else if (registerResponse.success === 0) {
          toast.error(registerResponse.message)
        }
      }).catch((error) => {
        toast.error('Internal server error')
      }).finally(() => {
        setLoading(false)
      })
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
          class="bg-orange-400 hover:bg-orange-600 text-white  py-2 px-4 rounded disabled:bg-orange-400"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign-Up'}
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
