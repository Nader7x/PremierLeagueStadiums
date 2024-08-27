
const admin = require('firebase-admin');
const serviceAccount = require('../premier-league-grounds-firebase-adminsdk-ifnfe-dbfafed85f.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const messaging = admin.messaging();
module.exports = {messaging}