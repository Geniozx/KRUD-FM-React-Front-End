import { Link } from 'react-router';
import { useState } from 'react';

const SongList = (props) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState({});

  const handleSelectChange = (songId, playlistId) => {
    setSelectedPlaylist(prev => ({
      ...prev,
      [songId]: playlistId
    }));
  };

  return (
    <main className="song-list-container">
      <h1>Song Library</h1>
      {props.songs.map((song) => (
        <div key={song._id} className="song-card">
          <div className="song-card-content">
            <Link to={`/songs/${song._id}`}>
              <h3 className="song-title">{song.track}</h3>
              <p className="song-artist">{song.artist}</p>
              <p className="song-album">{song.album}</p>
            </Link>

            {/* Dropdown to choose a playlist */}
            
            <select
              value={selectedPlaylist[song._id] || ''}
              onChange={(e) => handleSelectChange(song._id, e.target.value)}
            >
              <option value="">Choose a playlist</option>
              {props.playlists.map((playlist) => (
                <option key={playlist._id} value={playlist._id}>
                  {playlist.playlist || "Untitled"}
                </option>
              ))}
            </select>

            {/* Button to add the song to the selected playlist */}
            <button
              disabled={!selectedPlaylist[song._id]}
              onClick={() =>
                props.handleAddSongToPlaylist(selectedPlaylist[song._id], song._id)
              }
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </main>
  );
};

export default SongList;
