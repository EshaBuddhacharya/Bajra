const express = require('express');
const cors = require('cors');
const verifyFirebaseToken = require("./firebase/authMiddleware");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express(); 


// Serve static files from the "public" folder
app.use('/media', express.static(path.join(__dirname, 'public/media')));

// Middleware to parse JSON
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // allow all origins
  credentials: true // allow cookies
}));
app.use(cookieParser());

// route
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order'); 

app.use('/api/auth', authRoutes); 
app.use('/api/menu', menuRoutes)
app.use('/api/order', orderRoutes)

app.get('/test', (req, res) => {
  res.send('Hello World!');
});
// Protected api test
app.get('/protected', verifyFirebaseToken, (req, res) => {
  res.send("You are logged in");
});

// initializing server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// mongodb configuration 
console.log("Connecting to mongodb")
const connectWithRetry = () => {
  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to mongodb"))
  .catch(err => {
    console.log("Error connecting to mongodb:", err.message);
    console.log("Retrying in 5 seconds...");
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();