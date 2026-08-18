"use client";

import { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <>
            <div className="flex text-4xl gap-4">
                <button className="cursor-pointer bg-red-500 p-2" onClick={() => setCount(count - 1)}>
                    -
                </button>
                <span>{count}</span>
                <button className="cursor-pointer bg-green-500 p-2" onClick={() => setCount(count + 1)}>
                    +
                </button>
            </div>
        </>
    );
};
export default Counter;