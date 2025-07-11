import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from '../components/AuthContext.jsx'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_Api_Key,
    authDomain: import.meta.env.VITE_Auth_Domain,
    projectId: import.meta.env.VITE_Project_ID,
    storageBucket: import.meta.env.VITE_Storage_Bucket,
    messagingSenderId: import.meta.env.VITE_Messaging_Sender_ID,
    appId: import.meta.env.VITE_App_ID,
    measurementId: import.meta.env.VITE_Measurement_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const Login = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [error, setError] = useState("");
    
    const provider = new GoogleAuthProvider();

    function handleGoogleLogin() {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Google Sign-in:", result.user);
                setUser(result)
                navigate('/landing')

            })
            .catch((error) => {
                console.error("Google Sign-in Error:", error);
                setError(error);
            });
    }

    //Check if user is logged in
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         console.log("User is logged in:", user.uid);
    //     } else {
    //         console.log("No user");
    //     }
    // });

    //Email login states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleLogin(email, password) {
        console.log("email is:", email, "type:", typeof email);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Logged in:", userCredential.user);
                setUser(userCredential)
                navigate('/landing')
            })
            .catch((error) => {
                console.error("Login Error:", error.message);
                setError(error.message);
            });

    }

    function handleSignup() {
        navigate('/signup')
    }

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
            <div className="bg-[#1E293B] text-[#F8FAFC] w-full max-w-md p-8 rounded-2xl shadow-[0_4px_30px_rgba(45,212,191,0.1)]">
                <h2 className="text-3xl font-heading font-bold text-center mb-6">
                    Welcome Back
                </h2>

                <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin(email, password)
                }}>
                    <div>
                        <label className="block mb-1 text-sm font-body text-[#94A3B8]">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 rounded-xl bg-[#0F172A] text-[#F8FAFC] border-2 border-[#2DD4BF] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FACC15] font-body"
                            placeholder="you@example.com"
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-body text-[#94A3B8]">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 rounded-xl bg-[#0F172A] text-[#F8FAFC] border-2 border-[#2DD4BF] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FACC15] font-body"
                            placeholder="••••••••"
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>

                    <div className="text-red-600">{error}</div>

                    <button
                        type="submit"
                        className="w-full bg-[#FB7185] text-[#0F172A] font-semibold py-3 rounded-xl hover:bg-[#f43f5e] transition-colors duration-200 font-body"
                    >
                        Login
                    </button>
                </form>

                <div className="flex items-center my-6 gap-3">
                    <hr className="flex-grow border-[#94A3B8]" />
                    <span className="text-[#94A3B8] font-body">OR</span>
                    <hr className="flex-grow border-[#94A3B8]" />
                </div>

                <button
                    type="button"
                    className="w-full mb-4 border border-[#FB7185] text-[#FB7185] font-semibold py-3 rounded-xl hover:bg-[#fb718515] transition-colors duration-200 font-body"
                    onClick={handleSignup}
                >
                    Sign Up
                </button>

                <button
                    // onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white text-[#0F172A] font-semibold py-3 rounded-xl shadow-md hover:bg-[#F8FAFC] transition-colors duration-200 font-body"
                    onClick={handleGoogleLogin}
                >
                    <FcGoogle size={22} /> Login with Google
                </button>
            </div>
        </div>

    )
}

export default Login;