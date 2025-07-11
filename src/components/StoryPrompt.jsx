import { useState, useEffect } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import {db, useDB} from './DataContext.jsx'

const StoryPrompt = ({roomcode}) => {
    const [prompt, setPrompt] = useState("");
    // const {roomcode} = useDB();
    // let prompt;

    const getPrompt = async () => {
        const res = await fetch("https://api.cohere.ai/v1/generate", {
            method: "POST",
            headers: {
                "Authorization": import.meta.env.VITE_Authorisation,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "command",
                prompt: `Generate a chaotic and hilarious 2-line story pretext that sets the stage for a collaborative storytelling game. It should be weird, surprising, and funny — like something absurd you'd read in a meme or hear in an improv comedy game. The story should make people laugh and wonder "What happens next?!". It should be light-hearted and weird, not dark or serious. Avoid cliches. Story should be easy to understand and most importantly absurd.
Format:
Two short, punchy sentences that feel like the start of a ridiculous story.

Example output:
"Gerald the goose had finally passed the bar exam. Now he was suing the farmer for emotional damage."

Give me just one new story pretext like this.`,
                max_tokens: 50,
                temperature: 0.9
            }),
        });

        const data = await res.json();
        setPrompt(data.generations[0]?.text.trim() || "No prompt received.");
        // prompt = data.generations[0]?.text.trim() || "No prompt received.";
    };

    const updatePromptDB = async () => {
        await updateDoc(doc(db, 'Rooms', roomcode, 'collective', roomcode), {
            prompt: prompt
        })
    }

    useEffect(() => {
        getPrompt();
    }, [roomcode]);

    useEffect(() => {
        if (prompt) {
            updatePromptDB(prompt);
        }
    }, [prompt]);

    return <span>{prompt}</span>;
};

export default StoryPrompt;