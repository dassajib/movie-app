import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCBW0Iakl_bXOoYmyiPxd6DvNOlol2w9AE",
  authDomain: "movie-watchlist-f468c.firebaseapp.com",
  projectId: "movie-watchlist-f468c",
  storageBucket: "movie-watchlist-f468c.appspot.com",
  messagingSenderId: "989420175873",
  appId: "1:989420175873:web:1ed62f2287107d9b957600"
}

export const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
