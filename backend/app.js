const express = require('express');
const cors = require('cors');
const { verifyFirebaseToken } = require("./firebase/authMiddleware");
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

// Dynamic CORS origin setup
const allowedOrigins = [
  'http://localhost:5173',
  'https://bajra.onrender.com',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Upload route
app.post('/upload', upload.single('image'), (req, res) => {
  console.log("POST /upload");
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const publicPath = `/images/${req.file.filename}`;
  res.status(200).json({
    message: 'Image uploaded successfully!',
    filename: req.file.filename,
    path: publicPath,
  });
});

// Serve static files
app.use('/media', express.static(path.join(__dirname, 'public/media')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Routes
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order');
const feedbackRoutes = require("./routes/feedback");
const usersRoutes = require("./routes/users");
const feastRoutes = require('./routes/feastRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/feast', feastRoutes);

app.get('/test', (req, res) => {
  res.send('Hello World!');
});

app.get('/protected', verifyFirebaseToken, (req, res) => {
  res.send("You are logged in");
});

// MongoDB connection with retry
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
