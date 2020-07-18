import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCnyc_g3Eap-hOmp4l2XVUEEgjSgfP5wwg",
    authDomain: "chatapp-db885.firebaseapp.com",
    databaseURL: "https://chatapp-db885.firebaseio.com",
    projectId: "chatapp-db885",
    storageBucket: "chatapp-db885.appspot.com",
    messagingSenderId: "298263452503",
    appId: "1:298263452503:web:dff3885c7f4ff16f30fc12"
}

firebase.initializeApp(firebaseConfig);

export default firebase;