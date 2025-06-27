import React from 'react'
import {Lock} from 'lucide-react'

const LockedFeature = ({label, isLocked=true})=>{
    return(
        <div className='relative inline-block'>
            {isLocked && <Lock className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-7 w-7 pointer-events-none'/>}
            <span className={`text-lg ${isLocked ? "text-gray-400" : "text-[#F8FAFC] hover:text-[#2DD4BF]"}`}>{label}</span>
        </div>
    )
}

const Nav = () =>{
    return(
        // <nav className='text-[#F8FAFC] bg-[#1E293B] flex justify-between w-[100vw] fixed top-0 z-1000 py-[1vh] px-[2vw] font-heading items-center'>
        <nav className='text-[#F8FAFC] bg-[#1E293B] flex justify-between w-[100vw] py-[1vh] px-[2vw] font-heading items-center'>
            <div className='!text-[4vw]'>Story Roullete</div>
            <div>
                <ul className='flex gap-[1.5vw] items-center cursor-pointer'>
                    <li><LockedFeature label = "Join Room" /></li>
                    <li><LockedFeature label = "Create Room" /></li>
                    <li className='bg-[#f43f5e] text-white px-4 py-1 rounded cursor-pointer hover:bg-[#FB7185] transition-all duration-200'>Login</li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;