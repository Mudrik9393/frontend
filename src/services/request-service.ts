import axios from "axios"
import { baseUrl } from "./http"
import { RequestRequest } from "../types/request"



const url = baseUrl + "request"
const getAll = async() => {
   const response = await (axios.get(url))
   return response.data
}

const getById = async(id: string) => {
    const response = await (axios.get(url + "/" + id));
    return response.data
}

const create = async(data: RequestRequest) => {
    const response = await(axios.post(url,data));
    return response.data
}

const update = async(data: RequestRequest, id: string) => {
    const response = await(axios.put(url + "/" +id,data));
    return response.data
}
export default {getAll,getById,create,update}