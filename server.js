const express = require("express");
require("dotenv").config();

const dbConnect = require("./config/connectDB");
const app = express();
// middleware routing body parse
app.use(express.json());
// Connect DB
dbConnect();
app.use("/api/person", require("./Routes/personns"));
const PORT = process.env.PORT;

app.listen(PORT, (err) =>
  err ? console.error(err) : console.log("server is running")
);
