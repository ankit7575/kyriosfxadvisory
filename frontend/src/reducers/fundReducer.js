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

const initialState = {
  referralData: null,
  incentiveData: null,
  fortnightlyData: null,
  adminIncentiveData: null,
  adminFortnightlyData: null,
  loading: false,  // general loading flag
  referralDataLoading: false,
  incentiveDataLoading: false,
  fortnightlyDataLoading: false,
  adminIncentiveDataLoading: false,
  adminFortnightlyDataLoading: false,
  error: null,
  message: null,
};

export const fundReducer = (state = initialState, action) => {
  switch (action.type) {
    // Request actions
    case VIEW_REFERRAL_DATA_REQUEST:
      return {
        ...state,
        referralDataLoading: true,
        error: null,
        message: null,
      };
    case VIEW_Incentive_DATA_REQUEST:
      return {
        ...state,
        incentiveDataLoading: true,
        error: null,
        message: null,
      };
    case VIEW_Fortnightly_DATA_REQUEST:
      return {
        ...state,
        fortnightlyDataLoading: true,
        error: null,
        message: null,
      };
    case ADD_FORTNIGHTLY_PROFIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case VIEW_Admin_INCENTIVE_DATA_REQUEST:
      return {
        ...state,
        adminIncentiveDataLoading: true,
        error: null,
        message: null,
      };
    case VIEW_Admin_FORTNIGHTLY_DATA_REQUEST:
      return {
        ...state,
        adminFortnightlyDataLoading: true,
        error: null,
        message: null,
      };

    // Success actions
    case VIEW_REFERRAL_DATA_SUCCESS:
      return {
        ...state,
        referralDataLoading: false,
        referralData: action.payload,
        error: null,
      };
    case VIEW_Incentive_DATA_SUCCESS:
      return {
        ...state,
        incentiveDataLoading: false,
        incentiveData: action.payload,
        error: null,
      };
    case VIEW_Fortnightly_DATA_SUCCESS:
      return {
        ...state,
        fortnightlyDataLoading: false,
        fortnightlyData: action.payload,
        error: null,
      };
    case ADD_FORTNIGHTLY_PROFIT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        error: null,
      };
    case VIEW_Admin_INCENTIVE_DATA_SUCCESS:
      return {
        ...state,
        adminIncentiveDataLoading: false,
        adminIncentiveData: action.payload,
        error: null,
      };
    case VIEW_Admin_FORTNIGHTLY_DATA_SUCCESS:
      return {
        ...state,
        adminFortnightlyDataLoading: false,
        adminFortnightlyData: action.payload,
        error: null,
      };

    // Failure actions
    case VIEW_REFERRAL_DATA_FAIL:
      return {
        ...state,
        referralDataLoading: false,
        error: action.payload,
        message: null,
      };
    case VIEW_Incentive_DATA_FAIL:
      return {
        ...state,
        incentiveDataLoading: false,
        error: action.payload,
        message: null,
      };
    case VIEW_Fortnightly_DATA_FAIL:
      return {
        ...state,
        fortnightlyDataLoading: false,
        error: action.payload,
        message: null,
      };
    case ADD_FORTNIGHTLY_PROFIT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: null,
      };
    case VIEW_Admin_INCENTIVE_DATA_FAIL:
      return {
        ...state,
        adminIncentiveDataLoading: false,
        error: action.payload,
        message: null,
      };
    case VIEW_Admin_FORTNIGHTLY_DATA_FAIL:
      return {
        ...state,
        adminFortnightlyDataLoading: false,
        error: action.payload,
        message: null,
      };

    // Clear Errors
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
