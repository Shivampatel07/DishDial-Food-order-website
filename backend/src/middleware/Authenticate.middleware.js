const Users = require("../models/Usermodel.model");

const userAuthenticate = async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const user = await Users.findOne({ token: token });
        if (user) {
            req.user = user;
            next();
        } else {
            console.log(req.headers)
            return res.status(404).json({ error: "Invalid token" });
        }
    } else {
        console.log(req.headers)
        return res.status(404).json({ error: "Invalid token" });
    }
}

module.exports = { userAuthenticate };