const express = require("express");
const cors = require("cors");
const dbConn = require("./config/dbConnection");
require("dotenv").config();
const authRoute = require("./routes/authRoutes.js");
const taskRoute = require("./routes/taskRoutes.js");

const app = express();
app.use(express.json());
app.use(cors());
dbConn();

const port = process.env.PORT;
// app.get("/", (req, res) => {
//   // console.log("hello");
//   res.json("tzt");
// });
app.use("/api", authRoute);
app.use("/api", taskRoute);
// app.post("/api/signup", (req, res) => {
//   console.log("hehbjkl");

//   console.log(req);
// });

app.listen(port, () => {
  console.log("listen en port " + port);
});
