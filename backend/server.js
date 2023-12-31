const expr = require("express");
const app = expr();
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const connectDB = require("./src/config/Db");
const AuthRouter = require("./src/routes/Authentication");
const cookieParser = require("cookie-parser");

connectDB();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(expr.json());

app.use("/api/auth", AuthRouter);
// /api/auth/register = Register a user
// /api/auth/login = Login a user

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
