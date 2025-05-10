const admin = require("./firebaseAdmin");
const user = require('../models/users')

const verifyFirebaseToken = async (req, res, next) => {
  const idToken = req.cookies.loginToken;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    const errorMessage =
      err.code === "auth/id-token-expired"
        ? "Token expired"
        : err.code === "auth/invalid-id-token"
        ? "Invalid token"
        : "Unauthorized";
    return res.status(403).json({ error: errorMessage });
  }
};

const verifyAdminToken = async (req, res, next) => {
  const idToken = req.cookies.loginToken;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    const authUser = await user.findOne({firebaseUid: req.user.uid});
    if (!authUser || authUser.role !== 'admin'){ 
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    const errorMessage =
      err.code === "auth/id-token-expired"
        ? "Token expired"
        : err.code === "auth/invalid-id-token"
        ? "Invalid token"
        : "Unauthorized";
    return res.status(403).json({ error: errorMessage });
  }
};

module.exports = {verifyFirebaseToken, verifyAdminToken};