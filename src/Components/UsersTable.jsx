import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import EditUserForm from './EditUserForm';
import CreateUserForm from './CreateUserForm';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingUser, setIsCreatingUser] = useState(false); // Toggle form visibility
  const navigate = useNavigate();
  const editSectionRef = useRef(null); // Reference for Edit Section

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  // Handler for the search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtered users based on the search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (id) => {
    navigate(`/users/${id}`);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    // Scroll to the edit section
    setTimeout(() => {
      editSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setUsers(users.filter(user => user.id !== id));
    });
  };

  const handleUserAdded = (user) => {
    setUsers([...users, user]);
    setIsCreatingUser(false); // Close form after user is added
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setSelectedUser(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-blue-50 shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-blue-700 text-center">User Management</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Button to toggle the Create User Form */}
      <div className="mb-6 text-right">
        <button
          onClick={() => setIsCreatingUser(!isCreatingUser)} // Toggle form visibility
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {isCreatingUser ? 'Cancel' : 'Create User'}
        </button>
      </div>

      {/* Conditionally render Create User Form */}
      {isCreatingUser && <CreateUserForm onUserAdded={handleUserAdded} />}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-200">
              <th className="px-6 py-3 text-left text-blue-600">ID</th>
              <th className="px-6 py-3 text-left text-blue-600">Name</th>
              <th className="px-6 py-3 text-left text-blue-600">Email</th>
              <th className="px-6 py-3 text-left text-blue-600">Phone</th>
              <th className="px-6 py-3 text-left text-blue-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-blue-100 transition">
                  <td className="border px-6 py-4 text-gray-700">{user.id}</td>
                  <td className="border px-6 py-4 text-gray-700">{user.name}</td>
                  <td className="border px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="border px-6 py-4 text-gray-700">{user.phone}</td>
                  <td className="border px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => handleView(user.id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit User Form */}
      {selectedUser && (
        <div ref={editSectionRef} className="mt-10 bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit User</h2>
          <EditUserForm user={selectedUser} onUserUpdated={handleUserUpdated} />
        </div>
      )}
    </div>
  );
};

export default UsersTable;
