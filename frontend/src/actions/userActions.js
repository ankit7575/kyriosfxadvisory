import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  LOGOUT_USER,
  LOGOUT_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAIL,
  USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
} from "../constants/userConstants";

// Helper function for error handling
const getErrorMessage = (error) => {
  if (error.response) {
    return error.response.data?.message || "Something went wrong";
  } else if (error.message) {
    return error.message;
  }
  return "Something went wrong";
};


// Helper functions for token management
const getToken = () => localStorage.getItem("accessToken");
const setToken = (token) => localStorage.setItem("accessToken", token);
const removeToken = () => localStorage.removeItem("accessToken");

// Add timeout logic to each action
const handleTimeout = (dispatch) => {
  return setTimeout(() => {
    dispatch({ type: CLEAR_ERRORS });
  }, 15000); // 15 seconds timeout
};

// Action creators for user actions
export const register = (formData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  const timeout = handleTimeout(dispatch);

  try {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/register`, formData);
    dispatch({ type: REGISTER_SUCCESS, payload: data });
    sessionStorage.setItem("userEmail", formData.email);
    window.location.href = "/validate-form";
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({ type: REGISTER_FAIL, payload: errorMessage });
  } finally {
    clearTimeout(timeout);
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  const timeout = handleTimeout(dispatch);

  try {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, { email, password });
    setToken(data.accessToken);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({ type: LOGIN_FAIL, payload: errorMessage });
  } finally {
    clearTimeout(timeout);
  }
};

export const verifyOtp = (otpData) => async (dispatch) => {
  dispatch({ type: VERIFY_OTP_REQUEST });

  const timeout = handleTimeout(dispatch);

  try {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/verify-otp`, otpData);
    if (data.accessToken) {
      setToken(data.accessToken); // Save the access token after OTP verification
      dispatch({ type: VERIFY_OTP_SUCCESS, payload: data });
      dispatch(loadUser());
      window.location.href = "/";
    } else {
      dispatch({
        type: VERIFY_OTP_FAIL,
        payload: "OTP verification failed, please try again.",
      });
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({ type: VERIFY_OTP_FAIL, payload: errorMessage });
  } finally {
    clearTimeout(timeout);
  }
};

export const loadUser = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: LOAD_USER_REQUEST });

  const timeout = handleTimeout(dispatch);

  try {
    const token = getToken(); // Get the token from localStorage
    if (!token) {
      throw new Error("Please log in");
    }

    // Making sure the token is being sent in the header
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({ type: LOAD_USER_FAIL, payload: errorMessage });
  } finally {
    clearTimeout(timeout);
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: FORGOT_PASSWORD_REQUEST });

  const timeout = handleTimeout(dispatch);

  try {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/password/forgot`, { email });
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({ type: FORGOT_PASSWORD_FAIL, payload: errorMessage });
  } finally {
    clearTimeout(timeout);
  }
};

export const resetPassword = (token, newPassword, confirmPassword) => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: RESET_PASSWORD_REQUEST });

  const timeout = handleTimeout(dispatch);

  try {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/password/reset/${token}`, { password: newPassword, confirmPassword });
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({ type: RESET_PASSWORD_FAIL, payload: errorMessage });
  } finally {
    clearTimeout(timeout);
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });

  const timeout = handleTimeout(dispatch);

  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/logout`);
    removeToken();
    dispatch({ type: LOGOUT_USER });
    window.location.reload();
  } catch (error) {
    console.error("Logout failed:", error);
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.message || "Logout failed due to an error." });
  } finally {
    clearTimeout(timeout);
  }
};

export const updateUserProfile = (userData) => async (dispatch, getState) => {
  dispatch({ type: CLEAR_ERRORS });

  const timeout = handleTimeout(dispatch);

  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const { user } = getState().user;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/update-profile`, userData, config);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: error.response ? error.response.data.message : error.message });
  } finally {
    clearTimeout(timeout);
  }
};

export const updateUserPassword = (oldPassword, newPassword) => async (dispatch, getState) => {
  dispatch({ type: CLEAR_ERRORS });

  const timeout = handleTimeout(dispatch);

  try {
    dispatch({ type: UPDATE_USER_PASSWORD_REQUEST });

    const { user } = getState().user;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    const body = { oldPassword, newPassword };

    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/user/update-password`, body, config);

    dispatch({ type: UPDATE_USER_PASSWORD_SUCCESS, payload: response.data.message });
  } catch (error) {
    dispatch({ type: UPDATE_USER_PASSWORD_FAIL, payload: error.response ? error.response.data.message : error.message });
  } finally {
    clearTimeout(timeout);
  }
};

export const getAllUsers = (page = 1, limit = 10) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const { user } = getState();

    // Check if the token exists in the state
    const token = user?.token || getToken();  // Try getting from localStorage if not in state

    if (!token) {
      throw new Error("Authorization token is missing or invalid.");
    }

    // Configure headers with Authorization token
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the user's token here
      },
    };

    // API call with pagination params
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/users`, {
      ...config,
      params: { page, limit },  // Adding pagination params
    });
    console.log('Fetched Users:', data);

    // Ensure you're accessing the correct key (here assuming `data.users` and `data.totalPages`)
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: {
        users: data.users || [],  // Adjust based on the structure of your response
        totalPages: data.totalPages || 0,  // Adjust based on the structure of your response
      },
    });
  } catch (error) {
    // Handle error gracefully with more informative messages
    const errorMessage = error.response && error.response.data.message
      ? error.response.data.message
      : error.message || 'Something went wrong'; // Fallback error message

    dispatch({
      type: USER_LIST_FAIL,
      payload: errorMessage,
    });
  }
};
// Admin: Delete User
export const AdmindeleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: ADMIN_DELETE_USER_REQUEST });

  const timeout = handleTimeout(dispatch);

  try {
    // Access token from the Redux store using getState
    const { user } = getState();
    const token = user?.token || getToken();  // Use token from state or localStorage

    if (!token) throw new Error("Authorization token is missing.");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/users/${userId}`, config);

    dispatch({ type: ADMIN_DELETE_USER_SUCCESS, payload: `User with ID ${userId} deleted successfully.` });
  } catch (error) {
    dispatch({ type: ADMIN_DELETE_USER_FAIL, payload: getErrorMessage(error) });
  } finally {
    clearTimeout(timeout);
  }
};

// Admin: Update User
export const AdminupdateUser = (userId, userData) => async (dispatch, getState) => {
  dispatch({ type: ADMIN_UPDATE_USER_REQUEST });

  const timeout = handleTimeout(dispatch);

  try {
    // Access token from the Redux store using getState
    const { user } = getState();
    const token = user?.token || getToken();  // Use token from state or localStorage

    if (!token) throw new Error("Authorization token is missing.");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/admin/users/${userId}`, userData, config);

    dispatch({ type: ADMIN_UPDATE_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: ADMIN_UPDATE_USER_FAIL, payload: getErrorMessage(error) });
  } finally {
    clearTimeout(timeout);
  }
};


// Clear errors action
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
