const admin = require("../firebase/firebaseAdmin");
const User = require("../models/users");
const axios = require("axios")

require('dotenv').config();

const registerController = async (req, res) => {
  try {
    // Verify admin is initialized
    if (!admin || !admin.auth) {
      console.error("Firebase Admin SDK not initialized");
      return res.status(500).send({
        error: "Server configuration error",
        details: "Firebase Admin SDK not initialized",
      });
    }

    // Extracting attributes
    const { name, email, password, phone, address } = req.body;

    // Validating attributes
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Registering in Firebase
    let userRecord;
    try {
      userRecord = await admin.auth().createUser({
        email,
        password,
      });
    } catch (error) {
      console.log("Firebase registration error:", { email, error: error.message });
      return res.status(400).send({ error: error.message });
    }

    // Storing user in database
    try {
      const newUser = new User({
        firebaseUid: userRecord.uid,
        name,
        phone,
        address,
      });
      await newUser.save();
    } catch (error) {
      console.log("MongoDB save error:", error.message);
      // Optionally, delete the Firebase user if MongoDB save fails to maintain consistency
      try {
        await admin.auth().deleteUser(userRecord.uid);
        console.log("Deleted Firebase user due to MongoDB error:", userRecord.uid);
      } catch (deleteError) {
        console.log("Failed to delete Firebase user:", deleteError.message);
      }
      return res.status(500).send({
        error: "Error saving into database",
        details: error.message,
      });
    }
  } catch (error) {
    console.error("Unexpected error in registration:", error);
    res.status(500).send({
      error: "Error in registration",
      details: error.message,
    });
  }
  // Performing automatic login
  const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY
  // api key check 
  if (!FIREBASE_API_KEY) {
    res.status(500).send({ error: "No api key found" })
  }

  // getting token from firebase 
  try {
    const { email, password } = req.body;
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
      email,
      password,
      returnSecureToken: true
    });

    const { idToken, refreshToken, expiresIn, localId } = response.data;

    // saving access token
    res.cookie('loginToken', idToken, {
      httpOnly: true,      // not accessible via JavaScript
      secure: process.env.NODE_ENV === 'production', // secure true only in production,        // send only over HTTPS
      sameSite: 'Strict',  // protect against CSRF
      maxAge: 24 * 60 * 60 * 1000
    });

    // saving refresh token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.status(200).send({
      message: 'User signed in successfully!',
      idToken,
      refreshToken,
      expiresIn,
      uid: localId
    });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(400).send({
      message: 'Authentication failed',
      error: error
    });
  }
};


const signInController = async (req, res) => {
  const { email, password } = req.body
  const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY

  // api key check 
  if (!FIREBASE_API_KEY) {
    res.status(500).send({ error: "No api key found" })
  }
  // validating 
  if (!email || !password) {
    res.status(400).send({ error: "email and password is required" })
  }

  // getting token from firebase 
  try {
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
      email,
      password,
      returnSecureToken: true
    });

    const { idToken, refreshToken, expiresIn, localId } = response.data;

    // saving access token
    res.cookie('loginToken', idToken, {
      httpOnly: true,      // not accessible via JavaScript
      secure: process.env.NODE_ENV === 'production', // secure true only in production,        // send only over HTTPS
      sameSite: 'Strict',  // protect against CSRF
      maxAge: 24 * 60 * 60 * 1000
    });

    // saving refresh token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.status(200).send({
      message: 'User signed in successfully!',
      idToken,
      refreshToken,
      expiresIn,
      uid: localId
    });
  } catch (error) {
    console.error('Error signing in');
    res.status(400).send({
      message: 'Incorrect email or password',
    });
  }
}

const isAuthenticatedController = async (req, res) => {
  // extracting token 
  const authToken = req.cookies.loginToken || req.body?.authToken;

  if (!authToken) {
    return res.status(401).send({ error: "No authentication token found" });
  }

  try {
    // Verify the token using Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(authToken);

    // Find user in database
    const user = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!user) {
      return res.status(404).send({
        authenticated: false,
        error: "User not found in database"
      });
    }

    // Token is valid and user exists
    return res.status(200).send({
      authenticated: true,
      uid: decodedToken.uid,
      user: user
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).send({
      authenticated: false,
      error: "Invalid or expired token"
    });
  }
}

const logoutController = async (req, res) => {
  res.clearCookie('loginToken')
  res.clearCookie('refreshToken')
  res.send('Cookie cleared!');
}

const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).send({ error: "No refresh token found in cookies" });
  }
  const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

  // Check for API key
  if (!FIREBASE_API_KEY) {
    return res.status(500).send({ error: "No API key found" });
  }

  // Check if refresh token is provided
  if (!refreshToken) {
    return res.status(400).send({ error: "Refresh token is required" });
  }

  try {
    // Exchange refresh token for new ID token
    const response = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`,
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }
    );

    const { id_token: newIdToken, refresh_token: newRefreshToken, expires_in } = response.data;

    // Verify token and get user
    const decodedToken = await admin.auth().verifyIdToken(newIdToken);
    let user;
    try {
      user = await User.findOne({ firebaseUid: decodedToken.user_id });
    } catch (error) {
      console.error('Error finding user:', error);
      user = false;
    }

    // Update the cookie with new ID token
    res.cookie('loginToken', newIdToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 24 * 7 * 60 * 60 * 1000 // 1 week
    });

    // Update the cookie with new ID token
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 30 * 24 * 7 * 60 * 60 * 1000 // 1 week
    });

    return res.status(200).send({
      message: 'Token refreshed successfully',
      idToken: newIdToken,
      refreshToken: newRefreshToken,
      expiresIn: expires_in,
      user
    });

  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(401).send({
      message: 'Failed to refresh token',
      error: error.message
    });
  }
};

const loginWithGoogle = async (req, res) => {
  try {
    const { authToken, refreshToken, name, address, phoneNumber } = req.body;

    if (!authToken) {
      return res.status(401).json({ error: "Authentication token is required" });
    }

    // Verify token and get user
    const decodedToken = await admin.auth().verifyIdToken(authToken);
    let user;
    try {
      user = await User.findOne({ firebaseUid: decodedToken.user_id });
    } catch (error) {
      console.error('Error finding user:', error);
      user = false;
    }

    // Create new user if doesn't exist
    if (!user) {
      if (!name || !address || !phoneNumber) {
        return res.status(400).json({
          error: "Missing required fields",
          details: "Name, address and phone number are required"
        });
      }

      user = await User.create({
        firebaseUid: decodedToken.uid,
        name,
        address,
        phone: phoneNumber
      });
    }
    // Update the cookie with new ID token
    res.cookie('loginToken', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 24 * 7 * 60 * 60 * 1000 // 1 week
    });

    // Update the cookie with new ID token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 30 * 24 * 7 * 60 * 60 * 1000 // 1 week
    });

    return res.status(200).json({
      authenticated: true,
      uid: decodedToken.uid,
      user
    });

  } catch (error) {
    console.error('Google login error:', error);
    return res.status(401).json({
      authenticated: false,
      error: "Authentication failed"
    });
  }
};

module.exports = {
  registerController,
  signInController,
  isAuthenticatedController,
  logoutController,
  refreshTokenController,
  loginWithGoogle
};