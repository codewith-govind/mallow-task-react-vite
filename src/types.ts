// src/types.ts

// --- API Response Interfaces ---
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface LoginResponse {
  token: string;
}

export interface UsersApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
}

// For Create/Update User (API doesn't return full user on POST/PUT for reqres.in,
// but we define expected fields for consistency)
export interface NewUserPayload {
  first_name: string;
  last_name: string;
  email: string;
}

export interface CreatedUserResponse {
  id: string; // reqres.in returns string for created ID
  first_name: string;
  last_name: string;
  email: string;
  createdAt: string; // Date represented as string from API
}

export interface UpdatedUserResponse {
  first_name: string;
  last_name: string;
  email: string;
  updatedAt: string; // Date represented as string from API
}


// --- Redux State Interfaces ---
export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  userEmail: string | null; // To store the logged-in user's email for display
}

export interface UsersState {
  data: User[];
  loading: boolean;
  error: string | null;
  totalUsers: number;
  perPage: number;
  currentPage: number;
}

// RootState is defined and exported from store/index.ts, not here.
// But we still need to import it into other files, so it's good to know where it lives.


// --- Redux Action Types ---
export enum ActionTypes {
  AUTH_REQUEST = 'AUTH_REQUEST',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAILURE = 'AUTH_FAILURE',
  LOGOUT = 'LOGOUT',

  FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST',
  FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
  FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE',

  CREATE_USER_REQUEST = 'CREATE_USER_REQUEST',
  CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
  CREATE_USER_FAILURE = 'CREATE_USER_FAILURE',

  UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE',

  DELETE_USER_REQUEST = 'DELETE_USER_REQUEST',
  DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE = 'DELETE_USER_FAILURE',
}

// Specific Action Interfaces for type safety
export interface AuthRequestAction { type: ActionTypes.AUTH_REQUEST; }
export interface AuthSuccessAction { type: ActionTypes.AUTH_SUCCESS; payload: { token: string; email: string }; }
export interface AuthFailureAction { type: ActionTypes.AUTH_FAILURE; payload: string; }
export interface LogoutAction { type: ActionTypes.LOGOUT; }

export interface FetchUsersRequestAction { type: ActionTypes.FETCH_USERS_REQUEST; }
export interface FetchUsersSuccessAction { type: ActionTypes.FETCH_USERS_SUCCESS; payload: UsersApiResponse; }
export interface FetchUsersFailureAction { type: ActionTypes.FETCH_USERS_FAILURE; payload: string; }

export interface CreateUserRequestAction { type: ActionTypes.CREATE_USER_REQUEST; }
export interface CreateUserSuccessAction { type: ActionTypes.CREATE_USER_SUCCESS; payload: CreatedUserResponse; }
export interface CreateUserFailureAction { type: ActionTypes.CREATE_USER_FAILURE; payload: string; }

export interface UpdateUserRequestAction { type: ActionTypes.UPDATE_USER_REQUEST; }
export interface UpdateUserSuccessAction { type: ActionTypes.UPDATE_USER_SUCCESS; payload: UpdatedUserResponse & { id: number }; } // Include ID for client-side update
export interface UpdateUserFailureAction { type: ActionTypes.UPDATE_USER_FAILURE; payload: string; }

export interface DeleteUserRequestAction { type: ActionTypes.DELETE_USER_REQUEST; }
export interface DeleteUserSuccessAction { type: ActionTypes.DELETE_USER_SUCCESS; payload: number; } // User ID
export interface DeleteUserFailureAction { type: ActionTypes.DELETE_USER_FAILURE; payload: string; }

// Union type for all possible actions
export type AppAction =
  | AuthRequestAction
  | AuthSuccessAction
  | AuthFailureAction
  | LogoutAction
  | FetchUsersRequestAction
  | FetchUsersSuccessAction
  | FetchUsersFailureAction
  | CreateUserRequestAction
  | CreateUserSuccessAction
  | CreateUserFailureAction
  | UpdateUserRequestAction
  | UpdateUserSuccessAction
  | UpdateUserFailureAction
  | DeleteUserRequestAction
  | DeleteUserSuccessAction
  | DeleteUserFailureAction;

// --- Other types ---
export type ViewMode = 'table' | 'card';
export interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}
export interface UserFormValues {
  first_name: string;
  last_name: string;
  email: string;
}
