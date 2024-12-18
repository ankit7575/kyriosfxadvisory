import axios from 'axios';
import {
  VIEW_REFERRAL_DATA_REQUEST,
  VIEW_REFERRAL_DATA_SUCCESS,
  VIEW_REFERRAL_DATA_FAIL,
  VIEW_Incentive_DATA_REQUEST,
  VIEW_Incentive_DATA_SUCCESS,
  VIEW_Incentive_DATA_FAIL,
  VIEW_Fortnightly_DATA_REQUEST,
  VIEW_Fortnightly_DATA_SUCCESS,
  VIEW_Fortnightly_DATA_FAIL,
  ADD_FORTNIGHTLY_PROFIT_REQUEST,
  ADD_FORTNIGHTLY_PROFIT_SUCCESS,
  ADD_FORTNIGHTLY_PROFIT_FAIL,
  VIEW_Admin_INCENTIVE_DATA_REQUEST,
  VIEW_Admin_INCENTIVE_DATA_SUCCESS,
  VIEW_Admin_INCENTIVE_DATA_FAIL,
  VIEW_Admin_FORTNIGHTLY_DATA_REQUEST,
  VIEW_Admin_FORTNIGHTLY_DATA_SUCCESS,
  VIEW_Admin_FORTNIGHTLY_DATA_FAIL,
  CLEAR_ERRORS,
} from '../constants/fundConstants';

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

// View Referral Data
export const viewReferralData = () => async (dispatch) => {
  dispatch({ type: VIEW_REFERRAL_DATA_REQUEST });

  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Access denied. Please log in.');
    }

    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/viewReferralData`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: VIEW_REFERRAL_DATA_SUCCESS, payload: data.referrals });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({
      type: VIEW_REFERRAL_DATA_FAIL,
      payload: errorMessage,
    });
  }
};

// View Incentive Data
export const viewIncentiveData = () => async (dispatch) => {
  dispatch({ type: VIEW_Incentive_DATA_REQUEST });

  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Access denied. Please log in.');
    }

    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/viewIncentiveData`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: VIEW_Incentive_DATA_SUCCESS, payload: data.incentiveData });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({
      type: VIEW_Incentive_DATA_FAIL,
      payload: errorMessage,
    });
  }
};

// View Fortnightly Data
export const viewFortnightlyData = () => async (dispatch) => {
  dispatch({ type: VIEW_Fortnightly_DATA_REQUEST });

  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Access denied. Please log in.');
    }

    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/viewFortnightlyProfitData`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: VIEW_Fortnightly_DATA_SUCCESS, payload: data.fortnightlyProfitData });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({
      type: VIEW_Fortnightly_DATA_FAIL,
      payload: errorMessage,
    });
  }
};

// Add Fortnightly Profit
export const addFortnightlyProfit = (userId, profitAmount) => async (dispatch) => {
  dispatch({ type: ADD_FORTNIGHTLY_PROFIT_REQUEST });

  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Access denied. Please log in.');
    }

    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/addFortnightlyProfit`, { userId, profitAmount }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: ADD_FORTNIGHTLY_PROFIT_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({
      type: ADD_FORTNIGHTLY_PROFIT_FAIL,
      payload: errorMessage,
    });
  }
};

// View All Admin Incentive Data
export const viewAdminIncentiveData = (page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc', filterByName) => async (dispatch) => {
  dispatch({ type: VIEW_Admin_INCENTIVE_DATA_REQUEST });

  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Access denied. Please log in.');
    }

    const queryParams = new URLSearchParams({ page, limit, sortBy, sortOrder });
    if (filterByName) {
      queryParams.append('filterByName', filterByName);
    }

    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/viewIncentiveData?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: VIEW_Admin_INCENTIVE_DATA_SUCCESS, payload: data.adminIncentiveData });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({
      type: VIEW_Admin_INCENTIVE_DATA_FAIL,
      payload: errorMessage,
    });
  }
};

// View All Admin Fortnightly Data
export const viewAdminFortnightlyData = (page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc', filterByName) => async (dispatch) => {
  dispatch({ type: VIEW_Admin_FORTNIGHTLY_DATA_REQUEST });

  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Access denied. Please log in.');
    }

    const queryParams = new URLSearchParams({ page, limit, sortBy, sortOrder });
    if (filterByName) {
      queryParams.append('filterByName', filterByName);
    }

    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/viewFortnightlyData?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: VIEW_Admin_FORTNIGHTLY_DATA_SUCCESS, payload: data.adminFortnightlyData });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({
      type: VIEW_Admin_FORTNIGHTLY_DATA_FAIL,
      payload: errorMessage,
    });
  }
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
