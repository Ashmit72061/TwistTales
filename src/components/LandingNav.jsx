import { useState, useEffect } from 'react'
import { useAuth } from './AuthContext.jsx'
import { useNavigate } from "react-router-dom"
import { Lock } from 'lucide-react'
import JoinRoomPopup from './JoinRoomPopup.jsx'
import { handleCreateRoom as newRoomCode } from './DataContext.jsx'
import { useDB } from './DataContext.jsx'


const LockedFeature = ({ label, isLocked = true }) => {
    return (
        <div className='relative inline-block'>
            {isLocked && <Lock className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-7 w-7 pointer-events-none' />}
            <span className={`text-lg ${isLocked ? "text-gray-400" : "text-[#F8FAFC] hover:text-[#2DD4BF]"}`}>{label}</span>
        </div>
    )
}

const UserLogin = ({ user, loading }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { logout, displayName, setDisplayName, photoURL, setPhotoURL } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !loading) {
            setDisplayName(user.user?.displayName || user.displayName);
            if (!user.user?.displayName && !user.displayName) {
                const email = user.user?.email || user.email;
                setDisplayName(email.split('@')[0]);
            }
            setPhotoURL(user.user?.photoURL || user.photoURL);
        }
    }, [user, loading]);

    console.log(user)
    if (user && !loading) {

        return (
            <li
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
            >
                <div className="flex items-center gap-2 cursor-pointer">
                    {photoURL && (<img src={photoURL} alt="pfp" className="w-5 h-5 rounded-full" />)}
                    <span className="hover:text-[#2DD4BF] transition">{displayName}</span>
                </div>

                {dropdownOpen && (
                    <ul className="absolute right-0 top-full bg-[#334155] text-[#F8FAFC] shadow-lg rounded-lg p-2 min-w-[120px] z-50">
                        <li
                            className="hover:text-[#2DD4BF] px-2 py-0.5 cursor-pointer transition flex justify-center items-center"
                            onClick={logout}
                        >
                            Logout
                        </li>
                    </ul>
                )}
            </li>
        );
    }
    else {
        return (
            <li className='bg-[#f43f5e] text-white px-4 py-1 rounded cursor-pointer hover:bg-[#FB7185] transition-all duration-200'>
                <button onClick={() => { navigate('/login') }}>Login</button>
            </li>
        )
    }
}

const Nav = () => {
    const { user, loading, displayName } = useAuth();
    const { setRoomCode } = useDB();

    let isUser = (user) ? true : false;

    const [openJoinRoomPopup, setJoinRoomPopup] = useState(false)
    const navigate = useNavigate();

    const handleCreateRoom = async (user) => {
        const roomcode = await newRoomCode(user, displayName);
        setRoomCode(roomcode);
        navigate('/app')
    }

    return (
        // <nav className='text-[#F8FAFC] bg-[#1E293B] flex justify-between w-[100vw] fixed top-0 z-1000 py-[1vh] px-[2vw] font-heading items-center'>
        <nav className='text-[#F8FAFC] bg-[#1E293B] flex justify-between w-[100vw] py-[1vh] px-[2vw] font-heading items-center'>
            <div className='!text-[4vw]' onClick={() => { navigate('/landing') }}>Story Roullete</div>
            <div>
                <ul className='flex gap-[1.5vw] items-center cursor-pointer'>
                    <li onClick={() => { setJoinRoomPopup(true) }}><LockedFeature label="Join Room" isLocked={!isUser} /></li>
                    <li onClick={() => { handleCreateRoom(user) }}><LockedFeature label="Create Room" isLocked={!isUser} /></li>
                    <UserLogin user={user} loading={loading} />
                    {isUser && <JoinRoomPopup isOpen={openJoinRoomPopup} onClose={() => { setJoinRoomPopup(false) }} />}
                </ul>
            </div>
        </nav>
    )
}

export default Nav;