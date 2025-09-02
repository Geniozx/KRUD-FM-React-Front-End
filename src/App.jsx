import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import PlaylistList from './components/PlaylistList/PlaylistList';
import * as playlistService from './services/playlistService'
import PlaylistForm from './components/PlaylistForm/PlaylistForm';
import SongList from './components/SongList/SongList';
import * as songService from './services/songService'
import SongDetails from './components/SongDetails/SongDetails';
import SongForm from './components/SongForm/SongForm';

import { UserContext } from './contexts/UserContext';
import PlaylistDetails from './components/PlaylistDetails/PlaylistDetails';

import './SongComponents.css';


// Added by Morgan Monday night: //
import SongFormWithSoundCloud from './components/SongForm/SongFormWithSoundCloud';
import PlaylistFormWithSoundCloud from './components/PlaylistForm/PlaylistFormWithSoundCloud';

// End

const App = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // ---------------------PLAYLISTS--------------------------------- //
  const [playlists, setPlaylists] = useState([]);


  useEffect(() => {
    const fetchAllPlaylists = async () => {
      try {
        const playlistsData = await playlistService.index();
        setPlaylists(playlistsData || []);
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setPlaylists([]);
      }
    };
    if (user) fetchAllPlaylists();
  }, [user]);

  const handleAddPlaylist = async (playlistFormData) => {
    const newPlaylist = await playlistService.create(playlistFormData)
    setPlaylists([newPlaylist, ...playlists]);
    navigate('/playlists');
  }

  const handleUpdatePlaylist = async (playlistId, playlistFormData) => {
    const updatedPlaylist = await playlistService.update(playlistId, playlistFormData);
    setPlaylists(playlists.map((playlist) => (playlistId === playlist._id ? updatedPlaylist : playlist)));
    navigate(`/playlists/${playlistId}`);
  };

  const handleDeletePlaylist = async (playlistId) => {
    const deletedPlaylist = await playlistService.deletePlaylist(playlistId);
    setPlaylists(playlists.filter((playlist) => playlist._id !== deletedPlaylist._id));
    navigate('/playlists');
  };

  // ---------------------SONGS--------------------------------- //
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchAllSongs = async () => {
      const songsData = await songService.index();
      setSongs(songsData);
    };
    if (user) fetchAllSongs();
  }, [user]);

  const handleAddSong = async (songFormData) => {
    const newSong = await songService.create(songFormData);
    setSongs([newSong, ...songs]);
    navigate('/songs');
  };

  const handleDeleteSong = async (songId) => {
    const deletedSong = await songService.deleteSong(songId);
    setSongs(songs.filter((song) => song._id !== deletedSong._id));
    navigate('/songs');
  };

  // ---------------------API--------------------------------- //
  const [playlistSongs, setPlaylistSongs] = useState([])

  const handleAddSongToPlaylist = async (playlistId, songId) => {
    const addedSong = await playlistService.postSongToPlaylist(playlistId, songId);
    setPlaylistSongs([addedSong, ...playlistSongs])
    navigate(`/playlists/${playlistId}`);
    // const updatedPlaylist = await playlistService.index();
    // return updatedPlaylist;
  };

  const handleRemoveSongFromPlaylist = async (playlistId, songId) => {
    await playlistService.removeSongFromPlaylist(playlistId, songId);
    const updatedPlaylist = await playlistService.show(playlistId);
    return updatedPlaylist;
  }


  return (
    <>
      <NavBar />
      <Routes>
        {user ? (
          <>
            <Route path='/' element={<Dashboard />} />
            <Route path='/playlists' element={<PlaylistList playlists={playlists} />} />
            <Route path='/playlists/:playlistId' element={<PlaylistDetails handleDeletePlaylist={handleDeletePlaylist} handleAddSongToPlaylist={handleAddSongToPlaylist} handleRemoveSongFromPlaylist={handleRemoveSongFromPlaylist} />} />
            <Route path='/playlists/new' element={<PlaylistForm handleAddPlaylist={handleAddPlaylist} />} />
            <Route path='/playlists/:playlistId/edit' element={<PlaylistForm handleUpdatePlaylist={handleUpdatePlaylist} />} />
            <Route path='/songs'
              element={
                <SongList
                  songs={songs}
                  handleAddSongToPlaylist={handleAddSongToPlaylist}
                  playlists={playlists.filter(
                    playlist =>
                      playlist &&
                      playlist.author &&
                      playlist.author._id === user._id)} />} />
            <Route path='/songs/:songId' element={<SongDetails handleDeleteSong={handleDeleteSong} />} />
            <Route path='/songs/new' element={<SongForm handleAddSong={handleAddSong} />} />
            {/* Below added by Morgan Mon night: */}
            <Route path='/songs/new-with-soundcloud' element={<SongFormWithSoundCloud handleAddSong={handleAddSong} />} />
            <Route path='/playlists/new-with-soundcloud' element={<PlaylistFormWithSoundCloud handleAddPlaylist={handleAddPlaylist} />} />
            {/* end */}
          </>
        ) : (
          <>
            <Route path='/' element={<Landing />} />
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )};

      </Routes>
    </>
  );
};






export default App;
