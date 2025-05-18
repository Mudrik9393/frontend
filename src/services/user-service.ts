import axios from "axios";
import { baseUrl } from "./http";
import { LoginData } from "../types/login";
import { UserRequest, UserResponse } from "../types/user";

const url = baseUrl + "users/";
const getAll = async () => {
  const response = await axios.get<UserResponse[]>(url + "get");
  return response.data;
};

const createUser = async (data: UserRequest) => {
  const response = await axios.post<UserRequest>(url + "create", data);
  return response.data;
};

const updateUser = async (data: UserRequest, id: number) => {
  const response = await axios.put(url + id, data);
  return response.data;
};

const deleteUser = async (id: number) => {
  const response = await axios.delete(url + id);
  return response.data;
};

const getById = async (id: string) => {
  const response = await axios.get<UserResponse>(url + "/" + id);
  return response.data;
};

const login = async (data: LoginData) => {
  const response = await axios.post(url + "/login", data);
  return response.data;
};
export default { getAll, getById, login, createUser, updateUser, deleteUser };
