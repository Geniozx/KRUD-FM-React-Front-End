import { useParams, Link } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

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
  console.log('playlistId', playlistId);
  console.log('user:', playlist)
  if (!playlist) return <main>Loading........</main>;
  return (
    <main>
      <h1>Welcome, {user.username}</h1>

      <section>
        <header>
          <h1>{playlist.playlist}</h1>
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