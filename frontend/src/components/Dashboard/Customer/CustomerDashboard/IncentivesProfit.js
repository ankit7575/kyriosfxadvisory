import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewIncentiveData } from '../../../../actions/fundsAction'; // Import the action

const IncentivesProfit = () => {
  const dispatch = useDispatch();

  // Access state from Redux
  const { incentiveData, incentiveDataLoading, error } = useSelector((state) => state.fund);

  const [filteredIncentiveData, setFilteredIncentiveData] = useState([]);
  const [limit, setLimit] = useState(5); // Set a limit for showing referrals

  // Dispatch the action to fetch incentive data on component mount
  useEffect(() => {
    dispatch(viewIncentiveData());
  }, [dispatch]);

  // When incentive data changes, update filtered data
  useEffect(() => {
    if (incentiveData?.referralIncentives?.directReferral) {
      // Process the `directReferral` data to extract meaningful information
      const flatIncentiveData = incentiveData.referralIncentives.directReferral.flatMap(referral =>
        referral.history.flatMap(entry =>
          entry.fortnightlyProfit.flatMap(profitEntry =>
            profitEntry.history.map(profit => ({
              name: referral.name,
              date: profit.date,
              fortnightlyProfit: profit.fortnightlyProfit || 0,
              directIncentive: profit.directIncentive || 0,
            }))
          )
        )
      );

      setFilteredIncentiveData(flatIncentiveData); // Update state with processed data
    }
  }, [incentiveData]);

  // Handle loading and error states at the end
  if (incentiveDataLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Total incentive data count
  const totalIncentives = filteredIncentiveData.length;

  // Limit the incentives displayed
  const limitedIncentives = filteredIncentiveData.slice(0, limit);

  return (
    <div className="col-lg-6">
      <div className="table-container">
        <h3>Recently Earned Incentives</h3>
        {/* Display total count of incentives */}
        <p>Total Incentives: {totalIncentives}</p>

        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Incentive Date</th>
              <th>Fortnightly Profit</th>
              <th>Direct Incentive</th>
            </tr>
          </thead>
          <tbody>
            {limitedIncentives && limitedIncentives.length > 0 ? (
              limitedIncentives.map((incentive, idx) => (
                <tr key={idx}>
                  <td>{incentive.name}</td>
                  <td>{new Date(incentive.date).toLocaleDateString()}</td>
                  <td>{incentive.fortnightlyProfit}</td>
                  <td>{incentive.directIncentive}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No incentives found.</td> {/* Adjusted colSpan to 4 */}
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination or button to load more */}
        {totalIncentives > limit && (
          <button onClick={() => setLimit(limit + 5)} className="btn btn-primary">
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default IncentivesProfit;
