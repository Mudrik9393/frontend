import axios from "axios"
import { ComplaintRequest } from "../types/complaint"
import { baseUrl } from "./http"



const url = baseUrl + "complaint"
const getAll = async() => {
   const response = await (axios.get(url))
   return response.data
}

const getById = async(id: string) => {
    const response = await (axios.get(url + "/" + id));
    return response.data
}

const create = async(data: ComplaintRequest) => {
    const response = await(axios.post(url,data));
    return response.data
}

const update = async(data: ComplaintRequest, id: string) => {
    const response = await(axios.put(url + "/" +id,data));
    return response.data
}
export default {getAll,getById,create,update}

