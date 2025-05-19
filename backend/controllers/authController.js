const admin = require("../firebase/firebaseAdmin");
const User = require("../models/users");
const axios = require("axios");
require("dotenv").config();

const cookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  path: "/",
  maxAge: maxAge,
});

const registerController = async (req, res) => {
  try {
    if (!admin || !admin.auth) {
      return res.status(500).send({ error: "Firebase Admin SDK not initialized" });
    }

    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).send({ error: "All fields are required" });
    }

    let userRecord;
    try {
      userRecord = await admin.auth().createUser({ email, password });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }

    try {
      const newUser = new User({
        firebaseUid: userRecord.uid,
        name,
        phone,
        address,
      });
      await newUser.save();
    } catch (error) {
      await admin.auth().deleteUser(userRecord.uid);
      return res.status(500).send({ error: "Error saving into database", details: error.message });
    }

    const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
    if (!FIREBASE_API_KEY) {
      return res.status(500).send({ error: "No API key found" });
    }

    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );

    const { idToken, refreshToken, expiresIn, localId } = response.data;

    res.cookie("loginToken", idToken, cookieOptions(24 * 60 * 60 * 1000));
    res.cookie("refreshToken", refreshToken, cookieOptions(30 * 24 * 60 * 60 * 1000));

    return res.status(200).send({
      message: "User signed in successfully!",
      idToken,
      refreshToken,
      expiresIn,
      uid: localId,
    });
  } catch (error) {
    return res.status(500).send({ error: "Registration failed", details: error.message });
  }
};

const signInController = async (req, res) => {
  const { email, password } = req.body;
  const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

  if (!FIREBASE_API_KEY) return res.status(500).send({ error: "No API key found" });
  if (!email || !password) return res.status(400).send({ error: "Email and password required" });

  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );

    const { idToken, refreshToken, expiresIn, localId } = response.data;

    res.cookie("loginToken", idToken, cookieOptions(24 * 60 * 60 * 1000));
    res.cookie("refreshToken", refreshToken, cookieOptions(30 * 24 * 60 * 60 * 1000));

    return res.status(200).send({
      message: "User signed in successfully!",
      idToken,
      refreshToken,
      expiresIn,
      uid: localId,
    });
  } catch {
    return res.status(400).send({ message: "Incorrect email or password" });
  }
};

const isAuthenticatedController = async (req, res) => {
  const authToken = req.cookies.loginToken || req.body?.authToken;
  if (!authToken) return res.status(401).send({ error: "No authentication token found" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(authToken);
    const user = await User.findOne({ firebaseUid: decodedToken.uid });
    if (!user) return res.status(404).send({ authenticated: false, error: "User not found" });

    return res.status(200).send({ authenticated: true, uid: decodedToken.uid, user });
  } catch {
    return res.status(401).send({ authenticated: false, error: "Invalid or expired token" });
  }
};

const logoutController = async (req, res) => {
  res.clearCookie("loginToken", { path: "/" });
  res.clearCookie("refreshToken", { path: "/" });
  res.send("Cookies cleared!");
};

const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).send({ error: "No refresh token" });

  const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
  if (!FIREBASE_API_KEY) return res.status(500).send({ error: "No API key" });

  try {
    const response = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`,
      { grant_type: "refresh_token", refresh_token: refreshToken }
    );

    const { id_token, refresh_token, expires_in } = response.data;
    const decodedToken = await admin.auth().verifyIdToken(id_token);
    const user = await User.findOne({ firebaseUid: decodedToken.user_id });

    res.cookie("loginToken", id_token, cookieOptions(24 * 60 * 60 * 1000));
    res.cookie("refreshToken", refresh_token, cookieOptions(30 * 24 * 60 * 60 * 1000));

    return res.status(200).send({
      message: "Token refreshed",
      idToken: id_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
      user,
    });
  } catch (error) {
    return res.status(401).send({ message: "Failed to refresh token", error: error.message });
  }
};

const loginWithGoogle = async (req, res) => {
  try {
    const { authToken, refreshToken, name, address, phoneNumber } = req.body;
    if (!authToken) return res.status(401).json({ error: "Authentication token is required" });

    const decodedToken = await admin.auth().verifyIdToken(authToken);
    let user = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!user) {
      if (!name || !address || !phoneNumber) {
        return res.status(400).json({
          error: "Missing required fields",
          details: "Name, address and phone number are required",
        });
      }

      user = await User.create({
        firebaseUid: decodedToken.uid,
        name,
        address,
        phone: phoneNumber,
        role: "customer",
      });
    }

    res.cookie("loginToken", authToken, cookieOptions(24 * 60 * 60 * 1000));
    res.cookie("refreshToken", refreshToken, cookieOptions(30 * 24 * 60 * 60 * 1000));

    return res.status(200).json({ authenticated: true, uid: decodedToken.uid, user });
  } catch (error) {
    return res.status(401).json({ authenticated: false, error: "Authentication failed" });
  }
};

module.exports = {
  registerController,
  signInController,
  isAuthenticatedController,
  logoutController,
  refreshTokenController,
  loginWithGoogle,
};
