import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, PenTool, Shuffle, Sparkles, BookOpen, Clock, Target, EyeIcon } from 'lucide-react';
import { useDB } from '../components/DataContext.jsx'
import { useAuth } from '../components/AuthContext.jsx'
import Nav from "../components/LandingNav.jsx"
import HeroIllustration from '../assets/book-writer-illustration.svg'
import { TextGenerateEffect } from '../components/text-generate-effect.jsx'
import { useNavigate } from 'react-router-dom';
import { handleCreateRoom as newRoomCode } from '../components/DataContext.jsx'
import JoinRoomPopup from '../components/JoinRoomPopup.jsx'
import LoadingDots from '../components/loading.jsx'



export default function LandingPage() {
  const { user, loading, displayName } = useAuth();
  const [creatingRoom, setCreatingRoom] = useState(false)
  let isUser = (user) ? true : false;

  const { setRoomCode } = useDB();

  const steps = [
    {
      title: "See the Ending",
      description: "You only get to see the last line of a chaotic story.",
      icon: <EyeIcon className="w-8 h-8" />,
    },
    {
      title: "Write the Start",
      description: "Write a 100-word story that leads to that mysterious ending.",
      icon: <PenTool className="w-8 h-8" />,
    },
    {
      title: "Pass the Twist",
      description: "The next player sees only your ending and continues the madness.",
      icon: <Shuffle className="w-8 h-8" />,
    },
    {
      title: "Reveal the Chaos",
      description: "Everyone reads the stitched-together story. Laughs guaranteed.",
      icon: <Sparkles className="w-8 h-8" />,
    },
  ];

  const Prompts = () => {
    const [index, setIndex] = useState(0);
    const [key, setKey] = useState(0); // Force re-render of TextGenerateEffect

    const arr = [
      'I just found a unicorn in my bathtub. It demanded Wi-Fi and snacks before speaking its prophecy.',
      'My left sock vanished into a glowing portal. Ten minutes later, it returned... wearing sunglasses and holding a briefcase',
      "The President called—apparently, I'm now in charge of gravity. By lunchtime, three cities were already floating.",
      "We tried cloning my cat, but something went wrong. Now it speaks Latin and refuses to leave the mayor's office.",
      "I opened a cereal box and found a map to Area 51. Grandpa just nodded and said, 'It's time you knew the truth.'"
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex(prev => (prev + 1) % arr.length);
        setKey(prev => prev + 1); // Force TextGenerateEffect to restart
      }, 6000);

      return () => clearInterval(interval);
    }, []);

    return <TextGenerateEffect key={key} words={arr[index]} />;
  };

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
      <Nav />

      {/* Hero Section */}
      <div className="hero flex flex-col-reverse lg:flex-row items-center justify-between pt-[15vh] px-[5vw] gap-[4vh]">
        {/* Text Section */}
        <div className="text-[#F8FAFC] max-w-[600px] text-center lg:text-left">
          <h1 className="text-[clamp(2rem,6vw,3.5rem)] leading-tight font-heading text-[#F8FAFC]">
            Know the <span className="text-[#FACC15]">Ending</span>,<br />
            <span className="text-[#FB7185]">Create</span> the Beginning.
          </h1>
          <p className="mt-4 text-[#94A3B8] font-body text-[clamp(1rem,3vw,1.25rem)]">
            Dive into unpredictable stories — finish where others left off, and surprise the next writer.
          </p>
          <button className="mt-6 bg-[#FB7185] hover:bg-[#2DD4BF] text-[#0F172A] font-subheading py-2 px-6 rounded-full text-lg transition duration-300">
            Start Spinning
          </button>
        </div>

        {/* Illustration */}
        <div className="w-full max-w-[500px]">
          <img src={HeroIllustration} alt="Book writer illustration" className="w-full h-auto" />
        </div>
      </div>

      {/* How Prompts look */}
      <div className="mt-16 text-[#F8FAFC] flex flex-col items-center gap-6 px-4">
        <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight text-center">
          It All Began When…
        </h1>

        <div className="w-full max-w-4xl md:p-8 ring-2 ring-[#2DD4BF] shadow-[0_4px_30px_rgba(45,212,191,0.4)] rounded-2xl bg-[#0F172A]/60 backdrop-blur-md transition-all duration-300 hover:shadow-[0_6px_40px_rgba(45,212,191,0.5)]">
          <Prompts />
        </div>
      </div>

      {/* Rules */}
      <section className="py-[8vh] px-[5vw] bg-[#0F172A] text-[#F8FAFC] font-body">
        <h2 className="text-[clamp(2rem,6vw,3rem)] font-heading text-center mb-8 text-[#FACC15]">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#1E293B] p-6 rounded-2xl text-center shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4 flex justify-center text-[#FB7185]">
                {step.icon}
              </div>
              <h3 className="font-subheading text-xl text-[#F8FAFC] mb-2">{step.title}</h3>
              <p className="text-[#94A3B8]">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Join Room */}
      <section className="py-[10vh] px-[5vw] bg-[#1E293B] text-[#F8FAFC] text-center font-body">
        <h2 className="text-[clamp(2rem,6vw,3rem)] font-heading text-[#FACC15] mb-4">
          Ready to Twist the Tale?
        </h2>
        <p className="text-[#94A3B8] text-lg max-w-xl mx-auto mb-8">
          Join an ongoing chaos or start your own — every twist makes it better.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => { (isUser) ? setJoinRoomPopup(true) : navigate('/login') }}
            // disabled={!isUser}
            className={`py-3 px-6 rounded-full text-lg font-subheading transition duration-300 ${isUser
              ? "bg-[#FB7185] hover:bg-[#2DD4BF] text-[#0F172A]"
              : "bg-[#94A3B8]/30 cursor-not-allowed text-[#94A3B8]"
              }`}
          >
            Join Room
          </button>

          {(!creatingRoom)
            ? (<button
              onClick={() => { (isUser) ? handleCreateRoom() : navigate('/login') }}
              // disabled={!isUser}
              className={`py-3 px-6 rounded-full text-lg font-subheading transition duration-300 ${isUser
                ? "bg-[#FB7185] hover:bg-[#2DD4BF] text-[#0F172A]"
                : "bg-[#94A3B8]/30 cursor-not-allowed text-[#94A3B8]"
                }`}
            >
              Create Room
            </button>)
            : (<LoadingDots text='Creating Room' />)}
        </div>

        {!isUser && (
          <p className="text-sm text-[#F87171] mt-4" onClick={()=>{navigate('/login')}}>Login required to start or join a room.</p>
        )}
        {isUser && <JoinRoomPopup isOpen={openJoinRoomPopup} onClose={() => { setJoinRoomPopup(false) }} />}

      </section>

      {/* Footer */}
      <footer className="bg-[#1E293B] text-[#94A3B8] py-6 text-center font-body text-sm">
        <p>
          ✒️ Crafted with chaos & caffeine by <span className="text-[#FB7185] font-subheading">Ashmit Bindal</span> — where every bug tells a story.
        </p>
      </footer>

    </>
  );
}
