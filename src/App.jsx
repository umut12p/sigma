import React, { useState } from 'react';

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', image: 'https://www.w3schools.com/howto/img_avatar.png' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', image: 'https://www.w3schools.com/howto/img_avatar.png' },
  ]);
  const [search, setSearch] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddUser = () => {
    if (newFirstName.trim() && newLastName.trim()) {
      const newUser = {
        id: users.length + 1,
        firstName: newFirstName,
        lastName: newLastName,
        image: 'https://www.w3schools.com/howto/img_avatar.png',
      };
      setUsers([...users, newUser]);
      setNewFirstName('');
      setNewLastName('');
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>User List</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="First Name"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
          style={{ marginRight: '10px', padding: '10px' }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
          style={{ marginRight: '10px', padding: '10px' }}
        />
        <button onClick={handleAddUser} style={{ padding: '10px 20px' }}>
          Add User
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              style={{ borderRadius: '50%', marginBottom: '10px' }}
            />
            <h3>{user.firstName} {user.lastName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
