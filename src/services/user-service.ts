import axios from "axios";
import { baseUrl } from "./http";
import { LoginData } from "../types/login";
import { UserRequest, UserResponse } from "../types/user";

const usersUrl = baseUrl + "users/";
const authUrl = baseUrl + "api/v1/auth/"; // Made consistent with your register endpoint

// Helper to get token header
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
};

const createUser = async (data: UserRequest) => {
  try {
    const response = await axios.post(
      `${authUrl}register`, // Using template literals for consistency
      data,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Forward server validation errors
      throw new Error(
        error.response.data.message ||
        error.response.data.error ||
        "Registration failed"
      );
    }
    throw new Error("Network error. Please try again.");
  }
};

const login = async (data: LoginData) => {
  try {
    const response = await axios.post(`${authUrl}login`, data);
    if (response.data.token && response.data.user) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message ||
        "Invalid credentials. Please try again."
      );
    }
    throw new Error("Network error. Please try again.");
  }
};

const getAll = async () => {
  try {
    const response = await axios.get<UserResponse[]>(
      `${usersUrl}get`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch users"
    );
  }
};

const updateUser = async (data: UserRequest, id: number) => {
  try {
    const response = await axios.put(
      `${usersUrl}${id}`,
      data,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update user"
    );
  }
};

const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(
      `${usersUrl}${id}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete user"
    );
  }
};

const getById = async (id: string) => {
  try {
    const response = await axios.get<UserResponse>(
      `${usersUrl}${id}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user"
    );
  }
};

export default {
  getAll,
  getById,
  login,
  createUser,
  updateUser,
  deleteUser,
};