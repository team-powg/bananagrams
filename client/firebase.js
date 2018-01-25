//Initializing Firebase

import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyCLD4zA3LhYAkcL_vLc03azSL3xkugfArA",
  authDomain: "powg-bananagrams.firebaseapp.com",
  databaseURL: "https://powg-bananagrams.firebaseio.com",
  projectId: "powg-bananagrams",
  storageBucket: "powg-bananagrams.appspot.com",
  messagingSenderId: "394105017274"
};
firebase.initializeApp(config);
export default firebase;


