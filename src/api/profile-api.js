import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {FIREBASE_CONFIG} from "../core/config";

// firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();

export const fetchProfile = async (uid) => {
  try {
    const snapshot = await db.collection('Profile').get()
    snapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data())
    })
  } catch (e) {
    console.log('get-profile-ex:', e.message)
  }
};
