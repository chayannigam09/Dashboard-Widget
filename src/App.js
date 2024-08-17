import React from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/dashboard/Header';

const App = () => {
  return (
    <div>
      <Header/>
      <Dashboard />
    </div>
  );
};

export default App;

