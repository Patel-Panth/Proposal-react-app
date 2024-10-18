import React, { useState, useEffect } from 'react';
import { auth, database } from './firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [isProposed, setIsProposed] = useState(false);
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.email); // Assuming you want to use the user's email as the username
      } else {
        setError('Please log in before responding!');
        navigate('/'); // Redirect to login page if not authenticated
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleResponse = async (response) => {
    try {
      const connection = collection(database, 'responses');
      const timestamp = Date.now();
      const formattedDate = new Date(timestamp).toLocaleString();
      const data = {
        response: response,
        username: username,
        timestamp: formattedDate,
      };

      const newDocRef = await addDoc(connection, data);
      console.log("Response added with ID:", newDocRef.id);
    } catch (error) {
      console.error('Error saving response:', error);
      setError('Error saving your response. Please try again.');
    }
  };

  const handleProposal = () => {
    setIsProposed(true);
    handleResponse('Yes'); // Save "Yes" response
  };

  const handleProposalRejected = () => {
    setCount(count + 1);
    handleResponse('No'); // Save "No" response
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUsername('');
      navigate('/'); // Redirect to login after logout
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💖 My Dear Special Proposal 💖</h1>
      <p style={styles.message}>
        I’ve enjoyed every moment we’ve spent together, and I can’t imagine my life without you.
        Will you make me the happiest person by being my partner for life?
      </p>

      {error && <p style={styles.error}>{error}</p>}

      <h2 style={styles.message}>Will You Be My Life Partner?</h2>

      {(isProposed === false && count < 4) && (
        <>
          <button onClick={handleProposal} style={styles.button}>
            Yes💕
          </button>
          <button onClick={handleProposalRejected} style={styles.button}>
            No 👊
          </button>
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </>
      )}

      {isProposed && count < 4 && (
        <div style={styles.response}>
          <h2>💍 You are my everything! 💍</h2>
          <p style={styles.responseMessage}>
            I would love to spend my life with you!
          </p>
        </div>
      )}

      {count === 1 && isProposed === false && (
        <div style={styles.response}>
          <p>Please Baby🥺</p>
        </div>
      )}
      {count === 2 && isProposed === false && (
        <div style={styles.response}>
          <p>Please Please Baby🐣</p>
        </div>
      )}
      {count === 3 && isProposed === false && (
        <div style={styles.response}>
          <p>Ek Lafot Padsene Sani Mani Yes Per Click Ker</p>
        </div>
      )}

      {count > 3 && (
        <div style={styles.response}>
          <h1>Thank You For Accepting Me😊.</h1>
          <div style={styles.responseMessage}>
            <p>I Will Make You The Happiest Person in My Life❤️.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Styling
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f8ff',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    color: '#ff69b4',
  },
  message: {
    fontSize: '1.2rem',
    margin: '20px 0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#ff69b4',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
  },
  response: {
    marginTop: '20px',
    padding: '20px',
    border: '2px solid #ff69b4',
    borderRadius: '10px',
    backgroundColor: '#fff',
  },
  responseMessage: {
    fontSize: '1rem',
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default Profile;
