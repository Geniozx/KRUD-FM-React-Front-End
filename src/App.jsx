import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate} from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import PlaylistList from './components/PlaylistList/PlaylistList';
import * as playlistService from './services/playlistService'
import PlaylistForm from './components/PlaylistForm/PlaylistForm';


import { UserContext } from './contexts/UserContext';
import PlaylistDetails from './components/PlaylistDetails/PlaylistDetails';




const App = () => {
  const { user } = useContext(UserContext);
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllPlaylists = async () => {
      const playlistsData = await playlistService.index();

      setPlaylists(playlistsData);
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

  return (
    <>
      <NavBar />
      <Routes>
        {user ? (
          <>
            <Route path='/' element={user ? <Dashboard /> : <Landing />} />
            <Route path='/playlists' element={<PlaylistList playlists={playlists} />} />
            <Route path='/playlists/:playlistId' element={<PlaylistDetails />} />
            <Route path='/playlists/new' element={<PlaylistForm handleAddPlaylist={handleAddPlaylist} />} />
            <Route path='/playlists/:playlistId/edit' element={<PlaylistForm handleUpdatePlaylist={handleUpdatePlaylist} />} />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )};

      </Routes>
    </>
  );
};


export default App;
