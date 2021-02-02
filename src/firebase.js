import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyA0y7PFwZ2wgY-wpLf0811B2iEhefbOf4o",
	authDomain: "whatsapp-clone-2a49c.firebaseapp.com",
	databaseURL: "https://whatsapp-clone-2a49c.firebaseio.com",
	projectId: "whatsapp-clone-2a49c",
	storageBucket: "whatsapp-clone-2a49c.appspot.com",
	messagingSenderId: "915421795326",
	appId: "1:915421795326:web:86475db08e40bf938426af",
	measurementId: "G-7Q61S4LJXJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export default db;
