import { useParams, Link } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import SongSelector from '../SongSelector/SongSelector';

import * as playlistService from '../../services/playlistService';


const PlaylistDetails = (props) => {
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

  useEffect(() => {
    fetch(`/api/playlists/${playlistId}`)
    .then(res => res.json())
    .then(data => setPlaylist(data))
  }, [playlistId])
  console.log('playlistId', playlistId);
  console.log('user:', playlist)
  if (!playlist) return <main>Loading........</main>;
  return (
    <main>
      <h1>Welcome, {user.username}</h1>

      <section>
        <header>
          <h1>{playlist.playlist}</h1>
          {playlist.author._id === user._id && ( 
            <SongSelector
            playlistId={playlistId} 
            onSongAdded={(updated) => setPlaylist(updated)} />
          )}
          <section>
            <h2>Current Songs</h2>
            <ul>
              {playlist.songs.map((song) => (
                <li key={song._id}>
                  {song.track}
                </li>
              ))}
            </ul>
          </section>
          <p>
            {playlist.author.username}
          </p>
          {playlist.author._id === user._id && (
            <>
              <Link to={`/playlists/${playlistId}/edit`}>Edit</Link>
              <button onClick={() => props.handleDeletePlaylist(playlistId)}>
                Delete
              </button>
            </>
          )}
        </header>
      </section>
    </main>
  )
};




export default PlaylistDetails;