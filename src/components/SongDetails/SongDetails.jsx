import { useParams } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import * as songService from '../../services/songService';
import { UserContext } from '../../contexts/UserContext';



const SongDetails = (props) => {
    const { songId } = useParams();
    const { user } = useContext(UserContext);
    const [song, setSong] = useState(null);

    useEffect(() => {
        const fetchSong = async () => {
            const songData = await songService.show(songId);
            setSong(songData);
        };
        fetchSong();
    }, [songId]);

    console.log('song state:', songId);


if (!song) return <main className="song-loading">Loading......</main>
return (
    <main className="song-details-container">
        <section className="song-details-card">
            <header className="song-details-header">
                <h1>{song.track}</h1>
            </header>
            <div className="song-details-info">
                <p><strong>Artist:</strong> {song.artist}</p>
                <p><strong>Album:</strong> {song.album}</p>
                {song.albumArt && (
                    <div>
                        <img src={song.albumArt} alt="Album Art" className="song-album-art" />
                    </div>
                )}
            </div>
            {song.author._id === user._id && (
                <div>
                    <button
                        className="song-action-button"
                        onClick={() => props.handleDeleteSong(songId)}
                    >
                        Delete Song
                    </button>
                </div>
            )}
        </section>
    </main>
)};


export default SongDetails;