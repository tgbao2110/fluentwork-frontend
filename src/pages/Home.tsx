import React from 'react';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar userName="User Name" profilePicUrl="https://via.placeholder.com/150" />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
