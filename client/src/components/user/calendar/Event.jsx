import React, { useEffect, useState } from 'react';

export default function Event({ event }) {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 480);
    const { title, level } = event;

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 480);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='flex items-center gap-2 min-h-5'>
            <span className={`w-2/12 max-w-3 min-w-3 rounded-full aspect-square ${level === 'A1-A2' ? 'bg-a1a2' : level === 'B1-B2' ? 'bg-b1b2' : level === 'C1-C2' ? 'bg-c1c2' : ''}`}></span>
            <p className='text-sm truncate'>
                {isSmallScreen ? '' : `${level} ${title}`}
            </p>
        </div>
    );
}
