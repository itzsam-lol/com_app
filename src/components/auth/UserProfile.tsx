import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return <div>No user signed in.</div>;

  return (
    <div>
      <h2>User Profile</h2>
      {user.photoURL && <img src={user.photoURL} alt="Profile" style={{ width: 80, borderRadius: '50%' }} />}
      <p><strong>Name:</strong> {user.displayName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>UID:</strong> {user.uid}</p>
    </div>
  );
};

export default UserProfile;