var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "focus-5ae89",
    private_key_id: "6f08853a7bebd89a58fddff51d23af4a1ecd4827",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCmCKano5BCv71J\nt4pqY0yHzbOHBZbufKdXg9OqQOPqSO6nvvE+dwXq/vR9VSPPqB8IkNSKHScReHOU\nllT56jgdeLExWWy7flyDmwNXb5Y6o63Km9CcEg5FPU9rYm/yrpYlIj7Up+uLPssg\nGeua1pDLCXKUsrCkZg54YsKAgAS3azPco2iCRmZQ50YG3FFkscUX7O0lYKvWMRZ8\n2CO+NH6n6HzhYUMmrciw3JzwQqTma0EeWTA4wMPtAnKsqw6xHOV7rmIFTI/SCFCQ\nHmK/eUcZRaziBjs23e9/GXhkV8g3HlfFoVv264/L7JDUIaim9cmvSHN9YG8I7229\np5wQ47qXAgMBAAECggEAUCkTFRKx/pgF8oZLrIuekl5s076OHTxPqr/5vFQx9ZYa\nqyBT5t2eHNPVBIHLlWFNAlyyULA8gYHPA6kFA9fiGdCAdBwBlBAw6FU56sf0FwGZ\nUZ2ivQc2npU4N9dBx0AlO25qOU+NOCAr/6akCpCXPX+lM0eGYwjm6ZZ8439rR4YR\nMD3ycPzLiXFfR5/O2fR4FpV5pQTqmngTUujZMvF0O9P/NbVEVmoH8C1/tfind6vC\nLqRmRX8CVNGMe2AC3KXy3g7bSfMppmJoD4F6yUXyxasFAkR7Rv5imnAx54OYqmdV\nv+eyOE0l2oN3gY9Vejt2Ehm0Z90BYog3Kym75j/PYQKBgQDmFXSRYsV3X+clSPRK\niFu2Lx0+sQQUNtOzq2jQ9J5vKIRMShi4j9OMDDQMVzSHWTIPzYTz7sgoY6Gm/t0v\nFsP1rCGra9U+xV0SQKG+qXFSu0R0xVS+3Slmt6B1O/rGqNt8HCzT3krKqw/lFZgd\ncIMDJP+jLadlemWcinohtL82EQKBgQC4vEqs1Uj9Uyqhhcm/Ts9Sg/SMm1rKhLdl\nwVMiX7zKJCqEvMGFsmotSQTVNj1YhctUTAbJjfrXjis3U8QhV9nVr4MwCQ7y7Nbh\no7k9C0XCc0TcUesi2sWZ2iXYNMU+/zuI4BB0tfM0o1jpnTqYAfjchKvXMz1uwoZX\nMCT3SiSeJwKBgQDbzQNfIIykTenzpI475ag3kyrNCS5sYTQ9IDMx636vknVQrDiR\nmFTwJXhTkbuM0ZkRn7SzlBmC/Csh7bg/k/AAckB4ErvVC5auKTBbhGPONThglWMw\nMveqOSIA3RvlTMrg9cmdXW71zhWRM9/tv95o0p+ks6iHOTZ5JZEnQhSpAQKBgBVp\nXY5iui8CcLJ/+z49ODJsMPALIZ7PeyJEIgqd5hfX0UXJSvTgFQZirDi6LKoR99sx\nZKf/2M8bH08uWlEzCYCG80GiCyWE5fMJMvMsV02OZrDSndpQWQ7YBgLlOuduVcwr\njDy6yhGTzT5mhuAPenS0u+YZfklUKpX4cpBm+4+JAoGBAOW/MP76XgH5Z1UFUmDJ\nrzRC9VeUaEd5kE+OFzUgGreB+lMNCMqXzfQgsyJfXcMjPz3Gk26VvgAzANdWZdBB\nw6wcakMKp5xYdc7jjFsN8HaN5ug/a77Kv4P3nswCRI4HPTZT0cykOgjSD+iFsUum\n/69Mcsa5tGDARIi6iTGZQd6s\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-fbsvc@focus-5ae89.iam.gserviceaccount.com",
    client_id: "110340380707947306729",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40focus-5ae89.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  }),
});

module.exports = {
  admin,
};
