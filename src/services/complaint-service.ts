import axios from "axios"
import { ComplaintRequest, ComplaintResponse } from "../types/complaint"
import { baseUrl } from "./http"



const url = baseUrl + "complaints/"
const getAll = async() => {
   const response = await axios.get<ComplaintResponse []>(url + "get")
   return response.data
}

const getById = async(id: string) => {
    const response = await (axios.get(url + "/" + id));
    return response.data
}

const createComplaint = async (data: ComplaintRequest) => {
  const response = await axios.post<ComplaintRequest>(url + "create", data);
  return response.data;
};

const update = async(data: ComplaintRequest, id: string) => {
    const response = await(axios.put(url + "/" +id,data));
    return response.data
}
export default {getAll,getById,createComplaint,update}

