const express = require('express');
const cors = require('cors');
const {verifyFirebaseToken} = require("./firebase/authMiddleware");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const multer = require('multer');

const app = express(); 

// Ensure public/images directory exists
const imageDir = path.join(__dirname, 'public/images');
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Middleware to parse JSON and configure CORS
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://bajra.onrender.com"],
  credentials: true
}));
app.use(cookieParser());

// Upload route with CORS headers
app.post('/upload', upload.single('image'), (req, res) => {
  console.log("POST /upload")
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  const publicPath = `/media/images/${req.file.filename}`;
  res.json({
    message: 'Image uploaded successfully!',
    filename: req.file.filename,
    path: publicPath,
  });
});

// Serve static files from the "public" folder
app.use('/media', express.static(path.join(__dirname, 'public/media')));

// Routes
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order'); 
const feedbackRoutes = require("./routes/feedback");
const usersRoutes = require("./routes/users")

app.use('/api/auth', authRoutes); 
app.use('/api/menu', menuRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/feedback', feedbackRoutes);
app.use('/api/users', usersRoutes);

app.get('/test', (req, res) => {
  res.send('Hello World!');
});

// Protected api test
app.get('/protected', verifyFirebaseToken, (req, res) => {
  res.send("You are logged in");
});

// Initializing server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// MongoDB configuration 
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