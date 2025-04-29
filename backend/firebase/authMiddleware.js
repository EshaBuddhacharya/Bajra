const admin = require("./firebaseAdmin");

const verifyFirebaseToken = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing or invalid Authorization header" });
  }

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Unauthorized: Invalid Authorization header format" });
  }

  const idToken = parts[1];
  if (!idToken || idToken.length < 10) {
    return res.status(401).json({ error: "Unauthorized: Invalid token format" });
  }

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

module.exports = verifyFirebaseToken;