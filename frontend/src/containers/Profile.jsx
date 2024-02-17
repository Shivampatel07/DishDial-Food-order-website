import React, { useEffect } from "react";
import axios from "axios";
import configureData from "../environments/environments";
import toast from "react-hot-toast";

function Profile() {
  const [userData, setUserData] = React.useState({});
  const [userOrders, setUserOrders] = React.useState([]);
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
    <h1 className="text-4xl font-bold text-center">Profile</h1>
    <div className="h-[60vh]">
      <div className="grid grid-cols-3 min-h-full">
      <div className="p-5 m-5 border-2 border-gray-100 rounded-xl bg-gray-200">
        <h2 className="text-3xl text-center m-3 font-bold mb-10">User Information</h2>
        <div className="text-xl">
          {userData.username && <p>Username: {userData.username}</p>}
          {userData.email && <p>Email: {userData.email}</p>}
          {userData.address && <p>Address: {userData.address}</p>}
          {userData.phone_number && <p>Phone: {userData.phone_number}</p>}
        </div>
      </div>
      <div className={(userOrders.length ===0 ? "flex items-center justify-center" : "") + " col-span-2 p-5 m-5 border-2 border-gray-100 rounded-xl bg-gray-200 "}>
        {userOrders.length > 0 && <h2 className="text-3xl text-center m-3 font-bold">Order Information</h2>}
        <div>
          {userOrders.length > 0 ? <></> : <h3 className="text-2xl text-center font-semibold">No Orders to display</h3>}
        </div>
      </div>
    </div>
    </div>
  </div>;
}

export default Profile;
