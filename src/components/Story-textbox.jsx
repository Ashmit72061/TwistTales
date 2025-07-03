import React, { useState } from 'react';
import { handleAddStory } from './DataContext.jsx'

const StoryTextbox = ({ isTurn, roomcode, user }) => {
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const charCount = text.length;
    const maxWords = 100; // Configurable word limit

    const handleSubmit = async () => {
        if (!text.trim()) {
            alert('Please enter some text before submitting!');
            return;
        }

        if (wordCount > maxWords) {
            alert(`Please keep your story snippet under ${maxWords} words. Current: ${wordCount} words`);
            return;
        }

        if (!isTurn) {
            alert("Currently it's not your turn. Wait for your turn!!");
            return;
        }

        try {
            setIsSubmitting(true);
            await handleAddStory(text, roomcode, user);
            setText(''); // Clear the textbox after successful submission
        } catch (error) {
            console.error('Error submitting story:', error);
            alert('Failed to submit your story. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSubmit();
        }
    };

    const isOverWordLimit = wordCount > maxWords;

    return (
        <div className="w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[68vw] mx-auto px-2 sm:px-4">
            <div className="relative">
                <textarea
                    value={text}
                    onChange={(e) => {
                        if (isTurn) {
                            setText(e.target.value);
                        }
                    }}
                    onKeyDown={handleKeyPress}
                    onClick={() => {
                        if (!isTurn) {
                            alert("Currently it's not your turn. Wait for your turn!!");
                        }
                    }}
                    placeholder={isTurn ? "Enter your story snippet here... (Ctrl+Enter to submit)" : "Wait for your turn to write..."}
                    className={`w-full min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] p-3 sm:p-4 md:p-5 bg-[#0F172A] text-[#F8FAFC] placeholder-[#94A3B8] border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 font-body text-sm sm:text-base resize-none shadow-md transition-all duration-200 ${
                        isTurn 
                            ? isOverWordLimit
                                ? 'border-[#FB7185] focus:ring-[#FB7185]' 
                                : 'border-[#2DD4BF] focus:ring-[#FACC15]'
                            : 'border-[#475569] opacity-60 cursor-not-allowed'
                    }`}
                    disabled={!isTurn || isSubmitting}
                ></textarea>
                {!isTurn && (
                    <div className="absolute inset-0 bg-[#0F172A] bg-opacity-50 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <span className="text-[#94A3B8] font-semibold text-base sm:text-lg">Not your turn</span>
                    </div>
                )}
            </div>
            
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-3 sm:gap-0'>
                <button
                    className={`w-full sm:w-auto px-4 sm:px-6 md:px-8 lg:px-[3vw] py-2 sm:py-3 font-semibold rounded-lg sm:rounded-xl shadow-md transition-all duration-200 font-body text-sm sm:text-base ${
                        isTurn && text.trim() && !isOverWordLimit && !isSubmitting
                            ? 'bg-[#FB7185] text-[#0F172A] hover:bg-[#f43f5e] hover:scale-105 cursor-pointer'
                            : 'bg-[#475569] text-[#94A3B8] cursor-not-allowed opacity-60'
                    }`}
                    onClick={handleSubmit}
                    disabled={!isTurn || !text.trim() || isOverWordLimit || isSubmitting}
                >
                    {isSubmitting ? 'Adding...' : 'Add to the story'}
                </button>
                
                <div className="text-right sm:text-left lg:text-right w-full sm:w-auto">
                    <div className={`font-body text-xs sm:text-sm ${
                        isOverWordLimit ? 'text-[#FB7185]' : 'text-[#94A3B8]'
                    }`}>
                        Words: {wordCount}/{maxWords}
                    </div>
                    <div className="text-[#64748B] font-body text-xs mt-1 hidden sm:block">
                        Ctrl+Enter to submit
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryTextbox;