// Replace with your own firebase config!
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCrzZoMP8CFFM0o4N83J4vBNnChcbG9PNc",
  authDomain: "enzle-android.firebaseapp.com",
  projectId: "enzle-android",
  storageBucket: "enzle-android.appspot.com",
  messagingSenderId: "127100415458",
  appId: "1:127100415458:web:c1fecfddbe8db246f75dbb",
  measurementId: "G-B90QJ8W6KZ"
};

const UtahRealEstate_BearerToken = '56864e8f51990c6ffa920f733f055a58'
export const UtahRealEstate_CONFIG = {
  BaseURL: 'https://resoapi.utahrealestate.com',
  Member: `/reso/odata/Member`,
  Authorization: `Bearer ${UtahRealEstate_BearerToken}`,
}