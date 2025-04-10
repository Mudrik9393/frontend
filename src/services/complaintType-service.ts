import axios from "axios"
import { baseUrl } from "./http"
import { ComplaintTypeRequest } from "../types/complaintType"



const url = baseUrl + "complaintType"
const getAll = async() => {
   const response = await (axios.get(url))
   return response.data
}

const getById = async(id: string) => {
    const response = await (axios.get(url + "/" + id));
    return response.data
}

const create = async(data: ComplaintTypeRequest) => {
    const response = await(axios.post(url,data));
    return response.data
}

const update = async(data: ComplaintTypeRequest, id: string) => {
    const response = await(axios.put(url + "/" +id,data));
    return response.data
}
export default {getAll,getById,create,update}

