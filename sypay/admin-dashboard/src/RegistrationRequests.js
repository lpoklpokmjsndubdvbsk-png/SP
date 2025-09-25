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
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`${API_URL}/approve/${id}`);
      // Refresh the list after approval
      fetchRequests();
    } catch (err) {
      console.error('Approval error:', err);
      alert(`Failed to approve user ${id}.`);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`${API_URL}/reject/${id}`);
      // Refresh the list after rejection
      fetchRequests();
    } catch (err) {
      console.error('Rejection error:', err);
      alert(`Failed to reject user ${id}.`);
    }
  };

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
                  {/* In a real app, these would link to a secure file-serving endpoint */}
                  <a href={`http://localhost:5000/${req.id_card_path}`} target="_blank" rel="noopener noreferrer">ID Card</a> |
                  <a href={`http://localhost:5000/${req.selfie_path}`} target="_blank" rel="noopener noreferrer">Selfie</a>
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