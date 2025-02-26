import React, { useState } from 'react';

const App = () => {
  const [users] = useState([
    { id: 1, firstName: 'Sylvia', lastName: 'Ernser', role: 'Investor Usability Planner', image: 'https://www.w3schools.com/howto/img_avatar.png' },
    { id: 2, firstName: 'Hazel', lastName: 'Gleicher', role: 'Global Identity Specialist', image: 'https://www.w3schools.com/howto/img_avatar.png' },
    { id: 3, firstName: 'Leon', lastName: 'Lueilwitz MD', role: 'Legacy Paradigm Administrator', image: 'https://www.w3schools.com/howto/img_avatar.png' },
    { id: 4, firstName: 'Annie', lastName: 'Leannon', role: 'Human Web Associate', image: 'https://www.w3schools.com/howto/img_avatar.png' },
    { id: 5, firstName: 'Valerie', lastName: 'Boehm', role: 'Investor Integration Supervisor', image: 'https://www.w3schools.com/howto/img_avatar.png' },
    { id: 6, firstName: 'Kari', lastName: 'Beatty', role: 'Product Solutions Facilitator', image: 'https://www.w3schools.com/howto/img_avatar.png' },
    { id: 7, firstName: 'Katherine', lastName: 'Labadie PhD', role: 'Dynamic Program Director', image: 'https://www.w3schools.com/howto/img_avatar.png' },
    { id: 8, firstName: 'Antonia', lastName: 'Grimes', role: 'Human Integration Planner', image: 'https://www.w3schools.com/howto/img_avatar.png' },
  ]);

  const [search, setSearch] = useState('');

  const styles = {
    appContainer: {
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      padding: '2rem',
      fontFamily: "'Arial', sans-serif",
    },
    header: {
      position: 'relative',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    star: {
      position: 'absolute',
      left: '20px',
      top: '0',
      fontSize: '2rem',
      color: '#FFD700',
      cursor: 'pointer',
      transition: 'transform 0.3s',
      ':hover': {
        transform: 'scale(1.2)',
      },
    },
    searchInput: {
      width: '60%',
      margin: '0 auto',
      padding: '12px 20px',
      borderRadius: '25px',
      border: 'none',
      backgroundColor: '#333',
      color: 'white',
      fontSize: '1rem',
      boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
      '::placeholder': {
        color: '#999',
      },
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    card: {
      background: '#333',
      borderRadius: '15px',
      padding: '1.5rem',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 15px rgba(0,0,0,0.3)',
      },
    },
    avatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      marginBottom: '1rem',
      border: '2px solid #FFD700',
    },
    name: {
      color: 'white',
      margin: '0.5rem 0',
      fontSize: '1.2rem',
      fontWeight: '600',
    },
    role: {
      color: '#FFD700',
      fontSize: '0.9rem',
    },
  };

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.appContainer}>
      <div style={styles.header}>
        <div style={styles.star}>★</div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.cardGrid}>
        {filteredUsers.map((user) => (
          <div key={user.id} style={styles.card}>
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              style={styles.avatar}
            />
            <h3 style={styles.name}>{user.firstName}<br />{user.lastName}</h3>
            <p style={styles.role}>{user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;