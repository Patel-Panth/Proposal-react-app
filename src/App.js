
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginApp from '../src/components/loginpage.js'; // Adjust the import based on your folder structure
import Profile from '../src/components/profile.js'; // Adjust the import based on your folder structure
import { auth } from './components/firebase.js';

const App = () => {
  const [user, setUser] = useState(null);

  // Example: Listen to auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router basename="/Proposal-react-app">
      <Routes>
        <Route path="/" element={ <LoginApp />} />
        <Route path="/profile/:username" element={<Profile />} />
        
      </Routes>
    </Router>
  );
};




export default App;