import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import * as playlistService from '../../services/playlistService';

const formInit = {
    playlist: '',
    genre: '',
    station: '953'
};

const PlaylistForm = (props) => {
    const { playlistId } = useParams();
    console.log(playlistId);
    const [formData, setFormData] = useState(formInit);


    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (playlistId) {
            props.handleUpdatePlaylist(playlistId, formData);
        } else {
            props.handleAddPlaylist(formData);
        }
    };

    useEffect(() => {
        const fetchPlaylist = async () => {
            const playlistData = await playlistService.show(playlistId);
            setFormData(playlistData);
        };
        if (playlistId) fetchPlaylist();

        return () => setFormData(formInit)
    }, [playlistId]);

    return (
        <main>
            <h1>{playlistId ? 'Edit Playlist' : 'New Playlist'}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='playlist-name'>Playlist</label>
                <input
                    required
                    type='text'
                    name='playlist'
                    id='playlist-input'
                    value={formData.playlist}
                    onChange={handleChange}
                />
                <label htmlFor='genre-input'>Genre</label>
                <input
                    required
                    type='text'
                    name='genre'
                    id='genre-input'
                    value={formData.genre}
                    onChange={handleChange}
                />
                <label htmlFor='station-input'>Station</label>
                <select
                    required
                    name='station'
                    id='station-input'
                    value={formData.station}
                    onChange={handleChange}
                >
                    <option value='953'>953</option>
                    <option value='97.9'>97.9</option>
                    <option value='666'>666</option>
                </select>
                <button type='submit'>SUBMIT</button>
            </form>
        </main>
    );
};

export default PlaylistForm;
