import React from 'react';

const UserProfile = ({ user, totalProfit }) => {
  return (
    <div className="profitbox">
      <div className="row">
        <div className="col-lg-4">
          <div className="Fortnightlyprofit">
            <div className="status">
              <strong>Fortnightly Profit: </strong> {totalProfit}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="accountstatus">
            <div className="status">
              <strong>Account Status: </strong> {user?.role}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="accountstatus">
          <div className="status">
              <strong>   REF Number:</strong> {user?.referralId}
            </div>
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
