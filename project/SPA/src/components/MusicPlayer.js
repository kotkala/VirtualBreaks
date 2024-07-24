import React, { useState, useEffect } from 'react';

const MusicPlayer = () => {
    const [musicLink, setMusicLink] = useState('');
    const [showInput, setShowInput] = useState(true);

    useEffect(() => {
        fetchMusicLink();
    }, []);

    const fetchMusicLink = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/music', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Adjust based on how you store the token
                }
            });
            const data = await response.json();
            setMusicLink(data.musicLink);
            if (data.musicLink) {
                setShowInput(false);
            }
        } catch (error) {
            console.error('There was an error fetching the music link!', error);
        }
    };

    const handleChange = (event) => {
        setMusicLink(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await fetch('http://localhost:5000/api/music', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Adjust based on how you store the token
                },
                body: JSON.stringify({ musicLink })
            });
            setShowInput(false);
            alert('Music link updated successfully!');
        } catch (error) {
            console.error('There was an error updating the music link!', error);
        }
    };

    const handleChangeMusic = () => {
        setShowInput(true);
        setMusicLink('');
    };

    return (
        <div className="container mt-4">
            {showInput ? (
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="form-group">
                        
                        <label htmlFor="musicLink">YouTube Music:</label>
                        <input
                            type="text"
                            id="musicLink"
                            className="form-control"
                            value={musicLink}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">Play</button>
                </form>
            ) : (
                <div className="mt-4">
                    <h3>Background Music</h3>
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe
                            className="embed-responsive-item"
                            src={`https://www.youtube.com/embed/${musicLink.split('v=')[1]}?autoplay=1`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Background Music"
                        ></iframe>
                    </div>
                    <button onClick={handleChangeMusic} className="btn btn-warning mt-4">Change</button>
                </div>
            )}
        </div>
    );
};

export default MusicPlayer;
