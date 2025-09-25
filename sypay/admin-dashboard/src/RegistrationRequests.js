import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegistrationRequests.css';

// The base URL for our backend API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/users';

const RegistrationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending requests from the backend
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/pending`);
      setRequests(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch requests. Please make sure the backend server is running.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Using mock data for screenshot generation as backend is not running.
    const mockRequests = [
      { id: 1, full_name: 'Ahmad Al-Farsi', email: 'ahmad.farsi@email.com', date: '2024-09-24', id_card_path: '#', selfie_path: '#' },
      { id: 2, full_name: 'Fatima Al-Marzouqi', email: 'fatima.m@email.com', date: '2024-09-23', id_card_path: '#', selfie_path: '#' },
      { id: 3, full_name: 'Yusuf Al-Hadrami', email: 'yusuf.h@email.com', date: '2024-09-22', id_card_path: '#', selfie_path: '#' },
    ];
    setRequests(mockRequests);
    setLoading(false);
    // fetchRequests(); // Original call disabled for screenshot
  }, []);

  const handleApprove = (id) => console.log(`Approved request with ID: ${id}`);
  const handleReject = (id) => console.log(`Rejected request with ID: ${id}`);

  if (loading) {
    return <div>Loading requests...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="requests-container">
      <h2>Pending Registration Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Documents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id}>
                <td>{req.full_name}</td>
                <td>{req.email}</td>
                <td>{req.date}</td>
                <td>
                  <a href="#" rel="noopener noreferrer">ID Card</a> |
                  <a href="#" rel="noopener noreferrer">Selfie</a>
                </td>
                <td>
                  <button className="approve-btn" onClick={() => handleApprove(req.id)}>Approve</button>
                  <button className="reject-btn" onClick={() => handleReject(req.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RegistrationRequests;