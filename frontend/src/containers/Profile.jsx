import React, { useEffect } from "react";
import axios from "axios";
import configureData from "../environments/environments";
import toast from "react-hot-toast";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { useAuth } from "../authentication/Authcontext";

function Profile() {
  const { setIsLoading } = useAuth()
  const [userData, setUserData] = React.useState({});
  const [userOrders, setUserOrders] = React.useState([]);
  const [modalEditOpen, setModalEditOpen] = React.useState(false);
  const [editData, setEditData] = React.useState({
    username: userData.username ? userData.username : "",
    email: userData.email ? userData.email : "",
    address: userData.address ? userData.address : "",
    phone_number: userData.phone_number ? userData.phone_number : "",
  });

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditData({
      email: editData.email.trim(),
      username: editData.username.trim(),
      address: editData.address.trim(),
      phone_number: editData.phone_number.trim(),
    });
    let phone_number_error = false;
    if (
      !(
        /^[1-9][0-9]{9}$/.test(editData.phone_number) ||
        editData.phone_number === ""
      )
    ) {
      toast.error("Invalid phone number");
      phone_number_error = true;
    }
    if (!phone_number_error) {
      const updateProfileData = editData
      delete updateProfileData.email
      await axios.post(
        configureData.baseUrl + "/api/auth/update-profile",
        updateProfileData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      ).then((response) => {
        const updatedProfileResponse = response.data
        if (updatedProfileResponse.success === 1) {
          toast.success(updatedProfileResponse.message);
          setModalEditOpen(false);
          window.location.reload()
        } else {
          toast.error(updatedProfileResponse.message);
        }
      }).catch((error) => {
        toast.error("Internal server error")
      })
    }
  };

  useEffect(() => {
    setIsLoading(true)
    const token = localStorage.getItem("token")
    axios
      .get(configureData.baseUrl + "/api/auth/profile", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const profileData = response.data
        if (profileData.success === 1) {
          setUserData(profileData.data);
          setEditData({
            username: profileData.data.username ? profileData.data.username : "",
            email: profileData.data.email ? profileData.data.email : "",
            address: profileData.data.address ? profileData.data.address : "",
            phone_number: profileData.data.phone_number ? profileData.data.phone_number : "",
          });
          setUserOrders(profileData.data.orderData);
        }
        else {
          toast.error(profileData.message)
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error, {
          duration: 2000,
        });
      });
    setIsLoading(false)
  }, []);

  const modalStyle = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  const Logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div>
      <Modal
        open={modalEditOpen}
        onClose={() => setModalEditOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div
            className="absolute  right-5 top-5 hover:cursor-pointer"
            onClick={() => setModalEditOpen(false)}
          >
            <CancelTwoToneIcon fontSize="medium" />
          </div>
          <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <p>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="username"
                  name="username"
                  readOnly
                  defaultValue={editData.username}
                />
              </p>
              <p>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="email"
                  name="email"
                  readOnly
                  defaultValue={editData.email}
                />
              </p>
              <p>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="address"
                  name="address"
                  onChange={handleChange}
                  value={editData.address}
                />
              </p>
              <p>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  id="phone"
                  name="phone_number"
                  onChange={handleChange}
                  value={editData.phone_number}
                />
              </p>
              <div className="flex justify-center">
                <button
                  className="bg-orange-400 hover:bg-orange-600 text-white  py-2 px-4 rounded mt-5"
                  type="submit"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      <h1 className="text-4xl font-bold text-center">Profile</h1>
      <div className={userOrders.length === 0 ? "h-[60vh]" : ""}>
        <div className="grid grid-cols-3 min-h-full">
          <div className="p-5 m-5 border-2 border-gray-100 rounded-xl bg-gray-200">
            <div className="relative">
              <h2 className="text-3xl text-center m-3 font-bold mb-10">
                User Information
              </h2>{" "}
              <EditNoteTwoToneIcon
                className="absolute top-0 right-0 hover:cursor-pointer hover:bg-gray-300"
                fontSize="large"
                onClick={() => setModalEditOpen(true)}
                sx={{
                  border: "black 1px solid",
                  borderRadius: "3px",
                  padding: "3px",
                }}
              />
            </div>
            <div className="text-xl">
              {userData.username && <p>Username: {userData.username}</p>}
              {userData.email && <p>Email: {userData.email}</p>}
              {userData.address && <p>Address: {userData.address}</p>}
              {userData.phone_number && <p>Phone: {userData.phone_number}</p>}
            </div>
          </div>
          <div
            className={
              (userOrders.length === 0
                ? "flex items-center justify-center"
                : "") +
              " col-span-2 p-5 m-5 border-2 border-gray-100 rounded-xl bg-gray-200 h-"
            }
          >
            {userOrders.length > 0 && (
              <h2 className="text-3xl text-center m-3 font-bold">
                Order Information
              </h2>
            )}
            <div>
              {userOrders.length > 0 ? (
                <div>
                  {userOrders.map((order, index) => {
                    return (
                      <div
                        key={index}
                        className="border-2 border-orange-400 p-5 m-5 rounded-xl bg-orange-400 text-white"
                      >
                        <h3 className="text-2xl font-bold">
                          Order {index + 1}
                        </h3>
                        <p className="text-lg">Order Date: {order.createdAt}</p>
                        <p className="text-lg">
                          Shipping Address: {order.shippingAddress}
                        </p>
                        <p className="text-lg">Order Items:</p>
                        <br />
                        <ul>
                          {order.orderItems.map((item, index) => {
                            return (
                              <li key={index}>
                                {item.name} - {item.quantity} Qty -{" "}
                                {item.price * item.quantity} Rs. ({item.price}{" "}
                                Rs./1 Qty)
                              </li>
                            );
                          })}
                        </ul>
                        <hr />
                        <p>Price: {order.price} Rs.</p>
                        <p>Shipping Price: {order.shippingPrice} Rs.</p>
                        <p>
                          Total Price: price + shipping Price ={" "}
                          {order.totalPrice} Rs.
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <h3 className="text-2xl text-center font-semibold">
                  No Orders to display
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end m-5">
        <button
          className="px-4 py-2 bg-red-500 text-white shadow-md hover:shadow-sm shadow-gray-400 rounded-lg"
          onClick={Logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
