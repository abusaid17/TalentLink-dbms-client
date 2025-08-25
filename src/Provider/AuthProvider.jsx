import { createContext, useEffect, useState, } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, } from "firebase/auth";
import app from "../firebase/firebase.config"
// import axios from "axios";

const auth = getAuth(app);

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // google Provider

    const googleProvider = new GoogleAuthProvider()

    // For Create User Or for register
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // For Login or signIn user user 
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Google sign in
    const GoogleLogin = () => {
        setLoading();
        return signInWithPopup(auth, googleProvider)
    }


    // for log Out 
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // console.log("User  ",currentUser)             
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [auth])


    const userInfo = {
        user,
        loading,
        createUser,
        signInUser,
        logOut,
        GoogleLogin,

    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;