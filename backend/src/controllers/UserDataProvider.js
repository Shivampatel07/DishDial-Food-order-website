const Users = require("./../models/Usermodel");

const UserDataProvider = async (req, res) => {
  const { token } = req.body;
  console.log(token);
  if (token) {
    const user = await Users.findOne({ token: token });
    if (user) {
      return res.json({ email: user.email, username: user.username });
    } else {
      return res.json({ error: "Invalid token" });
    }
  } else {
    return res.json({ error: "Invalid token" });
  }
};

module.exports = UserDataProvider;
