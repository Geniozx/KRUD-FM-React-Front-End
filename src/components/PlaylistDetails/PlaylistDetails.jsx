import { useParams, Link } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import SongList from '../SongList/SongList';

import * as playlistService from '../../services/playlistService';
import * as songService from '../../services/songService';


const PlaylistDetails = (props) => {
  const { playlistId } = useParams();
  const { songId } = useParams();
  const { user } = useContext(UserContext);
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([])

  useEffect(() => {

    const fetchPlaylist = async () => {
      const playlistData = await playlistService.show(playlistId);
      setPlaylist(playlistData);
    };
    fetchPlaylist();

  }, [playlistId]);

  // console.log('playlistId', playlistId);
  // console.log('user:', playlist)

  useEffect(() => {
          const fetchSongs = async() => {
            const songData = await songService.index(songId);
            setSongs(songData)
              // const res = await fetch(`${BASE_URL}songs`);
              // const data = await res.json();
              console.log('Fetched Songs:', songData)
          };
          fetchSongs();
      } , [songId]);

      
  if (!playlist) return <main>Loading........</main>;
  return (
    <main>
      <h1>Welcome, {user.username}</h1>

      <section>
        <header>
          <h1>{playlist.playlist}</h1>
          <section>
            <h2>Current Songs</h2>
            <ul>
              {playlist.songs.map((song) => (
                <li key={song._id}>
                  {song.track}
                  <button onClick={() => handleDeleteSongFromPlaylist(song._id)}>Delete</button>
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
        <section>
            <h3>Add a Song</h3>
            <SongList songs={songs} handleAddSongToPlaylist={props.handleAddSongToPlaylist} playlistId={playlistId}  />
            {/* {songs.map((song) => (
                <div key={song._id}>
                    <span>{song.track} - {song.artist}</span>
                    <button onClick={() => props.handleAddSongToPlaylist(playlistId, song._id)}>
                        Add
                    </button>
                </div>
            ))} */}
        </section>
            </>
          )}
        </header>
      </section>
    </main>
  )
};




export default PlaylistDetails;