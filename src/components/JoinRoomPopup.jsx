import { X } from "lucide-react"; // For cross icon
import React, { useState } from "react";

const JoinRoomPopup = ({ isOpen, onClose }) => {
  const [roomCode, setRoomCode] = useState("");

  if (!isOpen) return null;

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
        // style={{ fontFamily: "Playfair Display, serif" }}
        >
          Join a Room
        </h2>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-[#0F172A] text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] font-body mb-4"
        //   style={{ fontFamily: "Inter, sans-serif" }}
        />

        {/* Join Button */}
        <button
          className="w-full bg-[#FB7185] text-[#0F172A] hover:bg-[#FACC15] font-subheading font-semibold py-2 rounded-lg transition-colors"
        //   style={{ fontFamily: "Quicksand, sans-serif" }}
          onClick={() => {
            if (!roomCode) {
              alert("Please enter a room code.");
              return;
            }
            // join logic here
            console.log("Joining room:", roomCode);
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPopup;
