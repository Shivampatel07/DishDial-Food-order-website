import React from "react";
import { useAuth } from "../authentication/Authcontext";

function Profile() {
  const { user } = useAuth();
  console.log(user);
  return <div></div>;
}

export default Profile;
