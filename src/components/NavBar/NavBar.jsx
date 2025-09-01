import styles from './NavBar.module.css';

import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import Logo from '../Logo/Logo';

const NavBar = () => {

  const { user, setUser } = useContext(UserContext);

  const handleSignOut = async () => {
    localStorage.removeItem('token')
    setUser(null);
  }

  return (
   <nav className={styles.container}>
     
    {user ? (
      <ul className={styles.navLinks}>
       <div className={styles.logo}>
        <Logo inNav />
        </div>

        <li><Link to='/'>Dashboard</Link></li>
        <li><Link to='/playlists'>Playlists</Link></li>
        <li><Link to='/playlists/new'>New Playlist</Link></li>
        <li><Link to='/songs'>Songs</Link></li>
        <li><Link to='/songs/new'>New Song</Link></li>
        <li className={styles.signOut}><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
      </ul>
    ) : (
      <ul className={styles.navLinks}>
        
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/sign-in'>Sign In</Link></li>
        <li><Link to='/sign-up'>Sign Up</Link></li>
      </ul>
    )}
  </nav>
  );
};

export default NavBar;