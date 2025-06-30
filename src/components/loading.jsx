import React from 'react';

const LoadingDots = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex space-x-2 mb-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
            </div>
            <p className="text-sm text-gray-600">Loading...</p>
        </div>
    );
};

export default LoadingDots;
