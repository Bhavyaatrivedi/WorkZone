require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const errorHandler = require("./middlewares/errors");
const employeeRoutes = require("./routes/employee");
const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/employee", employeeRoutes);
app.get("/", (req, res) => {
  res.send('<h1>Backend is runnning</h1>');
});

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_STRING)
  .then((result) => {
    console.log( "database connected");
    app.listen(process.env.PORT, () => {
      console.log( "server started");
      console.log(`Server is Running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error( error);
  });
