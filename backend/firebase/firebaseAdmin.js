const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json'); // Replace with actual path

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