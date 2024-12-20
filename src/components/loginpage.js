import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import './loginpage.css';
import { useNavigate } from 'react-router-dom';

const LoginApp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  console.log(process.env.APIKEY);
  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed in:', user);
        navigate(`/profile/${user.email}`); // Redirect to profile
      })
      .catch((error) => {
        setError('Error signing in: ' + error.message);
      });
  };

 

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
  };

  return (
    <div style={styles.container}>
      <h1>{user ? `Welcome, ${user.email}` : 'Login or Signup'}</h1>

      {!user && (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSignup} style={styles.button}>Sign Up</button>
          <button onClick={handleLogin} style={styles.button}>Login</button>
          {error && <p style={styles.error}>{error}</p>}
        </>
      )}

      {user && <button onClick={handleLogout} style={styles.button}>Logout</button>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f8ff',
  },
  input: {
    margin: '10px',
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#6200ea',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
};

export default LoginApp;
