import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import { thunk, ThunkDispatch } from 'redux-thunk'; // Import ThunkDispatch
import authReducer from './reducers/authReducer';
import usersReducer from './reducers/usersReducer';
import { AppAction, AuthState, UsersState } from '../types'; // Import necessary types

// Define the RootState interface explicitly based on your combined reducers
export interface RootState {
  auth: AuthState;
  users: UsersState;
}

// Combine all reducers into a root reducer
const rootReducer = combineReducers<RootState, AppAction>({
  auth: authReducer,
  users: usersReducer,
});

// Create the Redux store with thunk middleware
const store: Store<RootState, AppAction> & {
  dispatch: ThunkDispatch<RootState, unknown, AppAction>;
} = createStore(rootReducer, applyMiddleware(thunk));

// Define AppDispatch type for use with useDispatch hook
export type AppDispatch = typeof store.dispatch;
// Export RootState type for useSelector hook
// Re-export RootState from here for convenience in other modules
export { RootState };

export default store;
