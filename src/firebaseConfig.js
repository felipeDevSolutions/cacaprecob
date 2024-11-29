const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://caca-precos-default-rtdb.firebaseio.com/',
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };