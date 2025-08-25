import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signUp } from '../../services/authServices';

import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {

  const initStat = {
    username: '',
    password: '',
    passwordConf: '',
    bio: '',
    callSign: '',
    broadcastLocation: '',
    logo: '',
  }

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState(initStat);

  const { username, password, passwordConf, bio, callSign, broadcastLocation, logo } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      // Call the setUser function to update the user state, just like normal.
      setUser(newUser);
      // Take the user to the (non-existent) home page after they sign up.
      // We'll get to this shortly!
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='name'
            value={username}
            name='username'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='confirm'>Confirm Password:</label>
          <input
            type='password'
            id='confirm'
            value={passwordConf}
            name='passwordConf'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='bio'>Bio:</label>
          <textarea
            type='bio'
            id='bio'
            value={bio}
            name='bio'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='callSign'>Call Sign:</label>
          <input
            type='callSign'
            id='callSign'
            value={callSign}
            name='callSign'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='broadcastLocation'>Broadcast Location:</label>
          <input
            type='broadcastLocation'
            id='broadcastLocation'
            value={broadcastLocation}
            name='broadcastLocation'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='logo'>Logo:</label>
          <input
            type='logo'
            id='logo'
            value={logo}
            name='logo'
            onChange={handleChange}
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;