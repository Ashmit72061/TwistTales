import { useState, useEffect } from 'react'
import { useAuth } from './AuthContext.jsx'
import { useNavigate } from "react-router-dom"
import { Lock } from 'lucide-react'
import JoinRoomPopup from './JoinRoomPopup.jsx'
import { handleCreateRoom as newRoomCode } from './DataContext.jsx'
import { useDB } from './DataContext.jsx'
import LoadingDots from './loading.jsx'

const Nav = () => {
    const { user, loading, displayName } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [creatingRoom, setCreatingRoom] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const { setRoomCode } = useDB();
    const { logout } = useAuth()
    let isMobile = useDeviceType();

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
        const { displayName, setDisplayName, photoURL, setPhotoURL } = useAuth();
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

        if (user && !loading) {

            return (
                <div
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    <div className="flex items-center gap-2 cursor-pointer">
                        {photoURL && (<img src={photoURL} alt="pfp" className="w-5 h-5 rounded-full" />)}
                        <span className="hover:text-[#2DD4BF] transition">{displayName}</span>
                    </div>

                    {!isMobile && dropdownOpen && (
                        <ul className="absolute right-0 top-full bg-[#334155] text-[#F8FAFC] shadow-lg rounded-lg p-2 min-w-[120px] z-50">
                            <li
                                className="hover:text-[#2DD4BF] px-2 py-0.5 cursor-pointer transition flex justify-center items-center"
                                onClick={logout}
                            >
                                Logout
                            </li>
                        </ul>
                    )}
                </div>
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

    function useDeviceType() {
        const [isMobile, setIsMobile] = useState(false);

        useEffect(() => {
            const checkDevice = () => {
                setIsMobile(window.matchMedia('(max-width: 768px)').matches);
            };

            checkDevice();
            window.addEventListener('resize', checkDevice);
            return () => window.removeEventListener('resize', checkDevice);
        }, []);

        return isMobile;
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        // Listen to scroll event
        window.addEventListener('scroll', handleScroll);

        // Initial check (in case already scrolled)
        handleScroll();

        // Clean up on unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [window.scrollY]);

    let isUser = (user) ? true : false;

    const [openJoinRoomPopup, setJoinRoomPopup] = useState(false)
    const navigate = useNavigate();

    const handleCreateRoom = async () => {
        setCreatingRoom(true);
        try {

            const roomcode = await newRoomCode(user, displayName);
            setRoomCode(roomcode);
            navigate('/app')
        }
        catch (error) {
            console.error("Failed Creating room: ", error);
        }
        finally { setCreatingRoom(false) }
    }

    return (
        <>
            {(!isMobile)
                ? (<nav className={`text-[#F8FAFC] bg-[#1E293B] flex fixed justify-between py-[1vh] px-[2vw] z-1000 font-heading items-center transition-all duration-300 ease-in-out
                ${(!isScrolled)
                        ? "left-1/2 -translate-x-1/2 top-[3vh] w-[80vw] rounded-[12px]"
                        : "left-0 translate-x-0 w-full top-0 rounded-none"}`}>
                    <div className='!text-[4vw]' onClick={() => { navigate('/landing') }}>TwistTales</div>
                    <div>
                        <ul className='flex gap-[1.5vw] items-center cursor-pointer'>
                            <li onClick={() => { setJoinRoomPopup(true) }}><LockedFeature label="Join Room" isLocked={!isUser} /></li>
                            {(!creatingRoom)
                                ? (<li onClick={() => { handleCreateRoom(user) }}><LockedFeature label="Create Room" isLocked={!isUser} /></li>)
                                : <LoadingDots text={'Creating Room'} />
                            }
                            {isUser && <JoinRoomPopup isOpen={openJoinRoomPopup} onClose={() => { setJoinRoomPopup(false) }} />}
                        </ul>
                    </div>
                    <UserLogin user={user} loading={loading} />
                </nav>)

                : (<nav className={`text-[#F8FAFC] bg-[#1E293B] flex flex-col fixed justify-between py-4 px-4 z-1000 font-heading  transition-all duration-300 ease-in-out
                    ${(!isScrolled)
                        ? "left-1/2 -translate-x-1/2 top-[4vh] w-[85vw] rounded-[12px]"
                        : "left-0 translate-x-0 w-full top-0 rounded-none"}`}>
                    <div className='flex justify-between items-center'>
                        <div className='!text-2xl' onClick={() => { navigate('/landing') }}>TwistTales</div>
                        <div className='flex flex-col gap-1' onClick={() => setShowMenu(prev => !prev)}>
                            <div className="hamburger h-[3px] w-6 bg-[#F8FAFC] rounded-full"></div>
                            <div className="hamburger h-[3px] w-6 bg-[#F8FAFC] rounded-full"></div>
                            <div className="hamburger h-[3px] w-6 bg-[#F8FAFC] rounded-full"></div>
                        </div>
                    </div>
                    {showMenu && <div className='flex flex-col items-center justify-center justify-right pt-3'>
                        <ul className='flex flex-col gap-2 items-center justify-center cursor-pointer'>
                            <li onClick={() => { setJoinRoomPopup(true) }}><LockedFeature label="Join Room" isLocked={!isUser} /></li>
                            {(!creatingRoom)
                                ? (<li onClick={() => { handleCreateRoom(user) }}><LockedFeature label="Create Room" isLocked={!isUser} /></li>)
                                : <LoadingDots text={'Creating Room'} />
                            }
                            <li><UserLogin user={user} loading={loading} /></li>
                            {isUser && <li onClick={logout} className='text-[#F8FAFC] hover:text-[#2DD4BF] text-xl'>Signout</li>}
                            {isUser && <JoinRoomPopup isOpen={openJoinRoomPopup} onClose={() => { setJoinRoomPopup(false) }} />}
                        </ul>
                    </div>}
                </nav>)
            }
        </>
    )
}

export default Nav;