const admin = require('firebase-admin');

require('dotenv').config();
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('Failed to initialize Firebase Admin SDK:', error);
  throw error; // Stop execution if initialization fails
}

module.exports = admin;