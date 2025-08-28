const BASE_URL= `${import.meta.env.VITE_BACK_END_SERVER_URL}`

import { useState, useEffect } from 'react';



const SongSelector = ({playlistId, onSongAdded}) => {
    const [songs, setSongs] = useState([]);


    useEffect(() => {
        const fetchSongs = async() => {
            const res = await fetch(`${BASE_URL}songs`, {
                headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type' : 'application/json' }
            });
            const data = await res.json();
            console.log('Fetched Songs:', data)
            setSongs(data);
        }
        fetchSongs();
    } , []);
    const handleAddSingle = async (songId) => {
        const res = await fetch(`${BASE_URL}playlists/api/${playlistId}/${songId}`, {
            method: 'POST',
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type' : 'application/json' },
            body: JSON.stringify({ songId }),
        }); 
        const updated = await res.json();
        onSongAdded(updated.playlist);
    };


    return (
        <section>
            <h3>Add a Song</h3>
            {songs.map((song) => (
                <div key={song._id}>
                    <span>{song.track} - {song.artist}</span>
                    <button onClick={() => handleAddSingle(song._id)}>
                        Add
                    </button>
                </div>
            ))}
        </section>
    )
};

export default SongSelector;