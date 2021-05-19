import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCvtiARdHuKm2cj8ryy4KTC854J6Zu9-YM",
    authDomain: "chatapp-179c0.firebaseapp.com",
    projectId: "chatapp-179c0",
    storageBucket: "chatapp-179c0.appspot.com",
    messagingSenderId: "791699164398",
    appId: "1:791699164398:web:4e0cd372dd11593d2f77ff"
}

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }