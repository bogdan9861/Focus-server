var admin = require("firebase-admin");

const serviceAccount = require("../focus-5ae89-firebase-adminsdk-fbsvc-27390319dc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = {
  admin,
};
