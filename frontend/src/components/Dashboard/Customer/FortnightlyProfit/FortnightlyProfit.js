import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // For navigation
import { loadUser } from '../../../../actions/userActions'; // Import loadUser action
import { viewFortnightlyData } from '../../../../actions/fundsAction'; // Import viewFortnightlyData action

const FortnightlyProfit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the user data and loading state from Redux store
  const { user, loading: userLoading, error: userError } = useSelector((state) => state.user);
  const { fortnightlyData, loading: dataLoading, error: dataError, message } = useSelector((state) => state.fund);

  const [profitData, setProfitData] = useState([]);

  // Fetch user data on component mount using loadUser action
  useEffect(() => {
    dispatch(loadUser()); // Load user data when the component mounts
  }, [dispatch]);

  // Extract referral profit data if available
  useEffect(() => {
    if (user && user.referral && user.referral.directReferral) {
      const allData = user.referral.directReferral.flatMap((referral) =>
        referral.history.flatMap((historyItem) => historyItem.fortnightlyProfitIncentive || [])
      );
      setProfitData(allData); // Set referral profit data
    }
  }, [user]);

  // Fetch fortnightly data if the user is a trader
  useEffect(() => {
    if (user && user.role === 'trader') {
      dispatch(viewFortnightlyData()); // Dispatch the action to fetch the fortnightly data
    }
  }, [dispatch, user]);

  // Render loading or error state for user data
  if (userLoading) return <div>Loading user data...</div>;
  if (userError) return <div>Error loading user data: {userError}</div>;

  // Render loading or error state for fetching fortnightly data
  if (dataLoading) return <div>Loading fortnightly data...</div>;
  if (dataError) return <div style={{ color: 'red' }}>Error: {dataError}</div>;

  // If there's a message, display it
  if (message) return <div style={{ color: 'green' }}>{message}</div>;

  // If no user data or role is not trader, show access restricted message and navigate
  if (!user || user.role !== 'trader') {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h3 style={{ color: '#555' }}>Access Restricted</h3>
        <p style={{ color: '#888' }}>
          Only trader accounts can access this page. <br />
          Your current role: <strong>{user ? user.role : 'No role available'}</strong>. <br />
          Please update your account to a trader account to continue.
        </p>
        <button
          onClick={() => navigate('/trade-authentication')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Update to Trader Account
        </button>
      </div>
    );
  }

  // Render the main content for trader role
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Fortnightly Profit Data</h2>

      {fortnightlyData && fortnightlyData.length > 0 ? (
        <div>
        
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>#</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Profit</th>
              </tr>
            </thead>
            <tbody>
              {fortnightlyData.map((data, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(data.date).toLocaleDateString()}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{data.fortnightlyProfit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No profit data available</div>
      )}

      {profitData.length > 0 && (
        <div>
          <h3>Referral Profit Data</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#28a745', color: '#fff' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>#</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Profit</th>
              </tr>
            </thead>
            <tbody>
              {profitData.map((data, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(data.date).toLocaleDateString()}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{data.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FortnightlyProfit;
