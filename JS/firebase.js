const firebaseConfig = {
  apiKey: "AIzaSyBEQ07_67t7u_mGT17lxNqVV1SUuXPwD8k",
  authDomain: "aisect-live-bus-tracker.firebaseapp.com",
  databaseURL: "https://aisect-live-bus-tracker-default-rtdb.firebaseio.com",
  projectId: "aisect-live-bus-tracker",
  storageBucket: "aisect-live-bus-tracker.firebasestorage.app",
  messagingSenderId: "365297993266",
  appId: "1:365297993266:web:50ae835ef3af98f8fd9e2b"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();