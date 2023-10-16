import React, { useState, useEffect } from 'react';

export const TestIndex = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    // Initialize currentIndex from localStorage on component mount
    useEffect(() => {
        const storedIndex = localStorage.getItem('currentIndex');
        if (storedIndex !== null) {
            setCurrentIndex(parseInt(storedIndex, 10));
        }
    }, []);

    // Update localStorage whenever currentIndex changes
    useEffect(() => {
        localStorage.setItem('currentIndex', currentIndex);
    }, [currentIndex]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
            } else if (event.key === 'ArrowRight') {
                setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, movies.length - 1));
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // Empty dependency array ensures that this effect runs once

    const movies = [1,2,3,4,5,6,7,8,9,10];

    return (
        <div>
            <h1>Current Index: {currentIndex}</h1>
            <button onClick={() => setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))}>
                Previous
            </button>
            <button onClick={() => setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, movies.length - 1))}>
                Next
            </button>
        </div>
    )
}
