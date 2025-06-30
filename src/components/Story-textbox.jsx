import React, { useState } from 'react';
import { handleAddStory } from './DataContext.jsx'

const StoryTextbox = ({ isTurn, roomcode, user }) => {
    const [text, setText] = useState('');

    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;

    return (
        <div className="max-w-[68vw] mx-auto">
            <textarea
                value={text}
                onChange={(e) => {
                    if (isTurn) {
                        setText(e.target.value)
                    }
                }}
                onClick={() => {
                    if (!isTurn) {
                        alert("Currently it's not your turn. Wait for your turn!!");
                    }
                }}
                placeholder="Enter your story snippet here..."
                className="w-full min-h-[40vh] p-4 bg-[#0F172A] text-[#F8FAFC] placeholder-[#94A3B8] border-2 border-[#2DD4BF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FACC15] font-body text-base resize-none shadow-md"
            ></textarea>
            <div className='flex justify-between'>
                <button
                    className="mt-2 px-[3vw] py-2 bg-[#FB7185] text-[#0F172A] font-semibold rounded-xl shadow-md hover:bg-[#f43f5e] transition-colors duration-200 font-body"
                    onClick={()=>{handleAddStory(text, roomcode, user)}}
                >
                    Add to the story
                </button>
                <div className="text-[#94A3B8] font-body text-sm mt-2">Word Count: {wordCount}</div>
            </div>
        </div>
    );
};

export default StoryTextbox;
