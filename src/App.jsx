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

  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  return (
    <div style={styles.appContainer}>
      <div style={styles.header}>
        <div style={styles.star}>★</div>
        <input
          type="text"
          placeholder="Search names..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.cardGrid}>
        {filteredUsers.length === 0 ? (
          <div style={styles.noResults}>No matching users found</div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} style={styles.card}>
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                style={styles.avatar}
              />
              <h3 style={styles.name}>
                <span style={styles.firstName}>{user.firstName}</span>
                <span style={styles.lastName}>{user.lastName}</span>
              </h3>
              <p style={styles.role}>{user.role}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    minHeight: '100vh',
    backgroundColor: '#2d2d2d',
    padding: '2rem',
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  header: {
    position: 'relative',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  star: {
    position: 'absolute',
    left: '30px',
    top: '-5px',
    fontSize: '2.5rem',
    color: '#FFD700',
    cursor: 'pointer',
    transition: 'transform 0.3s',
    ':hover': {
      transform: 'rotate(15deg) scale(1.1)',
    },
  },
  searchInput: {
    width: '50%',
    minWidth: '300px',
    padding: '15px 25px',
    borderRadius: '30px',
    border: '2px solid #444',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '1.1rem',
    transition: 'all 0.3s',
    ':focus': {
      outline: 'none',
      borderColor: '#FFD700',
      boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)',
    },
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
  },
  card: {
    background: '#3a3a3a',
    borderRadius: '15px',
    padding: '1.5rem',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
    ':hover': {
      transform: 'translateY(-7px)',
      boxShadow: '0 12px 20px rgba(0,0,0,0.3)',
    },
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '1rem',
    border: '3px solid #FFD700',
    objectFit: 'cover',
  },
  name: {
    color: '#fff',
    margin: '1rem 0',
    lineHeight: '1.4',
  },
  firstName: {
    display: 'block',
    fontSize: '1.3rem',
    fontWeight: '600',
  },
  lastName: {
    display: 'block',
    fontSize: '1.1rem',
    color: '#aaa',
  },
  role: {
    color: '#FFD700',
    fontSize: '0.95rem',
    marginTop: '0.5rem',
  },
  noResults: {
    color: '#fff',
    fontSize: '1.2rem',
    textAlign: 'center',
    gridColumn: '1 / -1',
    padding: '2rem',
  },
};

export default App;