import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../pages/login";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    // const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);     // ✅ update user from Firebase
            setLoading(false);        // ✅ stop loading when state is known
        });

        return () => unsubscribe(); // cleanup
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {!loading &&children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => { return useContext(AuthContext) };