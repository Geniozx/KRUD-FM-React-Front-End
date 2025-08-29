import { useState } from 'react';

const SongForm = (props) => {
    const initState = {
        track: '',
        artist: '',
        album: '',
        albumArt: '',
    }
  const [formData, setFormData] = useState(initState);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddSong(formData)
  };

  return (
<main className="song-form-container">
    <h2>Add New Song</h2>
    <form onSubmit={handleSubmit}>
        <div className="song-form-group">
            <label htmlFor='track-input' className="song-form-label">Track Title</label>
            <input
              required
              type='text'
              name='track'
              id='track-input'
              className="song-form-input"
              value={formData.track}
              onChange={handleChange}
              placeholder="Enter track title"
            />
        </div>
        <div className="song-form-group">
            <label htmlFor='artist-input' className="song-form-label">Artist</label>
            <input
              required
              type='text'
              name='artist'
              id='artist-input'
              className="song-form-input"
              value={formData.artist}
              onChange={handleChange}
              placeholder="Enter artist name"
            />
        </div>
        <div className="song-form-group">
            <label htmlFor='album-input' className="song-form-label">Album</label>
            <input
              required
              type='text'
              name='album'
              id='album-input'
              className="song-form-input"
              value={formData.album}
              onChange={handleChange}
              placeholder="Enter album name"
            />
        </div>
        <div className="song-form-group">
            <label htmlFor='albumArt-input' className="song-form-label">Album Art URL</label>
            <input
              required
              type='text'
              name='albumArt'
              id='albumArt-input'
              className="song-form-input"
              value={formData.albumArt}
              onChange={handleChange}
              placeholder="Enter album art URL"
            />
        </div>
        <button type='submit' className="song-action-button">Add Song</button>
    </form>
</main>
  )
};

export default SongForm;