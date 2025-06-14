import {
  LoginResponse,
  UsersApiResponse,
  NewUserPayload,
  CreatedUserResponse,
  UpdatedUserResponse,
  LoginFormValues,
} from "../types";

// const API_BASE_URL = "https://reqres.in/api";
// const API_KEY_HEADER = "reqres-free-v1";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY_HEADER = import.meta.env.VITE_API_KEY;

const api = {
  login: async ({
    email,
    password,
  }: LoginFormValues): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY_HEADER,
      },
      body: JSON.stringify({ email, password }),
    });
    const data: LoginResponse & { error?: string } = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }
    return data;
  },

  getUsers: async (page: number = 1): Promise<UsersApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/users?page=${page}`, {
      headers: {
        "x-api-key": API_KEY_HEADER, // Add the API key header
      },
    });
    const data: UsersApiResponse & { error?: string } = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch users");
    }
    return data;
  },

  createUser: async (user: NewUserPayload): Promise<CreatedUserResponse> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY_HEADER,
      },
      body: JSON.stringify(user),
    });
    const data: CreatedUserResponse & { error?: string } =
      await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to create user");
    }
    return data;
  },

  updateUser: async (
    id: number,
    user: NewUserPayload
  ): Promise<UpdatedUserResponse> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY_HEADER,
      },
      body: JSON.stringify(user),
    });
    const data: UpdatedUserResponse & { error?: string } =
      await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to update user");
    }
    return data;
  },

  deleteUser: async (id: number): Promise<null> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY_HEADER,
      },
    });
    if (!response.ok) {
      if (response.status !== 204) {
        const data: { error?: string } = await response.json();
        throw new Error(data.error || "Failed to delete user");
      }
    }
    return null;
  },
};

export default api;
