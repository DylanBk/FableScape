import React, { useState, useEffect } from 'react';

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        };
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions
};

export default useWindowDimensions;