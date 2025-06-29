import { useState } from 'react'
import { useAuth } from './AuthContext.jsx'
import { useNavigate } from "react-router-dom"
import { Lock } from 'lucide-react'
import JoinRoomPopup from './JoinRoomPopup.jsx'


const LockedFeature = ({ label, isLocked = true }) => {
    return (
        <div className='relative inline-block'>
            {isLocked && <Lock className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-7 w-7 pointer-events-none' />}
            <span className={`text-lg ${isLocked ? "text-gray-400" : "text-[#F8FAFC] hover:text-[#2DD4BF]"}`}>{label}</span>
        </div>
    )
}

const UserLogin = ({ user, loading }) => {
    const navigate = useNavigate();

    console.log(user)
    if (user && !loading) {
        return (
            <>
                <li><img src={user.user?.photoURL || user.photoURL} alt="pfp" className="w-5 h-5 rounded-full" /></li>
                <li>{user.user?.displayName || user.displayName}</li>
            </>
        )
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
    const { user, loading } = useAuth();
    let isUser = (user) ? true : false;
    const [openJoinRoomPopup, setJoinRoomPopup] = useState(false)
    const navigate = useNavigate();


    return (
        // <nav className='text-[#F8FAFC] bg-[#1E293B] flex justify-between w-[100vw] fixed top-0 z-1000 py-[1vh] px-[2vw] font-heading items-center'>
        <nav className='text-[#F8FAFC] bg-[#1E293B] flex justify-between w-[100vw] py-[1vh] px-[2vw] font-heading items-center'>
            <div className='!text-[4vw]' onClick={()=>{navigate('/landing')}}>Story Roullete</div>
            <div>
                <ul className='flex gap-[1.5vw] items-center cursor-pointer'>
                    <li onClick={() => { setJoinRoomPopup(true) }}><LockedFeature label="Join Room" isLocked={!isUser} /></li>
                    <li onClick={() => {navigate('/app')}}><LockedFeature label="Create Room" isLocked={!isUser} /></li>
                    <UserLogin user={user} loading={loading} />
                    {isUser && <JoinRoomPopup isOpen={openJoinRoomPopup} onClose={() => { setJoinRoomPopup(false) }} />}
                </ul>
            </div>
        </nav>
    )
}

export default Nav;