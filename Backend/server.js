const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.on('error', (err) => {
  console.error('Express error:', err.message);
});

mongoose.connect(process.env.MONGODB_URL);


app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Backend");
  });

const db = mongoose.connection

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("MongoDB connection successful");
});

require("./routes/product.routes")(app);
require("./routes/users.routes")(app);

