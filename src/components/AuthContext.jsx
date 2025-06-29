import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../pages/login";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [displayName, setDisplayName] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);

    // const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);     // ✅ update user from Firebase
            setLoading(false);        // ✅ stop loading when state is known
        });

        return () => unsubscribe(); // cleanup
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null); // Clear user state
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout, displayName, setDisplayName, photoURL, setPhotoURL }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => { return useContext(AuthContext) };