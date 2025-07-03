import React from 'react';

const LoadingDots = ({text="Loading"}) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex space-x-1.5 mb-3">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.1s]"></span>
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"></span>
            </div>
            <p className="text-sm text-[#F8FAFC] font-medium">{text}...</p>
        </div>
    );
};

export default LoadingDots;