import React from 'react';
import UserList from './components/UserList';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1">User Management System</span>
        </div>
      </nav>
      <div className="container">
        <UserList />
      </div>
      <footer className="footer mt-5 py-3 bg-light">
        <div className="container text-center">
          <span className="text-muted">© 2025 User Management System</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
