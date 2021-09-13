import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import React from "react";

const provider = new firebase.auth.GoogleAuthProvider();

// Find these options in your Firebase console
firebase.initializeApp({
  apiKey: "AIzaSyC-6LkwMohAqXR4yT6IlKmB3DD9ynlpRd0",
  authDomain: "instapost-f8954.firebaseapp.com",
  projectId: "instapost-f8954",
  storageBucket: "instapost-f8954.appspot.com",
  messagingSenderId: "98337476696",
  appId: "1:98337476696:web:badb2252a364e4a72cba2d",
  measurementId: "G-HJNB41KQH5"
});

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [authState, setAuthState] = React.useState({ status: "loading" });

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims["https://hasura.io/jwt/claims"];

        if (hasuraClaim) {
          setAuthState({ status: "in", user, token });
        } else {
          // Check if refresh is required.
          const metadataRef = firebase
            .database()
            .ref(`metadata/${user.uid}/refreshTime`);

          metadataRef.on("value", async (data) => {
            if(!data.exists) return
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            setAuthState({ status: "in", user, token });
          });
        }
      } else {
        setAuthState({ status: "out" });
      }
    });
  }, []);

  async function signInWithGoogle() {
      await firebase.auth().signInWithPopup(provider);
  };

  async function signUpWithEmailAndPassword(formData) {
  const data = await firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
  if (data.additionalUserInfo.isNewUser) {

  }
}

  async function signOut(){
    try {
      setAuthState({ status: "loading" });
      await firebase.auth().signOut();
      setAuthState({ status: "out" });
    } catch (error) {
      console.log(error);
    }
  };

  if (authState.status === "loading") {
    return null;
  } else {
    return (
      <AuthContext.Provider
        value={{
          authState,
          signInWithGoogle,
          signOut
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;