require("dotenv").config();
const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB;

const intialiseDatabase = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log("error connected to database", error));
};

module.exports = { intialiseDatabase };
