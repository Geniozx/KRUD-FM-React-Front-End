import { useParams, Link } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import SongList from '../SongList/SongList';

import * as playlistService from '../../services/playlistService';
import * as songService from '../../services/songService';


const PlaylistDetails = (props) => {
  const { playlistId } = useParams();
  // const { songId } = useParams();
  const { user } = useContext(UserContext);
  const [playlist, setPlaylist] = useState(null);
  // const [songs, setSongs] = useState([])
  

  useEffect(() => {

    const fetchPlaylist = async () => {
      const playlistData = await playlistService.show(playlistId);
      setPlaylist(playlistData);
    };
    fetchPlaylist();

  }, [playlistId]);

  // console.log('playlistId', playlistId);
  // console.log('user:', playlist)

  // useEffect(() => {
  //   const fetchSongs = async () => {
  //     const songData = await songService.index(songId);
  //     setSongs(songData)
  //     // const res = await fetch(`${BASE_URL}songs`);
  //     // const data = await res.json();
  //     // console.log('Fetched Songs:', songData)
  //   };
  //   fetchSongs();
  // }, [songId]);


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
                      <button onClick={() => {
                        console.log('Removing song:', song._id, 'from playlist:', playlistId);
                        props.handleRemoveSongFromPlaylist(playlistId, song._id)
                      }}>Remove Song From Playlist</button>
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
          </div>
        )}
        <section>
          <Link to={'/songs'}><h3>Add a Song</h3></Link>
          {/* <SongList songs={songs} handleAddSongToPlaylist={props.handleAddSongToPlaylist} playlistId={playlistId} /> */}
        </section>
      </section>
    </main>
  )
};



export default PlaylistDetails;



