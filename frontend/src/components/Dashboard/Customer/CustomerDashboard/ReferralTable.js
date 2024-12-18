import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewReferralData } from '../../../../actions/fundsAction';  // Import the action

const AllTeamReferral = () => {
  const dispatch = useDispatch();

  // Access state from Redux
  const { referralData, referralDataLoading, error } = useSelector((state) => state.fund);

  const [filteredReferrals, setFilteredReferrals] = useState([]);
  const [limit, setLimit] = useState(5);  // Set a limit for showing referrals

  // Dispatch the action to fetch referral data on component mount
  useEffect(() => {
    dispatch(viewReferralData());
  }, [dispatch]);

  // When referral data changes, update filtered referrals
  useEffect(() => {
    if (referralData && referralData.length > 0) {
      setFilteredReferrals(referralData);  // Initially showing all referrals
    }
  }, [referralData]);

  // Handle loading and error states at the end
  if (referralDataLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Total referral count
  const totalReferrals = filteredReferrals.length;

  // Limit the referrals displayed
  const limitedReferrals = filteredReferrals.slice(0, limit);

  return (
    <div className="col-lg-6">
      <div className="table-container">
        <h3>Recently Team Referral</h3>
        {/* Display total count of referrals */}
        <p>Total Referrals: {totalReferrals}</p>

        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Team Size</th>
              <th>Referral Stage</th>
              <th>User Account</th>
           
            </tr>
          </thead>
          <tbody>
            {limitedReferrals && limitedReferrals.length > 0 ? (
              limitedReferrals.map((referral, idx) => (
                <tr key={idx}>
                  <td>{referral.name}</td>
                  <td>{referral.teamSize}</td>
                  <td>{referral.referralStage}</td>
                  <td>{referral.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No referrals found.</td> {/* Adjusted colSpan to 4 */}
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination or button to load more */}
        {totalReferrals > limit && (
          <button onClick={() => setLimit(limit + 5)} className="btn btn-primary">
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default AllTeamReferral;
