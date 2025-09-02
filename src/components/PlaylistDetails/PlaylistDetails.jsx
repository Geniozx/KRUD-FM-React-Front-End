import { useParams, useNavigate } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

import * as playlistService from '../../services/playlistService';


const PlaylistDetails = (props) => {
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const { user } = useContext(UserContext);
  const [playlist, setPlaylist] = useState(null);


  useEffect(() => {

    const fetchPlaylist = async () => {
      const playlistData = await playlistService.show(playlistId);
      setPlaylist(playlistData);
    };
    fetchPlaylist();

  }, [playlistId]);

  const handleRemoveSong = async (playlistId, songId) => {
    const updatedPlaylist = await props.handleRemoveSongFromPlaylist(playlistId, songId);
    setPlaylist(updatedPlaylist);
  };

  if (!playlist) return <main>Loading........</main>;
  return (
    <main className="playlist-details-container">
      <section className="playlist-details-card">
        <header className="playlist-details-header">
          <h1>{playlist.playlist}</h1>
        </header>
        <div className="playlist-details-info">
          {playlist.description && <p><strong>Description:</strong> {playlist.description}</p>}
          {playlist.songs && playlist.songs.length > 0 && (
            <div>
              <h3>Songs in this playlist:</h3>
              {playlist.songs.map((song) => (
                <div key={song._id} className="song-card">
                  <div className="song-card-content">
                    <h3 className="song-title">{song.track}</h3>
                    <p className="song-artist">{song.artist}</p>
                    <p className="song-album">{song.album}</p>
                    <div>
                      <button onClick={() => handleRemoveSong(playlistId, song._id)}>
                        Remove Song From Playlist
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {playlist.author._id === user._id && (
          <div>
            <button
              className="song-action-button"
              onClick={() => props.handleDeletePlaylist(playlistId)}>
              Delete Playlist
            </button>
            <button
              className="song-action-button"
              onClick={() => navigate('/songs')}>
              Add a Song
            </button>
          </div>
        )}
      </section>
    </main>
  )
};



export default PlaylistDetails;