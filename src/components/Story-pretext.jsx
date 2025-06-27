import React from 'react';

const StoryPretext = ({
  pretext = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
}) => {
  return (
    <div className="bg-[#1E293B] border border-[#2DD4BF] text-[#F8FAFC] p-4 rounded-2xl shadow-[0_4px_30px_rgba(45,212,191,0.2)] max-w-[68vw] mx-auto my-[4vh]">
      <span className="block font-body text-base leading-snug">
        {pretext}
      </span>
    </div>
  );
};

export default StoryPretext;