import { useState, useEffect } from 'react'
import '../styles/App.css'
import Nav from '../components/LandingNav.jsx'
import StoryPretext from '../components/Story-pretext.jsx'
import StoryTextbox from '../components/Story-textbox.jsx'
import RoomCodeSection from '../components/RoomCodeSection.jsx'
import { db, useDB } from '../components/DataContext.jsx'
import { doc, onSnapshot } from "firebase/firestore";
import StoryPrompt from '../components/StoryPrompt.jsx'
import { useAuth } from '../components/AuthContext.jsx'
import LoadingDots from '../components/loading.jsx'
import FloatingDocButton from '../components/FloatingDocButton.jsx'
import { Navigate } from 'react-router-dom'


export default function App() {
  const { roomcode } = useDB();
  const { user } = useAuth();
  const [users, setUsers] = useState()
  const [displayNames, setDisplayNames] = useState()
  const [currentIndex, setCurrentIndex] = useState()
  const [noOfTurns, setNoOfTurns] = useState()
  const [isTurn, setIsTurn] = useState()
  const [stories, setStories] = useState()
  const uid = user.user?.uid || user.uid;

  useEffect(() => {
    const collectiveRef = doc(db, 'Rooms', roomcode, 'collective', roomcode);

    const unsubscribe = onSnapshot(collectiveRef, (collectiveSnap) => {
      if (collectiveSnap.exists()) {
        const data = collectiveSnap.data();
        setUsers(data.users);
        setDisplayNames(data.displayName)
        setCurrentIndex(data.currentIndex);
        setNoOfTurns(data.noOfTurns);
        setIsTurn(data.users[data.currentIndex])
        setStories(data.stories)
      } else {
        console.log("Document does not exist");
      }
    });

    // Clean up listener when component unmounts
    return () => unsubscribe();
  }, [roomcode]);

  const getLastLines = (str, count = 2) => {
    // Prefer newline-based split if available, else fallback to periods
    const lines = str.includes('\n')
      ? str.trim().split('\n')
      : str.trim().split('.');

    // Clean up: remove empty/whitespace-only lines and trim each
    const clean = lines.map(s => s.trim()).filter(Boolean);

    // Get the last `count` lines
    const lastLines = clean.slice(-count);

    // Join with space or newline based on original format
    return str.includes('\n')
      ? lastLines.join('\n')
      : lastLines.join('. ') + '.';
  };


  const pretext = () => {

    if ((!users) || (!displayNames) || (currentIndex === undefined)) {
      return <span>Loading...</span>;
    }

    if (noOfTurns === 0 && uid == isTurn) {
      return <StoryPrompt roomcode={roomcode} />
    }
    //uid == isTurn = is this current player's turn?
    else if (uid == isTurn) {
      return <span>{getLastLines(stories.at(-1), 2)}</span>
    }
    else {
      return <span>Currently its {displayNames[currentIndex]}'s Turn</span>
    }
  }

  return (
    <>
      {!roomcode && <Navigate to={'/landing'} />}
      <RoomCodeSection />
      <StoryPretext pretext={pretext()} />
      <StoryTextbox isTurn={uid == isTurn} roomcode={roomcode} user={user} />
      <FloatingDocButton noOfTurns={noOfTurns}/>
    </>
  )
}