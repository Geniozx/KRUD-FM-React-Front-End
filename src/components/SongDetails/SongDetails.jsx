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


    if (!song) return <main>Loading......</main>
    return (
        <main>
            <section>
                <header>
                    <h1>{song.track}</h1>
                </header>
                <p>{song.artist}</p>
                <p>{song.album}</p>
                <p>{song.albumArt}</p>
                {song.author._id === user._id && (
                    <>
                    <button onClick={() => props.handleDeleteSong(songId)}>
                        Delete
                        </button>
                    </>
                )}
            </section>
        </main>
    )
};


export default SongDetails;