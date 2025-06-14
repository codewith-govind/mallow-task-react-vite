import { Dispatch } from 'redux';
import api from '../api';
import AnalyticsService from '../services/analytics';
import { message } from 'antd';
import {
  ActionTypes,
  AppAction,
  LoginFormValues,
  NewUserPayload
} from '../types';
import { RootState } from './';

// Define a type for Redux Thunk actions
// It's a function that takes Dispatch and RootState and returns a Promise
import { ThunkAction } from 'redux-thunk';

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown, // Extra arguments, not used here
  AppAction
>;

export const login = (credentials: LoginFormValues): AppThunk<Promise<boolean>> => async (dispatch: Dispatch<AppAction>) => {
  dispatch({ type: ActionTypes.AUTH_REQUEST });
  try {
    const data = await api.login(credentials);
    localStorage.setItem('authToken', data.token);
    dispatch({ type: ActionTypes.AUTH_SUCCESS, payload: { token: data.token, email: credentials.email } });
    AnalyticsService.trackLogin(credentials.email);
    message.success('Login successful!');
    return true;
  } catch (error: any) {
    dispatch({ type: ActionTypes.AUTH_FAILURE, payload: error.message || 'Unknown error' });
    message.error(`Login failed: ${error.message || 'Unknown error'}`);
    return false;
  }
};

export const logout = (): AppThunk => (dispatch: Dispatch<AppAction>) => {
  localStorage.removeItem('authToken');
  dispatch({ type: ActionTypes.LOGOUT });
  AnalyticsService.trackLogout();
  message.info('Logged out.');
};

export const fetchUsers = (page: number = 1): AppThunk => async (dispatch: Dispatch<AppAction>) => {
  dispatch({ type: ActionTypes.FETCH_USERS_REQUEST });
  try {
    const data = await api.getUsers(page);
    dispatch({ type: ActionTypes.FETCH_USERS_SUCCESS, payload: data });
    AnalyticsService.trackPageView('User List');
  } catch (error: any) {
    dispatch({ type: ActionTypes.FETCH_USERS_FAILURE, payload: error.message || 'Unknown error' });
    message.error(`Failed to fetch users: ${error.message || 'Unknown error'}`);
  }
};

export const createUser = (user: NewUserPayload): AppThunk<Promise<boolean>> => async (dispatch: Dispatch<AppAction>) => {
  dispatch({ type: ActionTypes.CREATE_USER_REQUEST });
  try {
    const newUser = await api.createUser(user);
    dispatch({ type: ActionTypes.CREATE_USER_SUCCESS, payload: newUser });
    AnalyticsService.trackUserAdded(newUser.first_name, newUser.email);
    message.success('User created successfully!');
    return true;
  } catch (error: any) {
    dispatch({ type: ActionTypes.CREATE_USER_FAILURE, payload: error.message || 'Unknown error' });
    message.error(`Failed to create user: ${error.message || 'Unknown error'}`);
    return false;
  }
};

export const updateUser = (id: number, user: NewUserPayload): AppThunk<Promise<boolean>> => async (dispatch: Dispatch<AppAction>) => {
  dispatch({ type: ActionTypes.UPDATE_USER_REQUEST });
  try {
    const updatedUser = await api.updateUser(id, user);
    dispatch({ type: ActionTypes.UPDATE_USER_SUCCESS, payload: { id, ...updatedUser } });
    AnalyticsService.trackUserUpdated(id, updatedUser.first_name, updatedUser.email);
    message.success('User updated successfully!');
    return true;
  } catch (error: any) {
    dispatch({ type: ActionTypes.UPDATE_USER_FAILURE, payload: error.message || 'Unknown error' });
    message.error(`Failed to update user: ${error.message || 'Unknown error'}`);
    return false;
  }
};

export const deleteUser = (id: number): AppThunk<Promise<boolean>> => async (dispatch: Dispatch<AppAction>) => {
  dispatch({ type: ActionTypes.DELETE_USER_REQUEST });
  try {
    await api.deleteUser(id);
    dispatch({ type: ActionTypes.DELETE_USER_SUCCESS, payload: id });
    AnalyticsService.trackUserDeleted(id);
    message.success('User deleted successfully!');
    return true;
  } catch (error: any) {
    dispatch({ type: ActionTypes.DELETE_USER_FAILURE, payload: error.message || 'Unknown error' });
    message.error(`Failed to delete user: ${error.message || 'Unknown error'}`);
    return false;
  }
};
