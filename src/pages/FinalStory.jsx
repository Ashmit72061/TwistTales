import React, { useState, useEffect } from 'react';
import { db, useDB } from '../components/DataContext.jsx'
import { doc, getDoc } from "firebase/firestore";
import LoadingDots from '../components/loading.jsx'


const FinalStory = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [gameData, setGameData] = useState();
    const [loading, setLoading] = useState(true);
    const { roomcode } = useDB();


    // Sample data - you can replace this with your actual data
    // const gameData = {
    //     prompt: prompt,
    //     players: [
    //         { name: "Alice", color: "#FB7185" },
    //         { name: "Bob", color: "#2DD4BF" },
    //         { name: "Charlie", color: "#FACC15" },
    //         { name: "Diana", color: "#86EFAC" }
    //     ],
    //     story: [
    //         { text: "The lightning illuminated the ancient library as Sarah reached for the mysterious leather-bound tome. As her fingers touched the cover, it began to glow with an otherworldly light.", player: "Alice" },
    //         { text: "Without warning, the book flew open and a swirling vortex of colors emerged from its pages. Sarah stumbled backward, knocking over a stack of books, but she couldn't look away from the mesmerizing portal.", player: "Bob" },
    //         { text: "Suddenly, a small dragon no bigger than her hand flew out of the vortex, leaving a trail of golden sparkles. It circled around Sarah's head, chirping melodiously before perching on her shoulder.", player: "Charlie" },
    //         { text: "The dragon whispered in a voice like tinkling bells, 'The Realm of Forgotten Stories needs your help, young keeper. The Narrative Weaver has gone missing, and without them, all stories will fade into nothingness.'", player: "Diana" },
    //         { text: "Sarah took a deep breath, realizing this was the adventure she had always dreamed of while organizing dusty shelves. She stepped toward the portal, feeling the electric energy crackling around her.", player: "Alice" },
    //         { text: "As she crossed the threshold, the library disappeared behind her, replaced by a landscape of floating islands connected by bridges made of rainbow light. Each island contained a different story world, and she could see characters from various tales going about their daily lives.", player: "Bob" },
    //         { text: "The little dragon guided her to the central island, where a massive loom stood silent and still. Golden threads hung loose and tangled, and Sarah understood that this was where all stories were woven together into the grand tapestry of imagination.", player: "Charlie" },
    //         { text: "With determination burning in her heart, Sarah approached the loom. As a librarian, she had always been a guardian of stories, and now she would become their weaver. The adventure was just beginning.", player: "Diana" }
    //     ],
    // };

    useEffect(() => {
        const getData = async () => {
            try {
                const dataSnap = await getDoc(doc(db, 'Rooms', roomcode, 'collective', roomcode));
                const data = dataSnap.data();

                const prompt = data.prompt;
                const displayNames = data.displayName;
                const uids = data.users;
                const stories = data.stories;

                const players = [];
                for (let i = 0; i < uids.length; ++i) {
                    players.push({
                        name: displayNames[i],
                        color: data[uids[i]],
                    });
                }

                const storyArr = []
                const numPlayers = displayNames.length;
                for (let i = 0; i < stories.length; ++i) {
                    const playerIndex = i % numPlayers;
                    storyArr.push({
                        text: stories[i],
                        player: displayNames[playerIndex]
                    });
                }

                const gameDataObj = {
                    prompt: prompt,
                    players: players,
                    story: storyArr,
                };

                setGameData(gameDataObj);
                console.log('Game Data: ', gameDataObj);
            } catch (error) {
                console.error('Failed to fetch final story data:', error)
            } finally {
                setLoading(false)
            }
        }

        getData();
    }, [roomcode]);

    const handleShare = () => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
        // Add your share logic here
    };

    const handleDownload = () => {
        // Add your download logic here
        const storyText = `Prompt: ${gameData.prompt}\n\nStory:\n${gameData.story.map(segment => `${segment.text}`).join('\n\n')}`;
        const blob = new Blob([storyText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'collaborative-story.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    if (loading || !gameData) { return (<LoadingDots />) }
    else {
        return (
            <div className="min-h-screen" style={{ backgroundColor: '#0F172A', color: '#F8FAFC' }}>
                {/* Animated Background Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-2 h-2 rounded-full animate-pulse opacity-60" style={{ backgroundColor: '#FACC15' }}></div>
                    <div className="absolute top-40 right-20 w-1 h-1 rounded-full animate-ping opacity-40" style={{ backgroundColor: '#2DD4BF' }}></div>
                    <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 rounded-full animate-pulse opacity-50" style={{ backgroundColor: '#FB7185' }}></div>
                    <div className="absolute bottom-20 right-1/3 w-1 h-1 rounded-full animate-ping opacity-30" style={{ backgroundColor: '#86EFAC' }}></div>
                    <div className="absolute top-1/2 left-20 w-1 h-1 rounded-full animate-pulse opacity-40" style={{ backgroundColor: '#FACC15' }}></div>
                    <div className="absolute top-60 right-1/4 w-1.5 h-1.5 rounded-full animate-ping opacity-30" style={{ backgroundColor: '#2DD4BF' }}></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-12">
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                            style={{
                                fontFamily: 'Quicksand, sans-serif',
                                backgroundColor: '#1E293B',
                                color: '#F8FAFC',
                                border: '1px solid #374151'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#1E293B'}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>

                        <h1
                            className="text-4xl md:text-5xl font-bold text-center"
                            style={{
                                fontFamily: 'Playfair Display, serif',
                                color: '#FACC15'
                            }}
                        >
                            Final Story
                        </h1>

                        <div className="w-20"></div> {/* Spacer for centering */}
                    </div>

                    {/* Players Legend */}
                    <div
                        className="rounded-3xl p-8 mb-12 border"
                        style={{
                            backgroundColor: '#1E293B',
                            borderColor: '#374151'
                        }}
                    >
                        <h2
                            className="text-3xl font-bold mb-6"
                            style={{
                                fontFamily: 'Playfair Display, serif',
                                color: '#FACC15'
                            }}
                        >
                            Story Contributors
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {gameData.players.map((player, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 rounded-2xl" style={{ backgroundColor: '#0F172A' }}>
                                    <div
                                        className="w-6 h-6 rounded-full border-2 shadow-lg"
                                        style={{
                                            backgroundColor: player.color,
                                            borderColor: '#F8FAFC'
                                        }}
                                    ></div>
                                    <span
                                        className="font-bold text-lg"
                                        style={{
                                            fontFamily: 'Quicksand, sans-serif',
                                            color: '#F8FAFC'
                                        }}
                                    >
                                        {player.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Initial Prompt */}
                    <div
                        className="rounded-3xl p-10 mb-12 border relative overflow-hidden shadow-2xl"
                        style={{
                            background: 'linear-gradient(135deg, #1E293B, #0F172A)',
                            borderColor: '#FACC15'
                        }}
                    >
                        <div
                            className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 -translate-y-20 translate-x-20"
                            style={{ backgroundColor: '#FACC15' }}
                        ></div>
                        <h2
                            className="text-3xl font-bold mb-6 relative z-10"
                            style={{
                                fontFamily: 'Playfair Display, serif',
                                color: '#FACC15'
                            }}
                        >
                            The Beginning Prompt
                        </h2>
                        <div
                            className="p-6 rounded-2xl relative z-10 border"
                            style={{
                                backgroundColor: '#0F172A',
                                borderColor: '#374151'
                            }}
                        >
                            <p
                                className="text-xl leading-relaxed"
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    color: '#F8FAFC'
                                }}
                            >
                                "{gameData.prompt}"
                            </p>
                        </div>
                    </div>

                    {/* The Story */}
                    <div
                        className="rounded-3xl p-10 border mb-12 shadow-2xl"
                        style={{
                            backgroundColor: '#1E293B',
                            borderColor: '#374151'
                        }}
                    >
                        <h2
                            className="text-4xl font-bold mb-10 text-center"
                            style={{
                                fontFamily: 'Playfair Display, serif',
                                background: 'linear-gradient(135deg, #FB7185, #2DD4BF)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}
                        >
                            The Collaborative Story
                        </h2>

                        <div className="space-y-8">
                            {gameData.story.map((segment, index) => {
                                const player = gameData.players.find(p => p.name === segment.player);
                                return (
                                    <div key={index} className="relative">
                                        <div className="flex items-start gap-6">
                                            <div className="flex-shrink-0 flex flex-col items-center">
                                                <div
                                                    className="w-8 h-8 rounded-full border-3 mb-3 shadow-lg"
                                                    style={{
                                                        backgroundColor: player?.color,
                                                        borderColor: '#F8FAFC'
                                                    }}
                                                ></div>
                                                {index < gameData.story.length - 1 && (
                                                    <div
                                                        className="w-1 h-12"
                                                        style={{ backgroundColor: '#374151' }}
                                                    ></div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span
                                                        className="font-bold text-sm px-4 py-2 rounded-full"
                                                        style={{
                                                            fontFamily: 'Quicksand, sans-serif',
                                                            backgroundColor: player?.color + '25',
                                                            color: player?.color,
                                                            border: `1px solid ${player?.color}50`
                                                        }}
                                                    >
                                                        {segment.player}
                                                    </span>
                                                    <span
                                                        className="text-sm font-medium"
                                                        style={{
                                                            fontFamily: 'Quicksand, sans-serif',
                                                            color: '#94A3B8'
                                                        }}
                                                    >
                                                        Round {index + 1}
                                                    </span>
                                                </div>
                                                <div
                                                    className="p-6 rounded-2xl"
                                                    style={{ backgroundColor: '#0F172A' }}
                                                >
                                                    <p
                                                        className="text-lg leading-relaxed"
                                                        style={{
                                                            fontFamily: 'Inter, sans-serif',
                                                            color: '#F8FAFC'
                                                        }}
                                                    >
                                                        {segment.text}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Final Story Text */}
                    <div
                        className="rounded-3xl p-10 border mb-12 shadow-2xl"
                        style={{
                            backgroundColor: '#1E293B',
                            borderColor: '#374151'
                        }}
                    >
                        <h2
                            className="text-3xl font-bold mb-8 text-center"
                            style={{
                                fontFamily: 'Playfair Display, serif',
                                color: '#FACC15'
                            }}
                        >
                            Complete Story
                        </h2>

                        <div
                            className="p-8 rounded-2xl mb-8"
                            style={{ backgroundColor: '#0F172A' }}
                        >
                            <p
                                className="text-lg leading-relaxed mb-6"
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    color: '#94A3B8',
                                    fontStyle: 'italic'
                                }}
                            >
                                Prompt: {gameData.prompt}
                            </p>

                            <div
                                className="text-lg leading-relaxed space-y-1"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                {gameData.story.map((segment, index) => {
                                    const player = gameData.players.find(p => p.name === segment.player);
                                    return (
                                        <span
                                            key={index}
                                            style={{ color: player?.color || '#F8FAFC' }}
                                        >
                                            {segment.text}{index < gameData.story.length - 1 ? ' ' : ''}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => {
                                    const fullStory = `${gameData.prompt}\n\n${gameData.story.map(segment => segment.text).join(' ')}`;
                                    navigator.clipboard.writeText(fullStory);
                                    setIsAnimating(true);
                                    setTimeout(() => setIsAnimating(false), 1000);
                                }}
                                className={`flex items-center gap-3 px-8 py-4 font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg mx-auto ${isAnimating ? 'animate-pulse' : ''
                                    }`}
                                style={{
                                    fontFamily: 'Quicksand, sans-serif',
                                    backgroundColor: '#FB7185',
                                    color: '#F8FAFC'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#F43F5E'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#FB7185'}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                {isAnimating ? 'Copied!' : 'Copy Story'}
                            </button>
                        </div>
                    </div>

                    {/* Footer Message */}
                    <div
                        className="text-center p-8 rounded-3xl border"
                        style={{
                            background: 'linear-gradient(135deg, #1E293B50, #0F172A50)',
                            borderColor: '#374151'
                        }}
                    >
                        <p
                            className="text-2xl font-bold mb-3"
                            style={{
                                fontFamily: 'Playfair Display, serif',
                                color: '#FACC15'
                            }}
                        >
                            ✨ A Story Worth Remembering ✨
                        </p>
                        <p
                            className="text-lg"
                            style={{
                                fontFamily: 'Quicksand, sans-serif',
                                color: '#94A3B8'
                            }}
                        >
                            Thank you for weaving this magical tale together. Every great story deserves to be shared and cherished.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default FinalStory;