import React, {useState, useEffect} from 'react';

function logToServer(message) {
    console.log(message);
}

export default function ExampleHooks() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
        return () => logToServer(`User clicked ${count} times`);
    });

    const incCount = () => setCount(count + 1);
    return <button onClick={incCount}>{count}</button>;
}
