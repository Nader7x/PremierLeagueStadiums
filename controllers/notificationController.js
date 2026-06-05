// @ts-check
import admin from "firebase-admin";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : null;

if (!serviceAccount) {
  console.error(
    "FIREBASE_SERVICE_ACCOUNT env var is missing — push notifications disabled.",
  );
} else {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const messaging = serviceAccount ? admin.messaging() : null;

export { messaging };
