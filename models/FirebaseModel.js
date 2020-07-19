import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAhQktJXZ6TzvuJlkGX_D-tA7UT07YpbgQ",
    authDomain: "login-proj-37138.firebaseapp.com",
    databaseURL: "https://login-proj-37138.firebaseio.com",
    projectId: "login-proj-37138",
    storageBucket: "login-proj-37138.appspot.com",
    messagingSenderId: "808600300149",
    appId: "1:808600300149:web:fa8b8a5eff2d7a5223e63c"
}

firebase.initializeApp(firebaseConfig);

export default firebase;