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
} from "../constants/TraderConstants";

const initialState = {
  traderAccountStatus: null,
  traderRequests: [],
  loading: false, // General loading flag
  requestTraderAccountLoading: false,
  getTraderRequestsLoading: false,
  updateVerificationStatusLoading: false,
  getTraderAccountStatusLoading: false,
  error: null,
  message: null,
};

export const traderReducer = (state = initialState, action) => {
  switch (action.type) {
    // Request actions
    case REQUEST_TRADER_ACCOUNT:
      return {
        ...state,
        requestTraderAccountLoading: true,
        error: null,
        message: null,
      };
    case GET_TRADER_REQUESTS:
      return {
        ...state,
        getTraderRequestsLoading: true,
        error: null,
        message: null,
      };
    case UPDATE_VERIFICATION_STATUS:
      return {
        ...state,
        updateVerificationStatusLoading: true,
        error: null,
        message: null,
      };
    case GET_TRADER_ACCOUNT_STATUS:
      return {
        ...state,
        getTraderAccountStatusLoading: true,
        error: null,
        message: null,
      };

    // Success actions
    case REQUEST_TRADER_ACCOUNT_SUCCESS:
      return {
        ...state,
        requestTraderAccountLoading: false,
        message: action.payload,
        error: null,
      };
    case GET_TRADER_REQUESTS_SUCCESS:
      return {
        ...state,
        getTraderRequestsLoading: false,
        traderRequests: action.payload,
        error: null,
      };
    case UPDATE_VERIFICATION_STATUS_SUCCESS:
      return {
        ...state,
        updateVerificationStatusLoading: false,
        message: action.payload,
        error: null,
      };
    case GET_TRADER_ACCOUNT_STATUS_SUCCESS:
      return {
        ...state,
        getTraderAccountStatusLoading: false,
        traderAccountStatus: action.payload,
        error: null,
      };

    // Failure actions
    case REQUEST_TRADER_ACCOUNT_FAIL:
      return {
        ...state,
        requestTraderAccountLoading: false,
        error: action.payload,
        message: null,
      };
    case GET_TRADER_REQUESTS_FAIL:
      return {
        ...state,
        getTraderRequestsLoading: false,
        error: action.payload,
        message: null,
      };
    case UPDATE_VERIFICATION_STATUS_FAIL:
      return {
        ...state,
        updateVerificationStatusLoading: false,
        error: action.payload,
        message: null,
      };
    case GET_TRADER_ACCOUNT_STATUS_FAIL:
      return {
        ...state,
        getTraderAccountStatusLoading: false,
        error: action.payload,
        message: null,
      };

    default:
      return state;
  }
};
