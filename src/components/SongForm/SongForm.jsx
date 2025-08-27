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
    <main>
        <form onSubmit={handleSubmit}>
        <label htmlFor='track-input'>Track Title</label>
        <input
          required
          type='text'
          name='track'
          id='track-input'
          value={formData.track}
          onChange={handleChange}
        />
        <label htmlFor='artist-input'>Artist</label>
        <input
          required
          type='text'
          name='artist'
          id='artist-input'
          value={formData.artist}
          onChange={handleChange}
        />
        <label htmlFor='album-input'>Album</label>
        <input
          required
          type='text'
          name='album'
          id='album-input'
          value={formData.album}
          onChange={handleChange}
        />
        <label htmlFor='albumArt-input'>Album Art</label>
        <input
          required
          type='text'
          name='albumArt'
          id='albumArt-input'
          value={formData.albumArt}
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
        </form>
    </main>
  )
};

export default SongForm;