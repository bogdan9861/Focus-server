var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "focus-5ae89",
    private_key_id: "f594e13515542a23b164982ed61c13a9cb251c7d",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDb8UWXV688c9Gv\n7ecQyrvYQOvHOjj92Gq8bgB9/nx4CebypgwocX7LkInhWaqtOiHIXYlpr/9o5Ueu\n4BMPHJmF7JR3v6HswmvKaifklBQ+2BUfF15zR50ZUSt852ggpaiHQpjiCDhzuAr4\nZunLPmQ4umJkA8aaDQ0L5SMn88rJuhurBA/BlF43k+958nQH9LFIvckWCVnuPx83\nZuZDPwsILuA9J3E4BPU5MVgZHR/A3nznDdjaz6U3xB6O3Hwy3WOm+41sS5kLF6Vs\nDaeH8uTijpB0hxflcXBywHTyFsCAUbSPUIalCwebNKpOqh/hibe+WoLVJcKJ2Fi+\nfs0grJKxAgMBAAECggEAK8aVx02Yfzu+HHoJZ3oycRRa2UhpV3zfoalzR6CDPZEa\n+mi6OsJ8LiASkVu7cMcFOlADrZluCH66CcBnirZyiAlSc5Mcs3bu5VbDoecnMGrp\nqUqJbgBu8D8LnMyiGP1f0awbqcFhGwcih9ZT6jP81p2iP63QtZCrbBarLKSFVCjr\n8axonQs1wthk5UbWd1fSwoGZc4f9D1jpokCVr/kFu7DRovOmTv11Qg0AQIA7GDVs\n26j9hh7BybqfRoRwFhGBN2wn7PuQ9OvCCgEF4Z65PMi+DemtcZJvYJ2ADyCxEV7v\nGcZlb2v7Xvv2lZGpssZqFuAqwBwQDpkuEh4NbtWjUQKBgQD+UaEypO2lraUpjwfD\nrXbHsM7tIs5JD6Bd1INJ91oGjNfJSnxja7WiF9D6NdJqvzESafgucR40LolnCyve\nsgWOUqisAUNDqmTXPTmP82K9dTWsy4G2J8/LeoeF9L6tHaB6P53R3+6uW2fHnjZy\ndx3v6sOiib1Lm4Jm31fW/lfjXwKBgQDdZXgDySCA1ucBoEPfuhBv8iBlTyFOHYqP\njY0t6Nk1YCC9OQ+DgGbK2573pZQdpKP5gDBBUGjT3MnPHyHsWaN8SccAAxqWNkrj\nG9lapiLSLpWETgprLQfCRSN9Ja4cm8OqtuacymvRYUGCzm9z3TDiznE9tVUmQXJZ\nlrDmpsjT7wKBgQDpwoBnu59QzTZl57lcTEJEtKjO4VI5Z6qg9GglAb33DVh/Bf8l\np2hRcJC+m+AoDEr/wPXFQmZf0nKri2IslPd0ZVfymkqIlMOR8A3L2gvlVyoaBQja\nNOfUAXE2WMs29md+VqEquyl5jDztB+jF9+VFlEV0TiT3rR4Ejr//ttN0AwKBgBdT\njo6PjV4lxlcUhLI4z2yMDT+/U5oAYM35MwvIQcJu62Qkc+7+A1aSRzB+gJmS9Dfg\nerUW/MR9ucGZ3SAi3afFujLVIOL8u20sTP1RDdApWlWDR3O9XdjpIfEYnDylaLs+\n5BNW/H8mCRn4GCQUBQeQirvetCcAtESeLOtQXU5/AoGAXeFtgblS+X2kmD9OWUg4\nPzxkJYj01pGMcM43GBJ6xln9U6Zkt2hv5MG0ZPlxzICcFnr2mFD4GPh26beesZ6K\nRxKV8Fb38P6aRtgz5FuSxC3ya0FdS+Tvn4+dc5dY7smtbO1ADTR10CP0gzgi1GI0\n8+i/UsQ+uc2OMKQZ1nCl0CA=\n-----END PRIVATE KEY-----\n",
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
