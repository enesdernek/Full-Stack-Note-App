import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyABLhqZJuXRQU5OnK6gHzHuxiamihOy53M",
    authDomain: "notemountain.firebaseapp.com",
    projectId: "notemountain",
    storageBucket: "notemountain.appspot.com",
    messagingSenderId: "256529814410",
    appId: "1:256529814410:web:73dfb13dc1fefc6dad2e73"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
