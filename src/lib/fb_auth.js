import {  createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// Initialize Firebase Authentication and get a reference to the service
export const emailSignUp = (auth, email, password) => {
  console.log(email + password);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("signed in");
      return user;
    })
    .catch((error) => {
      console.log("failed");
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorCode, errorMessage;
    });
};

export const getUser = (auth) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      return user.uid
    } else {
      // User is signed out
      return false
    }
  });

};
