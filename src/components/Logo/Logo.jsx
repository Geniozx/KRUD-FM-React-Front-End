// src/components/Logo.jsx
import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

function Logo({ inNav = false }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthed = Boolean(user);
  const isLandingOrDashboard =
    location.pathname === '/' || location.pathname === '/dashboard';

  const handleClick = () => {
    if (isAuthed) navigate('/dashboard');
  };

  const classes = ['krud-logo'];
  if (inNav) {
    classes.push('krud-logo--nav');
  } else {
    classes.push(isAuthed ? 'krud-logo--auth' : 'krud-logo--guest');
    classes.push(isLandingOrDashboard ? 'krud-logo--main-pages' : 'krud-logo--other-pages');
  }

  return (
    <img
      src="/krudlogo.png"
      alt="KRUD Logo"
      className={classes.join(' ')}
      onClick={handleClick}
      style={{ cursor: isAuthed ? 'pointer' : 'default' }}
    />
  );
}

export default Logo;
