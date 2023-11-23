import React from 'react';
import UserCard from './comp/userCard/UserCard';
import AnimatedHeading from './comp/AnimatedHeading/AnimatedHeading';
import './App.css';
const App = () => {
  return (
    <>
    <div className="app">
    <AnimatedHeading />    
        <UserCard />
    </div>
    </>
  );
};
 
export default App;