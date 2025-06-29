import { useState, useEffect } from 'react'
import { db, useDB } from './DataContext.jsx';
import { onSnapshot, doc } from "firebase/firestore";

const RoomCodeSection = () => {
    const { roomcode } = useDB();
    const [DisplayNameArr, setDisplayNameArr] = useState();
    const [uidArr, setUidArr] = useState();
    const [playersObject, setPlayersObject] = useState([]);
    const [currentTurn, setCurrentTurn] = useState();

    console.log("Room code: ", roomcode);

    useEffect(() => {
        if (!roomcode) return;

        const docRef = doc(db, 'Rooms', roomcode, 'collective', roomcode);

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                const displayNames = data.displayName;
                const uids = data.users;
                const turn = data.currentIndex;

                setDisplayNameArr(displayNames);
                setUidArr(uids);
                setCurrentTurn(turn);

                const objArr = [];
                for (let i = 0; i < uids.length; ++i) {
                    objArr.push({
                        name: displayNames[i],
                        color: data[uids[i]],
                    });
                }

                setPlayersObject(objArr);
            }
        });

        return () => unsubscribe();
    }, [roomcode]);

    return (
        <section className="bg-[#1E293B] text-[#F8FAFC] w-full py-4 px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-b-xl border-b-2 border-[#2DD4BF] shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
            <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#FACC15]">Room Code: <span className="tracking-widest">{roomcode}</span></h2>
            </div>
            <div className="flex gap-4 flex-wrap">
                {/* Example Players */}
                {playersObject.map((player, index) => (
                    <div
                        key={indexedDB}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A] border border-[#334155]
                            ${index === currentTurn ? 'ring-2 ring-[#FACC15] ring-offset-2' : ''}`
                        }
                    >
                <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: player.color }}
                ></div>
                <span className="text-sm font-medium text-[#94A3B8]">{player.name}</span>
            </div>
                ))}
        </div>

            {
        playersObject.length === 0 && (
            <div className="text-sm text-[#94A3B8]">Waiting for players to join...</div>
        )
    }
        </section >

    )
}

export default RoomCodeSection;