// Entire new file added by Morgan Mon night: //

import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import './PlaylistFormWithSoundCloud.css';

const formInit = {
    playlist: '',
    description: '',
    genre: '',
    station: '953'
};

const PlaylistFormWithSoundCloud = (props) => {
    const { playlistId } = useParams();
    const [formData, setFormData] = useState(formInit);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState('');

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        
        try {
            let playlist;
            
            if (playlistId) {
                playlist = await props.handleUpdatePlaylist(playlistId, formData);
            } else {
                playlist = await props.handleAddPlaylist(formData);
            }
            
            // Add selected SoundCloud tracks to the playlist
            if (selectedTracks.length > 0 && playlist) {
                await addTracksToPlaylist(playlist._id || playlist.id);
                alert(`Playlist created with ${selectedTracks.length} SoundCloud tracks!`);
            } else if (playlist) {
                alert('Playlist created successfully!');
            }
            
            // Reset form
            setFormData(formInit);
            setSelectedTracks([]);
            setSearchResults([]);
            setSearchQuery('');
            
        } catch (error) {
            console.error('Failed to create/update playlist:', error);
            alert('Failed to create playlist. Please try again.');
        }
    };

    // Add tracks to playlist
    const addTracksToPlaylist = async (playlistId) => {
        for (const track of selectedTracks) {
            try {
                await fetch(`http://localhost:3000/playlists/api/${playlistId}/soundcloud-track`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        soundcloudTrackId: track.id,
                        track: track.title,
                        artist: track.user?.username,
                        album: track.title,
                        albumArt: track.artwork_url || track.user?.avatar_url
                    })
                });
            } catch (error) {
                console.error('Failed to add track to playlist:', error);
            }
        }
    };

    // Search SoundCloud tracks
    const searchSoundCloud = async () => {
        if (!searchQuery.trim()) return;
        
        setIsSearching(true);
        setSearchError('');
        
        try {
            const response = await fetch(`http://localhost:3000/soundcloud/search?q=${encodeURIComponent(searchQuery)}&limit=20`, {
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

    // Toggle track selection
    const toggleTrackSelection = (track) => {
        if (selectedTracks.find(t => t.id === track.id)) {
            setSelectedTracks(selectedTracks.filter(t => t.id !== track.id));
        } else {
            setSelectedTracks([...selectedTracks, track]);
        }
    };

    // Remove track from selection
    const removeTrack = (trackId) => {
        setSelectedTracks(selectedTracks.filter(t => t.id !== trackId));
    };

    // Clear search results
    const clearSearch = () => {
        setSearchResults([]);
        setSearchQuery('');
        setSearchError('');
    };

    // Simplified useEffect without playlistService
    useEffect(() => {
        if (playlistId) {
            // For now, just set a placeholder - you can implement this later
            console.log('Playlist ID:', playlistId);
        }
        return () => setFormData(formInit);
    }, [playlistId]);

    return (
        <main className="playlist-form-container">
            <h2>{playlistId ? 'Edit Playlist' : 'Create New Playlist'}</h2>
            
            {/* Playlist Form */}
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
                        placeholder="Enter genre"
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
            </form>

            {/* SoundCloud Search Section */}
            <div className="soundcloud-search-section">
                <h3>🎵 Add SoundCloud Tracks</h3>
                <div className="search-input-group">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for tracks to add..."
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
                                    className={`track-result ${selectedTracks.find(t => t.id === track.id) ? 'selected' : ''}`}
                                    onClick={() => toggleTrackSelection(track)}
                                >
                                    <input
                                        type="checkbox"
                                        checked={!!selectedTracks.find(t => t.id === track.id)}
                                        onChange={() => toggleTrackSelection(track)}
                                        className="track-checkbox"
                                    />
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
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Selected Tracks Summary */}
            {selectedTracks.length > 0 && (
                <div className="selected-tracks">
                    <h4>Selected Tracks ({selectedTracks.length})</h4>
                    <div className="selected-tracks-list">
                        {selectedTracks.map((track) => (
                            <div key={track.id} className="selected-track">
                                <img 
                                    src={track.artwork_url || track.user?.avatar_url || '/default-album-art.png'} 
                                    alt={track.title}
                                    className="selected-track-artwork"
                                />
                                <div className="selected-track-info">
                                    <span className="selected-track-title">{track.title}</span>
                                    <span className="selected-track-artist">{track.user?.username}</span>
                                </div>
                                <button 
                                    onClick={() => removeTrack(track.id)} 
                                    className="remove-track-button"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Create Button */}
            <div className="form-actions">
                <button 
                    onClick={handleSubmit}
                    disabled={!formData.playlist || !formData.genre || !formData.station}
                    className="create-playlist-btn"
                >
                    {playlistId ? 'Update Playlist' : `Create Playlist with ${selectedTracks.length} Tracks`}
                </button>
            </div>
        </main>
    );
};

export default PlaylistFormWithSoundCloud;

// END