// Import required libraries and middleware
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Correct default import for thunk
import { composeWithDevTools } from 'redux-devtools-extension';

// Import reducers
import { fundReducer } from '../reducers/fundReducer';
import { userReducer } from '../reducers/userReducer';
import { traderReducer } from '../reducers/TraderReducer';

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  trader: traderReducer,
  user: userReducer,
  fund: fundReducer,
});

// Define the initial state
const initialState = {};

// Set up middleware
const middleware = [thunk];

// Create the Redux store
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
