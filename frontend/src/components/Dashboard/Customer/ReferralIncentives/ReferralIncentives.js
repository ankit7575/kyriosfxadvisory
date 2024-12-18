import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewIncentiveData } from '../../../../actions/fundsAction'; // Import the action

const ReferralIncentives = () => {
  const dispatch = useDispatch();

  // Access state from Redux
  const { incentiveData, incentiveDataLoading, error } = useSelector((state) => state.fund);

  const [groupedIncentives, setGroupedIncentives] = useState({});
  const [selectedStage, setSelectedStage] = useState('All');
  const [expandedUserId, setExpandedUserId] = useState(null); // Track expanded user for dropdown

  // Dispatch the action to fetch incentive data on component mount
  useEffect(() => {
    dispatch(viewIncentiveData());
  }, [dispatch]);

  // When incentive data changes, group incentives by user ID
  useEffect(() => {
    if (incentiveData?.referralIncentives) {
      const allIncentives = [
        ...(incentiveData.referralIncentives.directReferral || []),
        ...(incentiveData.referralIncentives.stage2Referral || []),
        ...(incentiveData.referralIncentives.stage3Referral || []),
      ].flatMap(referral =>
        referral.history.flatMap(entry =>
          entry.fortnightlyProfit.flatMap(profitEntry =>
            profitEntry.history.map(profit => ({
              userId: referral.userId,
              name: referral.name,
              date: profit.date,
              fortnightlyProfit: profit.fortnightlyProfit || 0,
              directIncentive: profit.directIncentive || 0,
              referralStage: referral.stage || 'Unknown',
            }))
          )
        )
      );

      const grouped = allIncentives.reduce((acc, incentive) => {
        if (!acc[incentive.userId]) {
          acc[incentive.userId] = [];
        }
        acc[incentive.userId].push(incentive);
        return acc;
      }, {});
      setGroupedIncentives(grouped);
    }
  }, [incentiveData]);

  // Handle category selection (filtering by stage)
  const handleCategoryClick = (stage) => {
    setSelectedStage(stage);
    if (stage === 'All') {
      setGroupedIncentives(groupedIncentives); // Show all incentives
    } else if (incentiveData?.referralIncentives?.[stage]) {
      const filtered = incentiveData.referralIncentives[stage].flatMap(referral =>
        referral.history.flatMap(entry =>
          entry.fortnightlyProfit.flatMap(profitEntry =>
            profitEntry.history.map(profit => ({
              userId: referral.userId,
              name: referral.name,
              date: profit.date,
              fortnightlyProfit: profit.fortnightlyProfit || 0,
              directIncentive: profit.directIncentive || 0,
              referralStage: stage,
            }))
          )
        )
      );
      const grouped = filtered.reduce((acc, incentive) => {
        if (!acc[incentive.userId]) {
          acc[incentive.userId] = [];
        }
        acc[incentive.userId].push(incentive);
        return acc;
      }, {});
      setGroupedIncentives(grouped);
    } else {
      setGroupedIncentives({});
    }
  };

  // Toggle dropdown for a user
  const toggleDropdown = (userId) => {
    setExpandedUserId((prev) => (prev === userId ? null : userId));
  };

  // Handle loading and error states
  if (incentiveDataLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="table-container">
      <h2>Referral Incentives</h2>

      {/* Category Buttons */}
      <div className="category-buttons">
        <button
          className={`category-btn ${selectedStage === 'All' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('All')}
        >
          All
        </button>
        <button
          className={`category-btn ${selectedStage === 'directReferral' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('directReferral')}
        >
          Direct Referral
        </button>
        <button
          className={`category-btn ${selectedStage === 'stage2Referral' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('stage2Referral')}
        >
          Stage 2 Referral
        </button>
        <button
          className={`category-btn ${selectedStage === 'stage3Referral' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('stage3Referral')}
        >
          Stage 3 Referral
        </button>
      </div>

      {/* Incentive Data Table */}
      <table className="referral-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Incentive Date</th>
            <th>Fortnightly Profit</th>
            <th>Direct Incentive</th>
            <th>Referral Stage</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedIncentives).length > 0 ? (
            Object.entries(groupedIncentives).map(([userId, incentives], index) => {
              const recentIncentive = incentives[incentives.length - 1]; // Get the most recent incentive
              return (
                <React.Fragment key={userId}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{recentIncentive.name}</td>
                    <td>{new Date(recentIncentive.date).toLocaleDateString()}</td>
                    <td>{recentIncentive.fortnightlyProfit}</td>
                    <td>{recentIncentive.directIncentive}</td>
                    <td>{recentIncentive.referralStage}</td>
                    <td>
                      <button onClick={() => toggleDropdown(userId)}>
                        {expandedUserId === userId ? 'Hide' : 'View'}
                      </button>
                    </td>
                  </tr>
                  {expandedUserId === userId && (
                    <tr>
                      <td colSpan="7">
                        <table className="dropdown-table">
                          <thead>
                            <tr>
                              <th>Incentive Date</th>
                              <th>Fortnightly Profit</th>
                              <th>Direct Incentive</th>
                              <th>Referral Stage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {incentives.map((detail, i) => (
                              <tr key={i}>
                                <td>{new Date(detail.date).toLocaleDateString()}</td>
                                <td>{detail.fortnightlyProfit}</td>
                                <td>{detail.directIncentive}</td>
                                <td>{detail.referralStage}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <tr>
              <td colSpan="7">No incentives found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReferralIncentives;
