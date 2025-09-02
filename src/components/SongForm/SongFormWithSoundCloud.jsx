// Entire new file added by Morgan Monday night: //
import { useState } from 'react';
import '../../CompleteStyles.css';

const SongFormWithSoundCloud = (props) => {
  const initState = {
    track: '',
    artist: '',
    album: '',
    albumArt: '',
    soundcloudTrackId: ''
  };
  
  const [formData, setFormData] = useState(initState);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddSong(formData);
  };

  // Search SoundCloud tracks
  const searchSoundCloud = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchError('');
    
    try {
      const response = await fetch(`http://localhost:3000/soundcloud/search?q=${encodeURIComponent(searchQuery)}&limit=10`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.data);
      } else {
        setSearchError('Search failed. Please try again.');
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Network error. Please check your connection.');
    } finally {
      setIsSearching(false);
    }
  };

  // Select a track from search results
  const selectTrack = (track) => {
    setSelectedTrack(track);
    setFormData({
      track: track.title || '',
      artist: track.user?.username || '',
      album: track.title || track.genre || '',
      albumArt: track.artwork_url || track.user?.avatar_url || '',
      soundcloudTrackId: track.id || ''
    });
  };

  // Clear search results
  const clearSearch = () => {
    setSearchResults([]);
    setSearchQuery('');
    setSearchError('');
  };

  // Add individual song from search results
  const handleAddIndividualSong = async (track) => {
    try {
      // Create song data from the track
      const songData = {
        track: track.title,
        artist: track.user?.username,
        album: track.title,
        albumArt: track.artwork_url || track.user?.avatar_url || '',
        soundcloudTrackId: track.id
      };
      
      // Add the song using the existing handler
      await props.handleAddSong(songData);
      
      // Remove this track from search results (silent success)
      setSearchResults(prev => prev.filter(t => t.id !== track.id));
      
    } catch (error) {
      console.error('Error adding song:', error);
      // Silent error handling - just log to console
    }
  };

  return (
    <main className="song-form-container">
      <h2>Add New Song</h2>
      
      {/* SoundCloud Search Section */}
      <div className="soundcloud-search-section">
        <h3>🎵 Search SoundCloud</h3>
        <div className="search-input-group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for tracks..."
            className="search-input"
            onKeyPress={(e) => e.key === 'Enter' && searchSoundCloud()}
          />
          <button 
            onClick={searchSoundCloud}
            disabled={isSearching || !searchQuery.trim()}
            className="search-button"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
          {searchResults.length > 0 && (
            <button onClick={clearSearch} className="clear-button">
              Clear
            </button>
          )}
        </div>

        {/* Search Error */}
        {searchError && (
          <div className="search-error">
            {searchError}
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="search-results">
            <h4>Search Results:</h4>
            <div className="results-list">
              {searchResults.map((track) => (
                <div 
                  key={track.id} 
                  className={`track-result ${selectedTrack?.id === track.id ? 'selected' : ''}`}
                >
                  <div className="track-content" onClick={() => selectTrack(track)}>
                    <img 
                      src={track.artwork_url || track.user?.avatar_url || '/default-album-art.png'} 
                      alt={track.title}
                      className="track-artwork"
                      onError={(e) => {
                        e.target.src = '/default-album-art.png';
                      }}
                    />
                    <div className="track-info">
                      <h5 className="track-title">{track.title}</h5>
                      <p className="track-artist">{track.user?.username}</p>
                      <p className="track-genre">{track.genre}</p>
                    </div>
                    <div className="track-duration">
                      {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="track-actions">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddIndividualSong(track);
                      }}
                      className="add-song-btn"
                      title={`Add "${track.title}" to your library`}
                    >
                      ➕ Add Song
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Song Form */}
      <form onSubmit={handleSubmit} className="form-container">
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
        
        {/* Hidden field for SoundCloud track ID */}
        <input type="hidden" name="soundcloudTrackId" value={formData.soundcloudTrackId} />
        
        <br></br>
        <center>
          <button type='submit' className="song-action-button">
            {selectedTrack ? 'Add Song from SoundCloud' : 'Add Song'}
          </button>
        </center>
        
        {/* Selected Track Info */}
        {selectedTrack && (
          <div className="selected-track-info">
            <p>✅ Selected: <strong>{selectedTrack.title}</strong> by <strong>{selectedTrack.user?.username}</strong></p>
          </div>
        )}
      </form>
    </main>
  );
};

export default SongFormWithSoundCloud; 

// End