// src/UserDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams(); // Extract the user ID from the URL
  const [user, setUser] = useState(null); // Store the user details
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any errors

  useEffect(() => {
    // Fetch user details from the API
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch user data');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!user) {
    return <p className="text-center text-gray-500">No user found</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
          User Details
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {/* User Information */}
          <div className="p-6 bg-blue-50 rounded-md shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{user.name}</h3>
            <p className="text-gray-700 mb-1">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Phone:</strong> {user.phone}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="text-gray-700">
              <strong>Website:</strong>{' '}
              <a
                href={`http://${user.website}`}
                className="text-blue-500 hover:underline"
              >
                {user.website}
              </a>
            </p>
          </div>

          {/* Address */}
          <div className="p-6 bg-blue-50 rounded-md shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
            <p className="text-gray-700 mb-1">
              <strong>Street:</strong> {user.address.street}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>City:</strong> {user.address.city}
            </p>
            <p className="text-gray-700">
              <strong>Zipcode:</strong> {user.address.zipcode}
            </p>
          </div>

          {/* Company */}
          <div className="p-6 bg-blue-50 rounded-md shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Company</h3>
            <p className="text-gray-700 mb-1">
              <strong>Name:</strong> {user.company.name}
            </p>
            <p className="text-gray-700">
              <strong>Catch Phrase:</strong> {user.company.catchPhrase}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
