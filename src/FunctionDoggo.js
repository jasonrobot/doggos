import React, {useState, useEffect} from 'react';

export default function FunctionDoggo(props) {
    const [currentDoggo, setCurrentDoggo] = useState(props.doggo ?? '');
    const [doggoCount, setDoggoCount] = useState(1);

    const nextDoggo = async () => {
        const response = await fetch('https://random.dog/woof');
        const text = await response.text();
        setCurrentDoggo(text);
        setDoggoCount(doggoCount + 1);
    };

    useEffect(() => {
        nextDoggo();
    }, []);

    useEffect(() => {
        document.title = `You've seen ${doggoCount} doggos.`;
    }, [doggoCount]);

    if (currentDoggo === undefined) {
        return 'Where\'s the doggo?';
    } else if (currentDoggo.endsWith( 'mp4')) {
        return (
                <video autoPlay={true} loop={true} onClick={nextDoggo}>
                <source src={`https://random.dog/${currentDoggo}`} type="video/mp4"/>
                </video>
        );
    } else {
        return (
                <img src={`https://random.dog/${currentDoggo}`} alt="dog" onClick={nextDoggo}></img>
        );
    }
}