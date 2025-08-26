import { useState } from "react";

const formInit = {
    playlist: '',
    genre: '',
    station: '953'
};

const PlaylistForm = (props) => {
    const [formData, setFormData] = useState(formInit);


    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddPlaylist(formData);
    }
    return (
        <main>
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
