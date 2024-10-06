// src/CreateUserForm.js

import React, { useState } from 'react';

const CreateUserForm = ({ onUserAdded }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: { street: '', city: '' },
    company: { name: '' },
    website: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setNewUser((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else if (name.startsWith('company.')) {
      const field = name.split('.')[1];
      setNewUser((prev) => ({
        ...prev,
        company: { ...prev.company, [field]: value },
      }));
    } else {
      setNewUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!newUser.name) validationErrors.name = 'Name is required';
    if (!newUser.email || !/\S+@\S+\.\S+/.test(newUser.email))
      validationErrors.email = 'Valid email required';
    if (!newUser.phone || newUser.phone.length < 10)
      validationErrors.phone = 'Phone must be at least 10 digits';
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        onUserAdded(data);
        setNewUser({
          name: '',
          email: '',
          phone: '',
          username: '',
          address: { street: '', city: '' },
          company: { name: '' },
          website: '',
        });
        setErrors({});
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Phone:</label>
          <input
            type="text"
            name="phone"
            value={newUser.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Street:</label>
          <input
            type="text"
            name="address.street"
            value={newUser.address.street}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">City:</label>
          <input
            type="text"
            name="address.city"
            value={newUser.address.city}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUserForm;
