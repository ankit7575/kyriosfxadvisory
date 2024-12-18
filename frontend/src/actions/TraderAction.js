import axios from 'axios';
import {
  REQUEST_TRADER_ACCOUNT,
  REQUEST_TRADER_ACCOUNT_SUCCESS,
  REQUEST_TRADER_ACCOUNT_FAIL,
  GET_TRADER_REQUESTS,
  GET_TRADER_REQUESTS_SUCCESS,
  GET_TRADER_REQUESTS_FAIL,
  UPDATE_VERIFICATION_STATUS,
  UPDATE_VERIFICATION_STATUS_SUCCESS,
  UPDATE_VERIFICATION_STATUS_FAIL,
  GET_TRADER_ACCOUNT_STATUS,
  GET_TRADER_ACCOUNT_STATUS_SUCCESS,
  GET_TRADER_ACCOUNT_STATUS_FAIL,
  CLEAR_ERRORS,
} from '../constants/TraderConstants';

// Helper function to extract error messages
const getErrorMessage = (error) => {
  if (error.response) {
    return error.response.data?.message || 'Something went wrong';
  } else if (error.message) {
    return error.message;
  }
  return 'Something went wrong';
};

// Helper function to get access token
const getAccessToken = () => localStorage.getItem('accessToken');

// Action to request a trader account
export const requestTraderAccount = (userData) => async (dispatch) => {
  dispatch({ type: REQUEST_TRADER_ACCOUNT });

  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Access denied. Please log in.');
    }

    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/update-trader-account`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: REQUEST_TRADER_ACCOUNT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({
      type: REQUEST_TRADER_ACCOUNT_FAIL,
      payload: errorMessage,
    });
  }
};

// Action to get all trader account requests (Admin)
export const getTraderRequests = () => async (dispatch) => {
  dispatch({ type: GET_TRADER_REQUESTS });

  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Access denied. Please log in.');
    }

    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/trader-requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_TRADER_REQUESTS_SUCCESS,
      payload: data.traderRequests,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({
      type: GET_TRADER_REQUESTS_FAIL,
      payload: errorMessage,
    });
  }
};

// Action to update trader account verification status (Admin)
export const updateVerificationStatus = (userId, status) => async (dispatch) => {
  dispatch({ type: UPDATE_VERIFICATION_STATUS });

  try {
    const token = getAccessToken(); // Assuming getAccessToken() is implemented to retrieve the JWT token
    if (!token) {
      throw new Error('Access denied. Please log in.');
    }

    // Assuming axios and the environment variable REACT_APP_BASE_URL are correctly set up
    const { data } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/admin/update-trader-status`,
      { userId, status },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Using the token in the request header
        },
      }
    );

    // Dispatch success action with the response data
    dispatch({
      type: UPDATE_VERIFICATION_STATUS_SUCCESS,
      payload: data.message, // Message to show in the UI
    });
  } catch (error) {
    // Get the error message and dispatch failure action
    const errorMessage = getErrorMessage(error); // Assuming getErrorMessage() is implemented
    dispatch({
      type: UPDATE_VERIFICATION_STATUS_FAIL,
      payload: errorMessage, // Send the error message to the reducer
    });
  }
};

// Action to get the current user's trader account status
export const getTraderAccountStatus = () => async (dispatch) => {
  dispatch({ type: GET_TRADER_ACCOUNT_STATUS });

  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Access denied. Please log in.');
    }

    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/trader-account-status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_TRADER_ACCOUNT_STATUS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({
      type: GET_TRADER_ACCOUNT_STATUS_FAIL,
      payload: errorMessage,
    });
  }
};


// Clear errors action
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

