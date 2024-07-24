import React, { useState, useEffect } from 'react';
import '../styles/transition.css';

const importAll = (r) => {
    return r.keys().map(r);
}

const images = importAll(require.context('../public/images/transition', false, /\.(png|jpe?g|svg)$/));

const Transition = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div
            className="transition-background"
            style={{
                backgroundImage: `url(${images[currentImage]})`,
            }}
        />
    );
};

export default Transition;
