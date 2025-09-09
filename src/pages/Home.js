import React from 'react';

const Home = () => {
  return (
    <div className="home-container" style={{ 
      background: 'repeating-conic-gradient(#4a90e2 0% 25%, #50e3c2 0% 50%)',
      minHeight: '100vh', 
      color: '#f0f4f8', 
      padding: '4rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textShadow: '2px 2px 8px rgba(0,0,0,0.7)'
    }}>
      <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '1rem' }}>
        Discover Amazing Stories
      </h1>
      <p style={{ fontSize: '1.5rem', maxWidth: '700px', marginBottom: '2rem' }}>
        Explore the latest thoughts, ideas, and stories from our vibrant community.
      </p>
      <div style={{
        width: '80%',
        maxWidth: '800px',
        height: '400px',
        borderRadius: '15px',
        background: 'repeating-radial-gradient(circle at center, #50e3c2 0 10px, #4a90e2 10px 20px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
      }}>
      </div>
    </div>
  );
};

export default Home;
