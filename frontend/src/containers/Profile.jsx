import React, { useEffect } from "react";
import axios from "axios";
import configureData from "../environments/environments";
import toast from "react-hot-toast";

function Profile() {
  const [userData, setUserData] = React.useState({});

  useEffect(() => {
    axios.get(configureData.baseUrl + "/api/auth/profile", {
      headers: {
        Authorization: localStorage.getItem("token"),
      }
    })
      .then((res) => {
      setUserData(res.data)
    })
    .catch((error) => {
      toast.error(error.response.data.error, {
        duration: 2000
      })
    });
  },[])
  return <div>
    <h1 className="text-3xl font-bold text-center">Profile</h1>
    <div className="grid grid-cols-3">
      <div className="p-5 m-5 border-2 border-gray-100 rounded-xl bg-gray-200">
        <h2 className="text-2xl text-center m-3 font-bold">User Information</h2>
        <div>
          {userData.username && <p>Username: {userData.username}</p>}
          {userData.email && <p>Email: {userData.email}</p>}
          {userData.address && <p>Address: {userData.address}</p>}
          {userData.phone_number && <p>Phone: {userData.phone_number}</p>}
        </div>
      </div>
      <div className="col-span-2">hi</div>
    </div>
  </div>;
}

export default Profile;
