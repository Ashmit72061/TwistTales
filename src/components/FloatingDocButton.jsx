import { useState } from 'react';
import { FileText, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const FloatingDocButton = ({ noOfTurns }) => {
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50" onClick={() => {
        if (noOfTurns <= 1) {
          setPopup(true);
        } else {
          navigate('/final-story');
        }
      }}>
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition">
          <FileText size={20} />
        </button>
      </div>

      {/* Popup Modal */}
      {popup && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-[#1E293B] text-[#F8FAFC] rounded-2xl p-8 w-[90%] max-w-md relative shadow-[0_4px_30px_rgba(251,113,133,0.2)]">
            {/* Close Icon */}
            <button
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#FB7185] transition-colors"
              onClick={() => setPopup(false)}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Heading */}
            <h2 className="text-2xl font-heading font-bold text-center mb-6">
              Add something to the story before seeing the final version.
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingDocButton;
