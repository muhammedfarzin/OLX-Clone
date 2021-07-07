import { createContext, useState } from 'react'
import firebase from '../firebase/config'
import admin from 'firebase/app'

export const firebaseContext = createContext(null)
export const authContext = createContext(null)
export const allPlaceContext = createContext(null)

export default function Context({ children }) {
    const [user, setUser] = useState()
    const [userLocation, setUserLocation] = useState("India")
    const [favorites, setFavorites] = useState()
    const [userDoc, setUserDoc] = useState()

    user && firebase.firestore().collection('users').where("id", "==", user.uid).get().then(snapshot => {
        setUserLocation(snapshot.docs[0].data().place)
        setFavorites(snapshot.docs[0].data().favorites)
        setUserDoc(snapshot.docs[0].id)
    })

    return (
        <firebaseContext.Provider value={{ firebase, admin, favorites, setFavorites }}>
            <authContext.Provider value={{ user, setUser, userLocation, setUserLocation, userDoc }}>
                {children}
            </authContext.Provider>
        </firebaseContext.Provider>
    )
}
