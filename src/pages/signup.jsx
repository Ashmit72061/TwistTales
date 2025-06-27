import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from '../components/AuthContext.jsx'


const Signup = () => {
    const { user, setUser } = useAuth();

    const firebaseConfig = {
        apiKey: "AIzaSyCGOVuAByYvVwB8y7kH69Q6kMmCTxn1MYU",
        authDomain: "story-roulette-aa649.firebaseapp.com",
        projectId: "story-roulette-aa649",
        storageBucket: "story-roulette-aa649.firebasestorage.app",
        messagingSenderId: "984178771067",
        appId: "1:984178771067:web:5e83c323553d2a8eeacede",
        measurementId: "G-84M15X7CHQ"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
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
            });
    }

    //Check if user is logged in
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is logged in:", user.uid);
        } else {
            console.log("No user");
        }
    });

    //Email signup states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    function handleLogin(email, password) {
        navigate('/login')
    }


    function handleSignup(email, password) {
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("Signed up:", userCredential.user);
                    setUser(userCredential)
                    navigate('/landing')
                })
                .catch((error) => {
                    console.error("Signup Error:", error.message);
                });
        }
        else {
            alert("Passwords dont match")
        }
    }

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
            <div className="bg-[#1E293B] text-[#F8FAFC] w-full max-w-md p-8 rounded-2xl shadow-[0_4px_30px_rgba(45,212,191,0.1)]">
                <h2 className="text-3xl font-heading font-bold text-center mb-6">
                    Welcome
                </h2>

                <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    handleSignup(email, password);
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
                    <div>
                        <label className="block mb-1 text-sm font-body text-[#94A3B8]">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full p-3 rounded-xl bg-[#0F172A] text-[#F8FAFC] border-2 border-[#2DD4BF] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FACC15] font-body"
                            placeholder="••••••••"
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#FB7185] text-[#0F172A] font-semibold py-3 rounded-xl hover:bg-[#f43f5e] transition-colors duration-200 font-body"
                    >
                        Sign Up
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
                    onClick={handleLogin}
                >
                    Login
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

export default Signup;