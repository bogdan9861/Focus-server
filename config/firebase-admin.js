var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.client_email,
    privateKey: process.env.privateKey,
    projectId: process.env.private_key,
  }),
});
