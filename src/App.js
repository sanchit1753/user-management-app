import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersTable from './Components/UsersTable';
import UserDetails from './Components/UserDetails';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersTable />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;