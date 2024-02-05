const express = require("express");
const mongoose = require("mongoose");
const songRouter = require("./routes/songs");
const cors = require("cors");
require("dotenv").config(); // Load .env variables

const app = express();
app.use(express.json());
app.use(cors());
console.log(process.env.MONGODB_URL);
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Routes
app.use("/songs", songRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
