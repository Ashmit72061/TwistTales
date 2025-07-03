import React from 'react';

const StoryPretext = ({
  pretext = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
}) => {
  return (
    <section className="text-center mb-10 mt-5">
      <h2 className="text-[#FACC15] font-heading text-2xl sm:text-3xl mb-4 flex items-center justify-center gap-2">
        Your Turn to Twist the Tale
      </h2>

      <div className="bg-[#1E293B] border border-[#2DD4BF] text-[#F8FAFC] px-6 py-5 rounded-2xl shadow-[0_4px_30px_rgba(45,212,191,0.2)] mx-auto max-w-[90vw] sm:max-w-[80vw] md:max-w-[68vw]">
        <p className="font-body text-[1rem] sm:text-[1.1rem] leading-relaxed tracking-wide text-left">
          {pretext}
        </p>
      </div>
    </section>
  );
};

export default StoryPretext;
