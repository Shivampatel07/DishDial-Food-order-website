const expr = require("express");
const app = expr();
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const connectDB = require("./src/config/Db");
const AuthRouter = require("./src/routes/Authentication.route");
const cookieParser = require("cookie-parser");
const restaurentRouter = require("./src/routes/FindRestaurent.route");
const path = require("path");

connectDB();
app.use(expr.static(path.join(__dirname,"../frontend/build/")))
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  "/images/restaurant",
  expr.static(path.join(__dirname, "/src/Images/restaurant"))
);
app.use(
  "/images/product",
  expr.static(path.join(__dirname, "/src/Images/product"))
);

app.use(expr.json());

app.use("/api/auth", AuthRouter);
app.use("/api", restaurentRouter);
// /api/auth/register = Register a user
// /api/auth/login = Login a user

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
