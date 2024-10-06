import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditUserForm from './EditUserForm';
import CreateUserForm from './CreateUserForm';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingUser, setIsCreatingUser] = useState(false); // New state to toggle form visibility
  const navigate = useNavigate();

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
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Button to toggle the Create User Form */}
      <div className="mb-4">
        <button
          onClick={() => setIsCreatingUser(!isCreatingUser)} // Toggle form visibility
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isCreatingUser ? 'Cancel' : 'Create User'}
        </button>
      </div>

      {/* Conditionally render Create User Form */}
      {isCreatingUser && <CreateUserForm onUserAdded={handleUserAdded} />}

      {/* Table */}
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleView(user.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mx-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit User Form */}
      {selectedUser && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Edit User</h2>
          <EditUserForm user={selectedUser} onUserUpdated={handleUserUpdated} />
        </div>
      )}
    </div>
  );
};

export default UsersTable;
