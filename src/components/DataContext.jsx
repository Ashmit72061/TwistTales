import { useState, useEffect, createContext, useContext } from 'react'
import { app } from '../pages/login.jsx'
import { getFirestore, doc, getDoc, setDoc, addDoc, updateDoc, collection, getCountFromServer } from "firebase/firestore";

const DataContext = createContext();

export const db = getFirestore(app)


function generateRoomCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}
async function createUniqueRoomCode() {
    let isUnique = false;
    let roomCode = '';

    while (!isUnique) {
        roomCode = generateRoomCode();
        const roomRef = doc(db, "Rooms", roomCode);
        const roomSnap = await getDoc(roomRef);

        if (!roomSnap.exists()) {
            isUnique = true;
        }
    }

    return roomCode;
}

const handleCreateRoom = async (user, displayName) => {
    const uid = user.user?.uid || user.uid;
    const colors = ['red', 'blue', 'green', 'yellow']
    const firstColor = colors[Math.floor(Math.random() * colors.length)]
    const newCode = await createUniqueRoomCode();

    try {
        const docRef = await setDoc(doc(db, 'Rooms', newCode), {
            roomcode: newCode,
        })
        const individualRef = await setDoc(doc(db, 'Rooms', newCode, 'individual', 'Room Creator info'), {
            color: firstColor,
            sequence: 0,
            user: uid,
        })
        const collectiveRef = await setDoc(doc(db, 'Rooms', newCode, 'collective', newCode), {
            colorLeft: colors.filter(color => color !== firstColor),
            users: [uid],
            displayName: [displayName],
            [uid]: firstColor,
            currentIndex: 0,
            noOfTurns: 0,
        })
    }
    catch (error) {
        console.error("Error creating room:", error);
    }

    return newCode;
};

const handleJoinRoom = async (user, roomcode, displayName) => {
    const uid = user.user?.uid || user.uid;
    const roomsAvailablesnap = await getDoc(doc(db, 'Rooms', roomcode))
    // const { displayName } = useAuth();

    if (!roomsAvailablesnap.exists()) {
        return (<div>This Room Does not exist</div>)
    }
    //if roomcode is valid
    else {
        const roomsCollective = await getDoc(doc(db, 'Rooms', roomcode, 'collective', roomcode))
        const alreadyUser = false;
        const userColor = roomsCollective.data().colorLeft[Math.floor(Math.random() * roomsCollective.data().colorLeft.length)]
        try {
            if (roomsCollective.data().users.includes(uid)) {
                console.log("Already existing user added");
                return 'proceed';
            }
            else if (roomsCollective.data().users.length < 4 && !roomsCollective.data().users.includes(uid)) {
                const addUser = await updateDoc(doc(db, 'Rooms', roomcode, 'collective', roomcode), {
                    users: [...roomsCollective.data().users, uid],
                    displayName: [...roomsCollective.data().displayName, displayName],
                    colorLeft: roomsCollective.data().colorLeft.filter(color => color !== userColor),
                    [uid]: userColor,
                })
                return 'proceed'
            }
            else {
                return 'Not_Found'
            }
        }
        catch (error) {
            console.error("Error joining room:", error);
        }
    }
}

const handleAddStory = async (story, roomcode, user) => {
    const uid = user.user?.uid || user.uid;

    const roomsCollective = await getDoc(doc(db, 'Rooms', roomcode, 'collective', roomcode))
    const snapshot = await getCountFromServer(collection(db, 'Rooms', roomcode, 'individual'))
    const count = snapshot.data().count;
    try {
        const addStory = await addDoc(collection(db, 'Rooms', roomcode, 'individual'), {
            color: roomsCollective.data()[uid],
            sequence: count,
            user: uid,
            storySnippet: story,
        })
        const nextIndex = (roomsCollective.data().currentIndex + 1 > roomsCollective.data().users.length - 1) ? 0 : roomsCollective.data().currentIndex + 1
        const nextTurn = roomsCollective.data().noOfTurns+1;
        const changeTurn = await updateDoc(doc(db, 'Rooms', roomcode, 'collective', roomcode), {
            currentIndex: nextIndex,
            noOfTurns: nextTurn,
            stories: [...(roomsCollective.data().stories || []), story],
        });
    }
    catch (error) {
        console.error("Error posting story:", error);
    }
}

export const DataProvider = ({ children }) => {

    const [roomcode, setRoomCode] = useState(null);


    return (
        <DataContext.Provider value={{ roomcode, setRoomCode }}>
            {children}
        </DataContext.Provider>
    )
}

export const useDB = () => useContext(DataContext)
export { handleCreateRoom, handleJoinRoom, handleAddStory };