import React, { useEffect, useState } from "react";
import './home.css';
// import Testpage from "./Testpage"; // Assuming Testpage is a separate component
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../../actions/userActions"; // Import loadUser action
import UserProfile from "./UserProfile"; // New component for User Profile section
import AllTeamReferral from "./ReferralTable";
import IncentivesProfit from "./IncentivesProfit";
import FortnightlyProfitCharts from "./FortnightlyProfitCharts";
// import FortnightlyProfitCharts from "./FortnightlyProfitCharts"
const Section1 = () => {
  const dispatch = useDispatch();

  // Access the user data and loading state from Redux store
  const { user, loading, error } = useSelector(state => state.user);

  const [profitData, setProfitData] = useState([]);

  // Fetching data on component mount using loadUser action
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // Check if the user data is loaded
  useEffect(() => {
    if (user && user.referral && user.referral.directReferral) {
      const allData = user.referral.directReferral.flatMap(referral =>
        referral.history.flatMap(historyItem => historyItem.fortnightlyProfitIncentive || [])
      );
      setProfitData(allData);
    }
  }, [user]);

  // Calculate total count (e.g., items in the profit data array)
  const totalCount = profitData.length;

  // Render loading or error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // If no user data, show a fallback
  if (!user) return <div>No user data available</div>;

  return (
    <div className="customer-dashboard">
      <h1 className="dashboard-title">Welcome, {user.name || "User"}</h1>

      {/* User Profile Section */}
      <UserProfile user={user} totalCount={totalCount} />

      {/* Referral Table Section */}
      <div className="row" >
        <FortnightlyProfitCharts/>
      <AllTeamReferral />
      <IncentivesProfit/>

      </div>
     
    </div>
  );
};

export default Section1;
