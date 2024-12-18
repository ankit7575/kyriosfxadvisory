import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateVerificationStatus, clearErrors } from '../../../../actions/TraderAction'; // Import the action

const UpdateVerificationStatus = () => {
  const dispatch = useDispatch();

  // Local state for handling form inputs
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Getting loading, error, and message from the Redux store
  const { loading, error, message } = useSelector((state) => state.trader); // Assuming state is 'trader'

  useEffect(() => {
    if (error) {
      setErrorMessage(error); // Display error message if any
      dispatch(clearErrors()); // Clear errors after displaying
    }
    if (message) {
      setErrorMessage(message); // Display success message if any
    }
  }, [dispatch, error, message]);

  // Form submission handler
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

  // Handling input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userId') {
      setUserId(value); // Update userId state
    } else if (name === 'status') {
      setStatus(value); // Update status state
    }
  };

  return (
    <div className="update-verification-status">
      <h2>Update Trader Verification Status</h2>
      <form onSubmit={handleSubmit}>
        {/* User ID input */}
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={userId}
            onChange={handleChange}
            placeholder="Enter User ID"
            required
          />
        </div>

        {/* Status dropdown */}
        <div className="form-group">
          <label htmlFor="status">Verification Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={handleChange}
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

      {/* Success message */}
      {message && <div className="success-message">{message}</div>}
    </div>
  );
};

export default UpdateVerificationStatus;
