import React, { useState } from 'react'

const profile = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isProposed,setProposal] = useState(false);
    const handleProposal = ()=>{
        
          console.log("true");
            setProposal(true);  
            
    }
    
  return (
       <div style={styles.container}>
    <h1 style={styles.title}>💖 My Dear Special Proposal 💖</h1>
    <p style={styles.message}>
      I’ve enjoyed every moment we’ve spent together, and I can’t imagine my life without you.
      Will you make me the happiest person by being my partner for life?
    </p>
    <button onClick={handleProposal} style={styles.button}>
      Propose
    </button>
    {isProposed && (
      <div style={styles.response}>
        <h2>💍 You are my everything! 💍</h2>
        <p style={styles.responseMessage}>
          I would love to spend my life with you!
        </p>
      </div>
    )}
    </div>
  )
};
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
  };
  
  


export default profile;