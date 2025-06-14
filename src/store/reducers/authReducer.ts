import { ActionTypes, AuthState, AppAction } from '../../types';

const initialAuthState: AuthState = {
  token: localStorage.getItem('authToken') || null,
  isAuthenticated: !!localStorage.getItem('authToken'),
  loading: false,
  error: null,
  userEmail: null,
};

const authReducer = (state: AuthState = initialAuthState, action: AppAction): AuthState => {
  switch (action.type) {
    case ActionTypes.AUTH_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
        userEmail: action.payload.email,
      };
    case ActionTypes.AUTH_FAILURE:
      return { ...state, loading: false, isAuthenticated: false, token: null, error: action.payload, userEmail: null };
    case ActionTypes.LOGOUT:
      return { ...state, isAuthenticated: false, token: null, error: null, userEmail: null };
    default:
      return state;
  }
};

export default authReducer;
