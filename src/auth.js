import { useMutation } from "@apollo/react-hooks";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import React from "react";
import { CREATE_USER } from "./graphql/mutations";
import defaultUserImage from './images/default-user-image.jpg';

const provider = new firebase.auth.GoogleAuthProvider();

// Find these options in your Firebase console
firebase.initializeApp({
  apiKey: "AIzaSyC-6LkwMohAqXR4yT6IlKmB3DD9ynlpRd0",
  authDomain: "instapost-f8954.firebaseapp.com",
  databaseURL: "https://instapost-f8954-default-rtdb.firebaseio.com",
  projectId: "instapost-f8954",
  storageBucket: "instapost-f8954.appspot.com",
  messagingSenderId: "98337476696",
  appId: "1:98337476696:web:6788d39ac76c20692cba2d",
  measurementId: "G-T35PKKSS7N"
});

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [authState, setAuthState] = React.useState({ status: "loading" });
  const [createUser] = useMutation(CREATE_USER);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
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
    const variables = {
      userId: data.user.uid,
      name: formData.name,
      username: formData.username,
      email: data.user.email,
      bio: "",
      website: "",
      profileImage: defaultUserImage,
      phoneNumber: ""
    }
    await createUser({ variables })
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
          signOut,
          signUpWithEmailAndPassword
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;