const mongoose = require('mongoose');

require('dotenv').config({ path: './.env' });
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connection successful!");
    process.exit(0);
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
