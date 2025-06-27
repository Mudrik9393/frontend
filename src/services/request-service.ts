import axios from "axios";
import { baseUrl } from "./http";
import { RequestRequest, RequestResponse } from "../types/request";

const url = baseUrl.endsWith("/") ? baseUrl + "requests/" : baseUrl + "/requests/";

const getAll = async (): Promise<RequestResponse[]> => {
  const response = await axios.get<RequestResponse[]>(url + "get");
  return response.data;
};

const getById = async (id: number): Promise<RequestResponse> => {
  const response = await axios.get<RequestResponse>(`${url}${id}`);
  return response.data;
};

const create = async (data: FormData): Promise<RequestResponse> => {
  try {
    const response = await axios.post<RequestResponse>(url + "create", data, {
      timeout: 15000,
    });
    return response.data;
  } catch (error: any) {
    console.error("Create request failed:", error.response || error.message || error);
    throw error;
  }
};

const update = async (id: number, data: FormData): Promise<RequestResponse> => {
  const response = await axios.put<RequestResponse>(`${url}${id}`, data, {
    timeout: 15000,
  });
  return response.data;
};

const deleteRequest = async (id: number): Promise<void> => {
  await axios.delete(`${url}${id}`);
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteRequest,
};
