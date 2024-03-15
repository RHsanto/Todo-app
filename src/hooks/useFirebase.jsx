/* eslint-disable no-unused-vars */
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { useEffect, useState } from "react";

import initAuthentication from "../Components/Firebase/Firebase-init";

// firebase inti
initAuthentication();

const useFirebase = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  // Google
  const signInUsingGoogle = async () => {
    try {
      return await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
    }
  };

  //  here use ing logout
  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(error => {
        // An error happened.
      })
      .finally();
  };

  // observer user state
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    });
    return () => unsubscribed;
  }, [auth]);

  return {
    signInUsingGoogle,
    logOut,
    error,
    user,
  };
};

export default useFirebase;
