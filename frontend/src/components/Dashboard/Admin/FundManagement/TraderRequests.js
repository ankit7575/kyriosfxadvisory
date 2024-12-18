import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTraderRequests, updateVerificationStatus } from '../../../../actions/TraderAction'; // Import the actions

const TraderRequests = () => {
  const dispatch = useDispatch();

  // Local state for handling form inputs
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Getting loading, error, and message from the Redux store
  const { traderRequests = [], loading, error, message } = useSelector((state) => state.trader);

  useEffect(() => {
    dispatch(getTraderRequests()); // Fetch trader requests when component loads

    if (error) {
      setErrorMessage(error); // Display error message if any
    }
    if (message) {
      setErrorMessage(message); // Display success message if any
    }
  }, [dispatch, error, message]);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Form submission handler for updating verification status
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (!userId || !status) {
      setErrorMessage('User ID and Verification Status are required.');
      return;
    }

    // Prepare verification data
    const verificationData = {
      userId,
      status,
    };

    // Dispatch action to update verification status
    dispatch(updateVerificationStatus(verificationData.userId, verificationData.status));
  };

  // Handling input changes for status
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // Handling the selection toggle for user ID (checkbox)
  const handleUserIdCheck = (clickedUserId, currentStatus) => {
    if (userId === clickedUserId) {
      setUserId(''); // Deselect if the same user is clicked
      setStatus(''); // Reset status
    } else {
      setUserId(clickedUserId); // Set userId for the selected trader
      setStatus(currentStatus); // Set the corresponding status for the selected trader
    }
  };

  return (
    <div>
      <h1>Trader Requests</h1>

      {/* Form to update status */}
      <div>
        <h2>Update Trader Status</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="status">Verification Status</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={handleStatusChange}
              required
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Error message */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {/* Submit button */}
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Status'}
          </button>
        </form>
      </div>

      {/* Trader requests table */}
      <h2>Trader Requests List</h2>
      <table>
        <thead>
          <tr>
            <th>Trader ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Plan</th>
            <th>Capital</th>
            <th>Broker Name</th>
            <th>Country</th>
            <th>MT5 ID</th>
            <th>Select ID</th> {/* Column for check-in/check-out */}
          </tr>
        </thead>
        <tbody>
          {traderRequests && traderRequests.length > 0 ? (
            traderRequests.map((request) => (
              <tr key={request._id}>
                <td>{request._id}</td>
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>{request.role}</td>
                <td>{request.profile?.plan || "N/A"}</td>
                <td>{request.profile?.capital || "N/A"}</td>
                <td>{request.profile?.brokerName || "N/A"}</td>
                <td>{request.profile?.country || "N/A"}</td>
                <td>{request.profile?.mt5Id || "N/A"}</td>
                <td>
                  {/* Checkbox for selecting the Trader ID */}
                  <input
                    type="checkbox"
                    checked={userId === request._id}  // Automatically check if this user is selected
                    onChange={() => handleUserIdCheck(request._id, request.status)} // Trigger onChange for selection/deselection
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No trader requests available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Success message */}
      {message && <div className="success-message">{message}</div>}
    </div>
  );
};

export default TraderRequests;
