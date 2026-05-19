import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "REMOVED_KEY",
  authDomain: "persona5-website-theme.firebaseapp.com",
  projectId: "persona5-website-theme",
  storageBucket: "persona5-website-theme.firebasestorage.app",
  messagingSenderId: "841359799157",
  appId: "1:841359799157:web:08a81c9d344a764bf4993c"
};

const app = initializeApp(firebaseConfig);

export { app };
