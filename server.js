const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./router/router");
app.use(cors());
app.use(express.json());
app.use("/", require("./router/router"));

app.listen(8000, () => {
  console.log("app is listeing at 8000");
});
