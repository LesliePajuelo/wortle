import React, { useState, useEffect, useContext } from "react";
import { auth, database } from "../lib/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, loading, error] = useAuthState(auth);

  // TODO - consider useDocumentData instead
  const [documentData, documentLoading, documentError] = useDocument(user ? doc(database, "users", user.uid) : null);

  async function signup(email, password) {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data;
  }

  async function removeUserOnSignupError(user) {
    return deleteUser(user);
  }

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  const value = {
    user,
    loading,
    error,
    documentData,
    documentLoading,
    documentError,
    signup,
    removeUserOnSignupError,
    login,
    logout,
    resetPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
