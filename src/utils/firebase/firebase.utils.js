import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD3ZfMrv4Yjo6sOTQHRV939TJpnuP1-xbA",
  authDomain: "crwn-clothing-db-3fc89.firebaseapp.com",
  projectId: "crwn-clothing-db-3fc89",
  storageBucket: "crwn-clothing-db-3fc89.appspot.com",
  messagingSenderId: "36628032809",
  appId: "1:36628032809:web:bbd3d1c9389bc94b019b38",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
//export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
//export const signInWithGooglePopup = () => signInWithRedirect(auth, provider);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const creatrUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("there was an error creating the user", error.message);
    }
  }
  return userDocRef;
};
