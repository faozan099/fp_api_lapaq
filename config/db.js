const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('SUCCESS connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
}

module.exports = connectDB;
