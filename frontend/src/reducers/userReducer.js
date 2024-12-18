import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
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
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
} from "../constants/userConstants";

// Initial state for the user reducer
const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  message: null,
  isUserLoaded: false,
  referralData: null,
  referralDataLoading: false,
  isUserUpdated: false,
  isPasswordUpdated: false,
  users: [],
  totalPages: 0,
  isAdminActionSuccess: false, // Tracks success for admin actions
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case VERIFY_OTP_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case UPDATE_USER_REQUEST:
    case UPDATE_USER_PASSWORD_REQUEST:
    case USER_LIST_REQUEST:
    case ADMIN_DELETE_USER_REQUEST:
    case ADMIN_UPDATE_USER_REQUEST: // Handle admin update user request
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
        isAdminActionSuccess: false,
      };

    case LOAD_USER_REQUEST:
      if (state.isUserLoaded) {
        return state;
      }
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_USER_SUCCESS:
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user || action.payload,
        isAuthenticated: true,
        error: null,
        message: null,
        isUserLoaded: true,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: { ...state.user, ...action.payload },
        isUserUpdated: true,
        error: null,
        message: "User profile updated successfully.",
      };

    case UPDATE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isPasswordUpdated: true,
        message: "Password updated successfully.",
        error: null,
      };

    case FORGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: null,
      };

    case USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users || [],
        totalPages: action.payload.totalPages || 0,
        error: null,
      };

    case ADMIN_DELETE_USER_SUCCESS: // Handle success for admin delete user
      return {
        ...state,
        loading: false,
        isAdminActionSuccess: true,
        message: "User deleted successfully.",
        error: null,
      };

    case ADMIN_UPDATE_USER_SUCCESS: // Handle success for admin update user
      return {
        ...state,
        loading: false,
        isAdminActionSuccess: true,
        message: "User updated successfully.",
        error: null,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case VERIFY_OTP_FAIL:
    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
    case LOAD_USER_FAIL:
    case UPDATE_USER_FAIL:
    case UPDATE_USER_PASSWORD_FAIL:
    case USER_LIST_FAIL:
    case ADMIN_DELETE_USER_FAIL: // Handle failure for admin delete user
    case ADMIN_UPDATE_USER_FAIL: // Handle failure for admin update user
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: null,
        isUserUpdated: false,
        isPasswordUpdated: false,
        isAdminActionSuccess: false,
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
        message: null,
        referralData: null,
      };

    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: null,
      };

    case UPDATE_USER_RESET:
      return {
        ...state,
        isUserUpdated: false,
        message: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        message: null,
      };

    default:
      return state;
  }
};
