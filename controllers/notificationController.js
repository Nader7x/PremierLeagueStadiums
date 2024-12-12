import admin from 'firebase-admin';
import serviceAccount from '../premier-league-grounds-firebase-adminsdk-ifnfe-dbfafed85f.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

export { messaging };
