import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFortnightlyProfit, clearErrors } from '../../../../actions/fundsAction';

const AddFund = () => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState('');
  const [profitAmount, setProfitAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { loading, error, message } = useSelector((state) => state.fund);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      dispatch(clearErrors());
    }
    if (message) {
      setErrorMessage(message);
    }
  }, [dispatch, error, message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId || !profitAmount) {
      setErrorMessage('User ID and Profit Amount are required.');
      return;
    }

    const profitData = {
      userId,
      profitAmount: parseFloat(profitAmount),
    };

    dispatch(addFortnightlyProfit(profitData.userId, profitData.profitAmount));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userId') {
      setUserId(value);
    } else if (name === 'profitAmount') {
      setProfitAmount(value);
    }
  };

  return (
    <div className="add-fund">
      <h2>Add Fortnightly Profit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={userId}
            onChange={handleChange}
            placeholder="Enter User ID"
          />
        </div>

        <div className="form-group">
          <label htmlFor="profitAmount">Profit Amount</label>
          <input
            type="number"
            id="profitAmount"
            name="profitAmount"
            value={profitAmount}
            onChange={handleChange}
            placeholder="Enter Profit Amount"
            min="0"
          />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Profit'}
        </button>
      </form>

      {message && <div className="success-message">{message}</div>}
    </div>
  );
};

export default AddFund;
