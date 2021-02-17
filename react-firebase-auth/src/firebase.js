import firebase from 'firebase/app';
import 'firebase/auth';

export const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // apiKey: 'AIzaSyA_oVDRyqFhfxPUfeRntSLSGk6DHl1YdE8',
  // authDomain: 'devf-3bee8.firebaseapp.com',
  // databaseURL: 'https://devf-3bee8.firebaseio.com',
  // projectId: 'devf-3bee8',
  // storageBucket: 'devf-3bee8.appspot.com',
  // messagingSenderId: '329327565336',
  // appId: '1:329327565336:web:c29fd1c9f814076e',
});

export const auth = app.auth();
// export default app;
