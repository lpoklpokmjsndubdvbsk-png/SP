import React from 'react';
import './App.css';
import RegistrationRequests from './RegistrationRequests';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sypay Admin Dashboard</h1>
      </header>
      <main>
        <RegistrationRequests />
      </main>
    </div>
  );
}

export default App;