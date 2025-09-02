import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import * as playlistService from '../../services/playlistService';

const formInit = {
    playlist: '',
    description: '',
    genre: '',
    station: '',
};

const PlaylistForm = (props) => {
    const { playlistId } = useParams();
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
        <main className="playlist-form-container">
            <h2>Create New Playlist</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="playlist-form-group">
                    <label htmlFor='playlist-input' className="playlist-form-label">Playlist Name</label>
                    <input
                        required
                        type='text'
                        name='playlist'
                        id='playlist-input'
                        className="playlist-form-input"
                        value={formData.playlist}
                        onChange={handleChange}
                        placeholder="Enter playlist name"
                    />
                </div>
                <div className="playlist-form-group">
                    <label htmlFor='description-input' className="playlist-form-label">Description</label>
                    <input
                        type='text'
                        name='description'
                        id='description-input'
                        className="playlist-form-input"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter playlist description"
                    />
                </div>
                <div className="playlist-form-group">
                    <label htmlFor='genre-input'>Genre</label>
                    <input
                        required
                        type='text'
                        name='genre'
                        id='genre-input'
                        className="playlist-form-input"
                        value={formData.genre}
                        onChange={handleChange}
                    />
                    <label htmlFor='station-input'>Station</label>
                    <select
                        required
                        name='station'
                        id='station-input'
                        className="playlist-form-input"
                        value={formData.station}
                        onChange={handleChange}
                    >
                        <option value='953'>953</option>
                        <option value='97.9'>97.9</option>
                        <option value='666'>666</option>
                        <option value='105.3'>105.3</option>
                    </select>

                </div>
                <br></br><center><button type='submit' className="song-action-button">Create Playlist</button></center>
            </form>
        </main>

    );
};

export default PlaylistForm;
