var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "focus-5ae89",
    private_key_id: "27390319dc421a3ff802b7948f36185e91b1d452",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxo5dUT9jV0zsl\nAJwAe8i8mxD7A9QwBZM1lASTSxcSMHXjHdhQYEYFBVaTnNipC1H7IJjh7oyA3bur\n2lJgd1qVbBA0zyFKes3Fxno22oNiy3A4YG3Ig1/ZFrNaVrHejoIpPfBCcu2XaUgI\n2a//MsGVx81E6sM39BsYB4rJOnjPyZXWeH1ZdbCw6anKoIVIt9jv7PULnOh++Lzt\nRm32xbkvNuKqme3syToPp8wc+7AYgEWkaTDfNJk9tiMUcacaapFA4ym7Gj9IhmdI\nf9LtOINqL3ex+qWiiO2UXz8V37gUAzp9vcuUrt+zs/EOWHdRFnSRsmH+9abJVUIC\nkFF+kMzzAgMBAAECggEAHbGV2z8ZpOyRR2cprJ8EeBqHpR4HuxtDd0JN3X1A1waI\nvjU/8neVXMN+rGAci21b/9l8FNA2ZlgqRdjRylRJLQ8KSnmRPAz5FqVNypuOONZ+\n5L2hvFHRlM1Jn8E8LFKwCUrUPZdOhe/QXcJdvA/08h+a/Xksts60NLkWBvsiNMFa\nqBX13nDu9FqJRRlIIfGjCb2j1oFCdcdeOVQ4syuqYeVOoBT3uD2TIwRoQltRRs+J\nri70BK/XjVMdzy0ODsFspVtlE9aEj8KvXeSySnFTrAgGbR263MpDVMxaM2bFlD8k\nWrSkHTG5Hv1VpzEk5miPUK+P6RLGsJJ9O9Xw99ryEQKBgQD1+rB8x+lOfUPlhp2C\nBJBXVI2Tp34NBbsahR4RGWM44zU94q09SkDzmhd9GjTAiW1qTLHcotYDjo/5e0UL\nxars7Gy5y59FWMP50pnL7fREAlZT99rkn5kqlTIexiroQL/iMrSc/NjvY21pbs6D\neRELr1cG3VxZJVDib5OMS0d7OQKBgQC44C720IfXRTWDlzamvuncbkd8BxDKV/3c\nt8lYsjEKde+7OpQ+2YLYT3vm0ScU5gIXGho4FdyawE8lvFjEdrcCdnBx3p4u2/vv\nHiwgxObFjgoD8Vz0wpnDcHkqsVEBk3NgSeQTyyIKv/cn6ugN+uY4LcrtAT20ef8k\ns6b3ZncNiwKBgQC85jUMzpVL8oTmyldBVvHmLwe+obz6kTEb76ikZwO81ze2+9Ig\npFp2+Roat7pVNfSx0o4wq1iBSMUmSVU/8iAObI4erNH2dnGh8+qqImYYqFbVix0t\nv6bnfcYMvhCLZdY2BsyPVtneFVQbyL2NV7cQayoBGpPl3fNcwWTlM5aEeQKBgDmJ\n5HQCsNSKAL7E2EiLUKO/WtY6KLqhKiyAstS9GNBFpmgiMjNhZPzHuCs9WymA8JOa\nFyDvhOpRAhEfjo0O2aSVkieOfrLc2oswW9GTFrPTokBZ5XF0A4E1RzDHYQvZhWYp\neSfD6ANqfZTZ4oE/XlmLvwWGhlreQU997nA/XrxDAoGATvhRqwKqz7iijxT3a8wK\nQ3qmlclc4JNJTNL4M0tXtsqtfJULnl6KHAWFyRr5w2rwMnUwCQB5z49Hk86fDHws\n/g9b5W2kw6pB3C4nyN9gJMgmNwxb7AXhbixXxKalXeOIdEOLPy/99ROonUAQU9yi\nzZwZSpuANaJMynao4Jr93rE=\n-----END PRIVATE KEY-----\n",
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
