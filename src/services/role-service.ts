import axios from "axios"
import { baseUrl } from "./http"
import { RoleRequest } from "../types/role"


const url = baseUrl + "role"
const getAll = async() => {
   const response = await (axios.get(url))
   return response.data
}

const getById = async(id: string) => {
    const response = await (axios.get(url + "/" + id));
    return response.data
}

const create = async(data: RoleRequest) => {
    const response = await(axios.post(url,data));
    return response.data
}

const update = async(data: RoleRequest, id: string) => {
    const response = await(axios.put(url + "/" +id,data));
    return response.data
}
export default {getAll,getById,create,update}

