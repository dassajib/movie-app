import { createContext, useContext, useEffect, useState } from 'react'
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
} from 'firebase/firestore'

import { auth, db } from '../firebase'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [watchlist, setWatchlist] = useState([])
    const [loading, setLoading] = useState(true)

    // load watchlist when user logs in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser)
            if (firebaseUser) {
                const docRef = doc(db, 'users', firebaseUser.uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setWatchlist(docSnap.data().watchlist || [])
                } else {
                    await setDoc(docRef, { watchlist: [] })
                    setWatchlist([])
                }
            } else {
                setWatchlist([])
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    // sign up
    const signup = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
    }

    // log in existing user
    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
    }

    // log out
    const logout = async () => {
        await signOut(auth)
        setUser(null)
        setWatchlist([])
    }

    // add/remove movie from watchlist
    const toggleWatchlist = async (movie) => {
        if (!user) return
        const exists = watchlist.some((item) => item.id === movie.id)
        const updatedWatchlist = exists
            ? watchlist.filter((item) => item.id !== movie.id)
            : [...watchlist, movie]

        setWatchlist(updatedWatchlist)
        const docRef = doc(db, 'users', user.uid)
        await updateDoc(docRef, { watchlist: updatedWatchlist })
    }

    // check if movie is in watchlist
    const isInWatchlist = (id) => {
        return watchlist.some((item) => item.id === id)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                watchlist,
                login,
                signup,
                logout,
                toggleWatchlist,
                isInWatchlist,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
