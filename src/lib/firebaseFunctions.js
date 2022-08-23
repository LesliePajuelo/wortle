import { doc, updateDoc, setDoc } from "firebase/firestore";
import { database } from "../lib/firebase-config";

import {
  loadStatsFromLocalStorage,
  loadLanguagePreferenceFromLocalStorage,
  loadGameStateFromLocalStorage,
} from "../lib/localStorage";

const collectionName = "users";

// TODO - add update language pref function

// Error catching for these functions are in other handler functions.
export async function addUserData(data, starter) {
  await setDoc(doc(database, collectionName, data.uid), {
    email: data.email,
    languagePref: loadLanguagePreferenceFromLocalStorage(),
    profilePic: starter,
    stats: loadStatsFromLocalStorage(),
    gameState: loadGameStateFromLocalStorage(),
  });
}

export async function updateProfilePic(user, pokemon) {
  const updateRef = doc(database, collectionName, user.uid);

  await updateDoc(updateRef, {
    profilePic: pokemon,
  });
}

export async function updateLanguagePreference(user, language) {
  const updateRef = doc(database, collectionName, user.uid);

  await updateDoc(updateRef, {
    languagePref: language,
  });
}

export async function updateUserStats(user, stats) {
  const updateRef = doc(database, collectionName, user.uid);

  await updateDoc(updateRef, {
    stats: stats,
  });
}

export async function updateUserGameState(user, gameState) {
  const updateRef = doc(database, collectionName, user.uid);

  await updateDoc(updateRef, {
    gameState: gameState,
  });
}
