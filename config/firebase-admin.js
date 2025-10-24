var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(
    "../focus-5ae89-firebase-adminsdk-fbsvc-27390319dc.json"
  ),
});

module.exports = {
  admin,
};
