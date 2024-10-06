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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!user) {
    return <p className="text-center">No user found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Details: {user.name}</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Website:</strong>{' '}
        <a
          href={`http://${user.website}`}
          className="text-blue-500 hover:underline"
        >
          {user.website}
        </a>
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Address</h3>
      <p>
        <strong>Street:</strong> {user.address.street}
      </p>
      <p>
        <strong>City:</strong> {user.address.city}
      </p>
      <p>
        <strong>Zipcode:</strong> {user.address.zipcode}
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Company</h3>
      <p>
        <strong>Name:</strong> {user.company.name}
      </p>
      <p>
        <strong>Catch Phrase:</strong> {user.company.catchPhrase}
      </p>
    </div>
  );
};

export default UserDetails;
