import { X } from "lucide-react";
import React, { useState } from "react";
import { handleJoinRoom } from "./DataContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext.jsx';
import {useDB} from './DataContext.jsx'

const JoinRoomPopup = ({ isOpen, onClose }) => {
  const {roomcode, setRoomCode} = useDB();
  const [maxLimit, setMaxLimit] = useState(null);
  const { user, displayName } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) {
    console.log("Popup is closed");
    return null
  };

  return (
    <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-[#1E293B] text-[#F8FAFC] rounded-2xl p-8 w-[90%] max-w-md relative shadow-[0_4px_30px_rgba(251,113,133,0.2)]">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#FB7185] transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-heading font-bold text-center mb-6"
        >
          Join a Room
        </h2>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter Room Code"
          // value={roomcode}
          onChange={(e) => setRoomCode(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-[#0F172A] text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] font-body mb-4"
        />

        {/* msg if max room limit reached */}
        {maxLimit}

        {/* Join Button */}
        <button
          className="w-full bg-[#FB7185] text-[#0F172A] hover:bg-[#FACC15] font-subheading font-semibold py-2 rounded-lg transition-colors"
          onClick={async () => {
            if (!roomcode) {
              setMaxLimit(<div>Enter a Room code</div>)
              return
            }
            // join logic here
            else {
              const result = await handleJoinRoom(user, roomcode, displayName)
              if (result === 'Not_Found') {
                setMaxLimit(<div>This room does not exist</div>)
              }
              if (result === 'proceed') {
                setTimeout(() => navigate('/app'), 100);
                console.log("Joining room:", roomcode);
              }
            }
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPopup;
