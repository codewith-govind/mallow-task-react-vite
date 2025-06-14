// src/store/reducers/usersReducer.ts
import { ActionTypes, UsersState, AppAction } from '../../types';

const initialUsersState: UsersState = {
  data: [],
  loading: false,
  error: null,
  totalUsers: 0,
  perPage: 6,
  currentPage: 1,
};

const usersReducer = (state: UsersState = initialUsersState, action: AppAction): UsersState => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS_REQUEST:
    case ActionTypes.CREATE_USER_REQUEST:
    case ActionTypes.UPDATE_USER_REQUEST:
    case ActionTypes.DELETE_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case ActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        totalUsers: action.payload.total,
        perPage: action.payload.per_page,
        currentPage: action.payload.page,
      };

    case ActionTypes.CREATE_USER_SUCCESS:
      // Simulate adding user to the list, as reqres.in doesn't return ID for POST
      // We assign a client-side ID for display purposes here.
      const newUserId = state.data.length > 0 ? Math.max(...state.data.map(u => u.id)) + 1 : 1;
      const newUserWithId = {
        ...action.payload,
        id: newUserId, // Assign a temporary client-side ID
        avatar: `https://placehold.co/128x128/ADD8E6/000000?text=${action.payload.first_name[0] || 'U'}`, // Default avatar
      };
      return {
        ...state,
        loading: false,
        data: [...state.data, newUserWithId],
        totalUsers: state.totalUsers + 1,
      };

    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((user) =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        ),
      };

    case ActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter((user) => user.id !== action.payload),
        totalUsers: state.totalUsers - 1,
      };

    case ActionTypes.FETCH_USERS_FAILURE:
    case ActionTypes.CREATE_USER_FAILURE:
    case ActionTypes.UPDATE_USER_FAILURE:
    case ActionTypes.DELETE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default usersReducer;
